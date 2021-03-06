import React, { useState, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useAuthState } from '../../contexts/AuthContext'
import { signIn, getUser } from '../../requests/AuthRequests'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root ': {
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(2),
      width: 200
    },
    '& .MuiButton-root ': {
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(1),
      width: 100
    },
    width: 275,
    justifyContent: 'center'
  },
  errorText: {
    color: theme.palette.error.main
  }
}))

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [authError, setAuthError] = useState('')
  const isValidUsername = () => username.length >= 3 && username.length <= 16
  const isValidPassword = () => password.length > 0
  const { setState } = useAuthState()

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setUsernameError('')
    setPasswordError('')
    setAuthError('')
    if (isValidUsername() && isValidPassword()) {
      const { token } = await signIn(username, password)
      if (token) {
        localStorage.setItem('token', token)
        const user = await getUser()
        if (user) {
          setState({ status: 'success', error: null, user })
        } else {
          setState({ status: 'error', error: 'Login failed.', user: null })
        }
      } else {
        setAuthError('Login failed. Please try again.')
        setUsername('')
        setPassword('')
      }
    }
    if (!isValidUsername()) {
      setUsernameError('Must be 3-16 characters')
    }
    if (!isValidPassword()) {
      setPasswordError('Required')
    }
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        autoFocus
        error={usernameError ? true : false}
        helperText={usernameError}
        id="username"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        variant="outlined"
      />
      <br />
      <TextField
        error={passwordError ? true : false}
        helperText={passwordError}
        id="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        type="password"
      />
      <br />
      {authError && (
        <Fragment>
          <FormHelperText className={classes.errorText}>
            {authError}
          </FormHelperText>
          <br />
        </Fragment>
      )}
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  )
}

export default Login
