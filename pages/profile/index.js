import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const ProfilePage = () => {
  const { user, signOut, loading } = useContext(AuthContext)
  const router = useRouter()

  if (loading) return <div>Loading...</div>

  if (!user) {
    // If not logged in, redirect to login
    if (typeof window !== 'undefined') router.push('/login')
    return null
  }

  const name = user.user_metadata?.full_name || user.email
  const email = user.email

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <>
      <Navbar hclass={'wpo-header-style-4'} />
      <Grid className="loginWrapper">
        <Grid className="loginForm">
          <h2>Profile</h2>
          <p>Account information</p>
          <div style={{ marginBottom: 16 }}>
            <strong>Name:</strong>
            <div>{name}</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Email:</strong>
            <div>{email}</div>
          </div>
          <Button className="cBtnTheme" onClick={handleLogout}>Logout</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage
