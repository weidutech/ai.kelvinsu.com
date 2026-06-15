create schema if not exists private;

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  wechat text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.entitlements (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'active',
  granted_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint entitlements_user_plan_unique unique (user_id, plan)
);

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = excluded.email,
        updated_at = timezone('utc', now());

  insert into public.entitlements (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict (user_id, plan) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure private.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure private.touch_updated_at();

drop trigger if exists entitlements_set_updated_at on public.entitlements;
create trigger entitlements_set_updated_at
  before update on public.entitlements
  for each row execute procedure private.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.entitlements enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can view their own entitlements" on public.entitlements;
create policy "Users can view their own entitlements"
  on public.entitlements
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.entitlements to authenticated;
