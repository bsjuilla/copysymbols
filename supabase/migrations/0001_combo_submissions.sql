-- combo_submissions: user-generated emoji/symbol "combos" for /community-combos.
--
-- This is the source of truth for the table + Row-Level Security that the UGC
-- feature and the moderate-combo Edge Function depend on. It is ALREADY APPLIED
-- to the live project (run manually in the Supabase SQL Editor on 2026-05-30) —
-- this file version-controls it for reproducibility and review.
--
-- Security model (verified live via the anon REST API):
--   • anon may INSERT only status='pending'  (cannot self-publish)
--   • anon may SELECT only status='approved' (pending/rejected stay private)
--   • anon may NOT update or delete           (no policy granted)
--   • moderation flips status via the service_role (Edge Function or dashboard)
-- CHECK constraints cap lengths (defense in depth alongside client validation).

create table if not exists public.combo_submissions (
  id          uuid primary key default gen_random_uuid(),
  combo       text not null check (char_length(combo) between 1 and 200),
  category    text check (char_length(category) <= 40),
  submitter   text check (char_length(submitter) <= 40),
  status      text not null default 'pending'
              check (status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz not null default now()
);

alter table public.combo_submissions enable row level security;

-- anon may INSERT, but only as 'pending' (cannot self-approve).
drop policy if exists "anon submit pending" on public.combo_submissions;
create policy "anon submit pending" on public.combo_submissions
  for insert to anon with check (status = 'pending');

-- anon may READ only approved rows.
drop policy if exists "anon read approved" on public.combo_submissions;
create policy "anon read approved" on public.combo_submissions
  for select to anon using (status = 'approved');

-- NOTE: no UPDATE/DELETE policy for anon → only the service_role (the
-- moderate-combo Edge Function, or the owner in the dashboard) can change
-- status. This is the moderation gate.
