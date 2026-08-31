create table if not exists public.sms_activations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  activation_id text not null,
  phone_number text not null,
  service_code text not null,
  country_code text not null,
  price numeric not null,
  status text not null default 'pending',
  sms_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sms_activations_user_id_idx on public.sms_activations(user_id);
create index if not exists sms_activations_activation_id_idx on public.sms_activations(activation_id);

alter table public.sms_activations enable row level security;

create policy "Users can view their own activations"
  on public.sms_activations for select
  using (auth.uid() = user_id);
