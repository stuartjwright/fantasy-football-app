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
    maxWidth: 800
  },
  paperTall: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 600
  },
  paperMedium: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 320,
    marginBottom: 20
  },
  paperShort: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 260,
    marginBottom: 20
  },
  paperBottom: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 180
  }
}))

const AuctionBiddingLayout = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paperMedium}>
            <AuctionBidHistory />
          </Paper>
          <Paper className={classes.paperShort}>
            <AuctionCountdownTimer />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperMedium}>
            <AuctionLiveItemInfo />
          </Paper>
          <Paper className={classes.paperShort}>
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
