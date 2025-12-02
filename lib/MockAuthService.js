import BaseAuthService from './BaseAuthService'

export default class MockAuthService extends BaseAuthService {
  constructor() {
    super()
    this._user = null
    this._listeners = []
  }

  async getSession() {
    return { data: { session: { user: this._user } } }
  }

  onAuthStateChange(handler) {
    // simplistic listener model for tests
    const listener = { handler }
    this._listeners.push(listener)
    return { data: { subscription: { unsubscribe: () => {
      this._listeners = this._listeners.filter(l => l !== listener)
    } } } }
  }

  async signUp({ email, password, metadata } = {}) {
    this._user = { email, metadata }
    // notify listeners
    this._listeners.forEach(l => l.handler('SIGNED_UP', { user: this._user }))
    return { data: { user: this._user }, error: null }
  }

  async signIn({ email, password } = {}) {
    this._user = { email }
    this._listeners.forEach(l => l.handler('SIGNED_IN', { user: this._user }))
    return { data: { user: this._user }, error: null }
  }

  async signOut() {
    this._user = null
    this._listeners.forEach(l => l.handler('SIGNED_OUT', { user: null }))
    return { error: null }
  }
}
