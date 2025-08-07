-- Create profiles table
create table if not exists public.profiles (
  id uuid not null primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Create teams table
create table if not exists public.teams (
  id uuid not null primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.teams enable row level security;

-- Team members
create table if not exists public.team_members (
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  primary key (team_id, user_id)
);

alter table public.team_members enable row level security;

-- Team messages (chat)
create table if not exists public.team_messages (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.team_messages enable row level security;

-- Portfolios
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  symbol text not null,
  amount numeric not null default 0,
  avg_buy_price numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolios enable row level security;
create index if not exists idx_portfolios_user on public.portfolios(user_id);
create index if not exists idx_portfolios_user_symbol on public.portfolios(user_id, symbol);

-- Transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  symbol text not null,
  type text not null check (type in ('buy','sell')),
  amount numeric not null,
  price numeric not null,
  date timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;
create index if not exists idx_transactions_user on public.transactions(user_id);

-- AI Insights
create table if not exists public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  summary text,
  action text,
  created_at timestamptz not null default now()
);

alter table public.ai_insights enable row level security;
create index if not exists idx_ai_insights_user on public.ai_insights(user_id);

-- Timestamps trigger function (idempotent)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers
create or replace trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

create or replace trigger trg_teams_updated_at
before update on public.teams
for each row execute function public.update_updated_at_column();

create or replace trigger trg_portfolios_updated_at
before update on public.portfolios
for each row execute function public.update_updated_at_column();

-- RLS Policies
-- profiles
create policy if not exists "Profiles are viewable by owner"
  on public.profiles for select using (auth.uid() = id);
create policy if not exists "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);
create policy if not exists "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- teams: owner or member can view; owner can update/delete; anyone authenticated can create with themselves as owner
create policy if not exists "View teams where user is owner or member"
  on public.teams for select using (
    auth.uid() = owner_id or exists (
      select 1 from public.team_members m where m.team_id = id and m.user_id = auth.uid()
    )
  );
create policy if not exists "Create team as owner"
  on public.teams for insert with check (auth.uid() = owner_id);
create policy if not exists "Owner can update team"
  on public.teams for update using (auth.uid() = owner_id);
create policy if not exists "Owner can delete team"
  on public.teams for delete using (auth.uid() = owner_id);

-- team_members: members can view, users can join themselves, owner can manage
create policy if not exists "Members can view membership of their teams"
  on public.team_members for select using (
    user_id = auth.uid() or exists (
      select 1 from public.team_members m2 where m2.team_id = team_members.team_id and m2.user_id = auth.uid()
    ) or exists (
      select 1 from public.teams t where t.id = team_members.team_id and t.owner_id = auth.uid()
    )
  );
create policy if not exists "Users can add themselves"
  on public.team_members for insert with check (user_id = auth.uid());
create policy if not exists "Owner can manage memberships"
  on public.team_members for delete using (
    exists (select 1 from public.teams t where t.id = team_members.team_id and t.owner_id = auth.uid())
  );

-- team_messages: only members can read/write
create policy if not exists "Members can read messages"
  on public.team_messages for select using (
    exists (
      select 1 from public.team_members m where m.team_id = team_messages.team_id and m.user_id = auth.uid()
    ) or exists (select 1 from public.teams t where t.id = team_messages.team_id and t.owner_id = auth.uid())
  );
create policy if not exists "Members can write messages"
  on public.team_messages for insert with check (
    exists (
      select 1 from public.team_members m where m.team_id = team_messages.team_id and m.user_id = auth.uid()
    ) or exists (select 1 from public.teams t where t.id = team_messages.team_id and t.owner_id = auth.uid())
  );

-- portfolios
create policy if not exists "Users can view their portfolios"
  on public.portfolios for select using (auth.uid() = user_id);
create policy if not exists "Users can insert their portfolios"
  on public.portfolios for insert with check (auth.uid() = user_id);
create policy if not exists "Users can update their portfolios"
  on public.portfolios for update using (auth.uid() = user_id);
create policy if not exists "Users can delete their portfolios"
  on public.portfolios for delete using (auth.uid() = user_id);

-- transactions
create policy if not exists "Users can view their transactions"
  on public.transactions for select using (auth.uid() = user_id);
create policy if not exists "Users can insert their transactions"
  on public.transactions for insert with check (auth.uid() = user_id);
create policy if not exists "Users can update their transactions"
  on public.transactions for update using (auth.uid() = user_id);
create policy if not exists "Users can delete their transactions"
  on public.transactions for delete using (auth.uid() = user_id);

-- ai_insights
create policy if not exists "Users can view their insights"
  on public.ai_insights for select using (auth.uid() = user_id);
create policy if not exists "Users can insert their insights"
  on public.ai_insights for insert with check (auth.uid() = user_id);
create policy if not exists "Users can delete their insights"
  on public.ai_insights for delete using (auth.uid() = user_id);

-- Trigger to auto-create profile on new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
