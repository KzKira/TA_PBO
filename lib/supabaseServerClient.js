import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client. This MUST use the service role key and
// must never be bundled to the client.
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // Throw early to avoid silent failures when server-side code depends on this client.
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set in server environment')
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export default supabaseAdmin
