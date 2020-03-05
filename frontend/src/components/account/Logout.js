import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { useAuthState } from '../../contexts/AuthContext'

const Logout = () => {
  const {
    state: { user },
    setState
  } = useAuthState()
  const logout = () => {
    localStorage.removeItem('token')
    setState({ status: 'success', error: null, user: null })
  }

  return (
    <>
      <Typography style={{ marginRight: 25 }} variant="body2">
        Logged in as <span style={{ fontWeight: 'bold' }}>{user.username}</span>
      </Typography>
      <Button onClick={logout} color="inherit" variant="outlined">
        Logout
      </Button>
    </>
  )
}

export default Logout
