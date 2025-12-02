import BaseAuthService from './BaseAuthService'
import { supabase } from './supabaseClient'

export default class SupabaseAuthService extends BaseAuthService {
  // use a private field to encapsulate the supabase client
  #supabase

  constructor(supabaseClient = supabase) {
    super()
    this.#supabase = supabaseClient
  }

  async getSession() {
    return this.#supabase.auth.getSession()
  }

  onAuthStateChange(handler) {
    return this.#supabase.auth.onAuthStateChange(handler)
  }

  async signUp({ email, password, metadata } = {}) {
    const options = metadata ? { options: { data: metadata } } : {}
    return this.#supabase.auth.signUp({ email, password, ...options })
  }

  async signIn({ email, password } = {}) {
    return this.#supabase.auth.signInWithPassword({ email, password })
  }

  async signOut() {
    return this.#supabase.auth.signOut()
  }
}
