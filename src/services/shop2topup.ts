const API_KEY = "DcDsaLIT6lkzlL5FyjNQYw.bNOezjCbycTPiXoW8ouYoDChJg_Ev0wsS5qDEceJOm78yVtlAwhKhUtXY1P1X7C3";
const BASE_URL = "https://portal.shop2topup.com/api/endpoints/v1/orders/create";

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function createShop2TopUpOrder(subCategoryId: number, playerId: string) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_id: generateUUID(),
        sub_category_id: subCategoryId,
        quantity: 1,
        requirements: {
          player_id: playerId
        }
      })
    });

    const data = await response.json();
    return { ok: response.ok && data.success, data: data };
  } catch (err) {
    return { ok: false, error: err };
  }
}
