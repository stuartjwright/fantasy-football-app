import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import InfoIcon from '@material-ui/icons/Info'
import Typography from '@material-ui/core/Typography'
import LeagueOverview from './PreAuction/LeagueOverview'
import LeagueUserList from './PreAuction/LeagueUserList'
import LeagueRules from './PreAuction/LeagueRules'
import LeagueAuctionReadyBanner from './PreAuction/LeagueAuctionReadyBanner'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500
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
    color: theme.palette.primary.main
  },
  message: {
    marginLeft: 15
  }
}))

const LeagueReady = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LeagueOverview />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LeagueUserList />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LeagueRules />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.banner}>
            <div className={classes.messageContainer}>
              <InfoIcon className={classes.icon} />
              <Typography className={classes.message}>
                Auction is ready to start. Click below to go there now.
              </Typography>
            </div>
            <LeagueAuctionReadyBanner />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LeagueReady
