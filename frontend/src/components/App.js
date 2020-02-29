import React from 'react'
import { useAuthState, AuthProvider } from '../contexts/AuthContext'
import MainNavigation from './MainNavigation'

const AuthContainer = () => {
  const {
    state: { user }
  } = useAuthState()
  return <MainNavigation auth={user ? true : false} />
}

const App = () => {
  return (
    <AuthProvider>
      <AuthContainer />
    </AuthProvider>
  )
}

export default App
