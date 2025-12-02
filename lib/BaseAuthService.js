export default class BaseAuthService {
  async getSession() {
    throw new Error('getSession() not implemented')
  }

  onAuthStateChange(handler) {
    throw new Error('onAuthStateChange() not implemented')
  }

  async signUp(opts) {
    throw new Error('signUp() not implemented')
  }

  async signIn(opts) {
    throw new Error('signIn() not implemented')
  }

  async signOut() {
    throw new Error('signOut() not implemented')
  }
}
