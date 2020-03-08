import React from 'react'
import ErrorIcon from '@material-ui/icons/Error'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    width: 500,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main
  },
  button: { width: 200, margin: theme.spacing(2) }
}))

const AuctionNotReady = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <Paper className={classes.paper}>
        <ErrorIcon className={classes.icon} />
        <Typography>
          More players must register before auction can begin.
        </Typography>
      </Paper>
      <form>
        <Button
          variant="contained"
          color="secondary"
          onClick={history.goBack}
          className={classes.button}
        >
          Back
        </Button>
      </form>
    </>
  )
}

export default AuctionNotReady
