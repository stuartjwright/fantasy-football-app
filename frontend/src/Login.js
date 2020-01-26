import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

export default () => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const validateUsername = () => username.length >= 4 && username.length <= 16
  const validatePassword = () => password.length > 0

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(username, password)
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        variant="outlined"
      />
      <br />
      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        type="password"
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  )
}
