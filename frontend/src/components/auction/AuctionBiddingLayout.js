import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AuctionCountdownTimer from './AuctionCountdownTimer'
import AuctionBiddingControls from './AuctionBiddingControls'
import AuctionBidHistory from './AuctionBidHistory'
import AuctionLiveItemInfo from './AuctionLiveItemInfo'
import AuctionUserStatus from './AuctionUserStatus'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 900,
    minWidth: 550
  },
  panel: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 235,
    marginBottom: theme.spacing(1)
  },
  paperBottom: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 160
  }
}))

const AuctionBiddingLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper className={classes.panel}>
            <AuctionBidHistory />
          </Paper>
          <Paper className={classes.panel}>
            <AuctionCountdownTimer />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.panel}>
            <AuctionLiveItemInfo />
          </Paper>
          <Paper className={classes.panel}>
            <AuctionUserStatus />
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paperBottom}>
        <AuctionBiddingControls />
      </Paper>
    </div>
  )
}

export default AuctionBiddingLayout
