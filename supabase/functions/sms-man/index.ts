import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SMS_MAN_BASE = "https://api.sms-man.com/stubs/handler_api.php";
const SMS_MAN_API_KEY = Deno.env.get("SMS_MAN_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function callSmsMan(params: Record<string, string>) {
  const url = new URL(SMS_MAN_BASE);
  url.searchParams.set("api_key", SMS_MAN_API_KEY);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  const res = await fetch(url.toString());
  const text = await res.text();
  return text;
}

async function notifyAdmin(message: string) {
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_ADMIN_CHAT_ID");
  if (!token || !chatId) return;

  try {
    await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
  } catch (e) {
    console.error("Telegram notify error:", e);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Missing auth header" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabaseAuth = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userError } = await supabaseAuth.auth.getUser();
  if (userError || !userData.user) {
    return new Response(JSON.stringify({ error: "Invalid user" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = userData.user.id;
  const body = await req.json();
  const action = body.action ? body.action : "getNumber";

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  if (action === "checkStatus") {
    const activationId = body.activationId;
    if (!activationId) {
      return new Response(JSON.stringify({ error: "Missing activationId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const statusResult = await callSmsMan({ action: "getStatus", id: activationId });

    let newStatus = "pending";
    let smsCode = null;

    if (statusResult.indexOf("STATUS_OK") === 0) {
      newStatus = "completed";
      smsCode = statusResult.split(":")[1];
    } else if (statusResult.indexOf("STATUS_CANCEL") === 0) {
      newStatus = "cancelled";
    } else if (statusResult.indexOf("STATUS_WAIT_CODE") === 0) {
      newStatus = "pending";
    }

    await supabaseAdmin
      .from("sms_activations")
      .update({ status: newStatus, sms_code: smsCode, updated_at: new Date().toISOString() })
      .eq("activation_id", activationId)
      .eq("user_id", userId);

    return new Response(JSON.stringify({ status: newStatus, code: smsCode, raw: statusResult }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { service, country } = body;
  const missingField = !service ? true : (!country ? true : false);
  if (missingField) {
    return new Response(JSON.stringify({ error: "Missing service or country" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: pricingRow, error: pricingError } = await supabaseAdmin
    .from("phone_pricing")
    .select("your_price, label")
    .eq("service_code", service)
    .eq("country_code", country)
    .eq("is_active", true)
    .single();

  if (pricingError || !pricingRow) {
    return new Response(JSON.stringify({ error: "This country/service is not available" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const price = pricingRow.your_price;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("balance")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    return new Response(JSON.stringify({ error: "Profile not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (profile.balance < price) {
    return new Response(JSON.stringify({ error: "الرصيد غير كافٍ، يرجى شحن المحفظة" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await callSmsMan({ action: "getNumber", service, country });

  if (!result.startsWith("ACCESS_NUMBER")) {
    return new Response(JSON.stringify({ error: "sms-man error", detail: result }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parts = result.split(":");
  const activationId = parts[1];
  const phoneNumber = parts[2];

  const { error: deductError } = await supabaseAdmin
    .from("profiles")
    .update({ balance: profile.balance - price })
    .eq("id", userId);

  if (deductError) {
    return new Response(JSON.stringify({ error: "Failed to deduct balance", detail: deductError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("sms_activations")
    .insert({
      user_id: userId,
      activation_id: activationId,
      phone_number: phoneNumber,
      service_code: service,
      country_code: country,
      price: price,
      status: "pending",
    })
    .select()
    .single();

  if (insertError) {
    return new Response(JSON.stringify({ error: "DB insert failed", detail: insertError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const notifyMsg = "New phone order\nUser: " + userId + "\nService: " + service + "\nCountry: " + country + "\nPhone: " + phoneNumber + "\nPrice: $" + price;
  await notifyAdmin(notifyMsg);

  return new Response(JSON.stringify({ activation: inserted }), {
    headers: { "Content-Type": "application/json" },
  });
});

