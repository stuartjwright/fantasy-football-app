import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import InfoIcon from '@material-ui/icons/Error'
import Typography from '@material-ui/core/Typography'
import LeagueAuctionReadyBanner from './PreAuction/LeagueAuctionReadyBanner'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  banner: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    height: 120
  },
  messageContainer: {
    display: 'flex',
    margin: 15
  },
  icon: {
    color: theme.palette.secondary.main
  },
  message: {
    marginLeft: 15
  }
}))

const LeagueAuction = () => {
  const classes = useStyles()
  const history = useHistory()
  useEffect(() => {
    const redirect = () => {
      history.push(history.location.pathname + '/auction')
    }
    const timer = setTimeout(redirect, 3000)
    return () => clearTimeout(timer)
  }, [history])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.banner}>
            <div className={classes.messageContainer}>
              <InfoIcon className={classes.icon} />
              <Typography className={classes.message}>
                Auction is in progress now. You will be redirected in a few
                seconds, or click below to go there now.
              </Typography>
            </div>
            <LeagueAuctionReadyBanner />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LeagueAuction
