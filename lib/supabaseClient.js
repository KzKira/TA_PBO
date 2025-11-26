import { createClient } from '@supabase/supabase-js'

// Use only environment variables for client-side Supabase config.
// Do NOT keep service secrets or anon keys hard-coded in source.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	// Do not throw on the client during build; show a console warning instead.
	// Developers should set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
	// or the deployment environment.
	// eslint-disable-next-line no-console
	console.warn('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

export default supabase
