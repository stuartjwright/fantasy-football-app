import React from 'react'
import Button from '@material-ui/core/Button'
import { useAuthState } from '../../contexts/AuthContext'

const Logout = () => {
  const { setState } = useAuthState()
  const logout = () => {
    localStorage.removeItem('token')
    setState({ status: 'success', error: null, user: null })
  }

  return (
    <Button onClick={logout} color="inherit">
      Logout
    </Button>
  )
}

export default Logout
