create table if not exists public.diagnostic_reports (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    phone_number text,
    job_type text,
    working_hours text,
    repetitive_tasks text,
    time_consuming text[],
    frequent_repeat text[],
    error_prone text[],
    disliked text[],
    ai_usage text[],
    ai_frequency text,
    time_saved text,
    top_5 jsonb
);

alter table public.diagnostic_reports add column if not exists phone_number text;
alter table public.diagnostic_reports add column if not exists job_type text;
alter table public.diagnostic_reports add column if not exists working_hours text;
alter table public.diagnostic_reports add column if not exists repetitive_tasks text;
alter table public.diagnostic_reports add column if not exists time_consuming text[];
alter table public.diagnostic_reports add column if not exists frequent_repeat text[];
alter table public.diagnostic_reports add column if not exists error_prone text[];
alter table public.diagnostic_reports add column if not exists disliked text[];
alter table public.diagnostic_reports add column if not exists ai_usage text[];
alter table public.diagnostic_reports add column if not exists ai_frequency text;
alter table public.diagnostic_reports add column if not exists time_saved text;
alter table public.diagnostic_reports add column if not exists top_5 jsonb;

alter table public.diagnostic_reports enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'diagnostic_reports'
      and policyname = 'Enable insert for anonymous users'
  ) then
    create policy "Enable insert for anonymous users"
      on public.diagnostic_reports
      for insert
      to anon
      with check (true);
  end if;
end $$;
