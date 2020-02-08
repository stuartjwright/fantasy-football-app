import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: 300,
      height: 500
    }
  },
  message: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(5),
    color: theme.palette.text.primary
  }
}))

const LoginSignup = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Typography variant="subtitle2" className={classes.message}>
          Existing Users Login:
        </Typography>
        <Login />
      </Paper>
      <Paper elevation={3}>
        <Typography variant="subtitle2" className={classes.message}>
          New Users Create Account:
        </Typography>
        <Signup />
      </Paper>
    </div>
  )
}

export default LoginSignup
