import React, { createContext, useState, useEffect } from 'react'
import authService from '../lib/AuthService'

export const AuthContext = createContext({})

export const AuthProvider = ({ children, service = authService }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // initial session
    service.getSession().then(({ data }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = service.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      // unsubscribe listener
      try {
        listener?.subscription?.unsubscribe?.()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  const signUp = async ({ email, password, metadata } = {}) => {
    const result = await service.signUp({ email, password, metadata })
    return result
  }

  const signIn = async ({ email, password } = {}) => {
    const result = await service.signIn({ email, password })
    return result
  }

  const signOut = async () => {
    const result = await service.signOut()
    if (!result.error) setUser(null)
    return result
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
