import React, { useState, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useAuthState } from './AuthContext'
import { signUp, getUser } from './AuthRequests'

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
    color: theme.palette.error.main,
    marginLeft: theme.spacing(3)
  }
}))

export default () => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [password1Error, setPassword1Error] = useState('')
  const [password2Error, setPassword2Error] = useState('')
  const [authError, setAuthError] = useState('')
  const isValidUsername = () => username.length >= 4 && username.length <= 16
  const isValidPassword = () => password1.length > 0
  const isPasswordMatch = () => password1 === password2
  const { setState } = useAuthState()

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePassword1Change = event => {
    setPassword1(event.target.value)
  }

  const handlePassword2Change = event => {
    setPassword2(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setUsernameError('')
    setPassword1Error('')
    setPassword2Error('')
    setAuthError('')
    if (isValidUsername() && isValidPassword() && isPasswordMatch()) {
      const { token } = await signUp(username, password1)
      if (token) {
        localStorage.setItem('token', token)
        const user = await getUser()
        if (user) {
          setState({ status: 'success', error: null, user })
        } else {
          setState({ status: 'error', error: 'Signup failed.', user: null })
        }
      } else {
        setAuthError('Signup failed. Please try again.')
        setUsername('')
        setPassword1('')
        setPassword2('')
      }
    }

    if (!isValidUsername()) {
      setUsernameError('Must be 4-16 characters')
    }
    if (!isValidPassword()) {
      setPassword1Error('Required')
      if (isPasswordMatch()) {
        setPassword2Error('Required')
      }
    }
    if (!isPasswordMatch()) {
      setPassword2Error('Passwords must match')
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
        error={usernameError ? true : false}
        helperText={usernameError}
        id="usernamenew"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        variant="outlined"
      />
      <br />
      <TextField
        error={password1Error ? true : false}
        helperText={password1Error}
        id="password1"
        label="Password"
        value={password1}
        onChange={handlePassword1Change}
        variant="outlined"
        type="password"
      />
      <TextField
        error={password2Error ? true : false}
        helperText={password2Error}
        id="password2"
        label="Confirm Password"
        value={password2}
        onChange={handlePassword2Change}
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
        Sign Up
      </Button>
    </form>
  )
}
