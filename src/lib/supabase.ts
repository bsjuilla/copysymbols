// Supabase client for the community-combos UGC feature.
//
// Uses ONLY the public anon key (NEXT_PUBLIC_*), which is safe to ship to the
// browser — Row-Level Security on `combo_submissions` is the real protection:
//   • anon may INSERT only status='pending'  (verified live)
//   • anon may SELECT only status='approved' (moderation gate)
//   • anon may NOT update/delete or self-approve
// The service_role key is never referenced here and must never reach the client.
//
// Graceful degradation: if the env vars are absent (e.g. before the owner has
// provisioned Supabase), getSupabase() returns null and every caller no-ops.
// The build stays green and the feature stays dormant.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured: boolean = Boolean(URL && ANON_KEY);

let _client: SupabaseClient | null = null;

/** Returns a shared Supabase client, or null if not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!URL || !ANON_KEY) return null;
  if (!_client) {
    _client = createClient(URL, ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

/** Shape of a community combo row (only the publicly-readable columns). */
export interface ComboRow {
  combo: string;
  category: string | null;
  submitter: string | null;
}
