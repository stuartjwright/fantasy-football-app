import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AuctionCountdownTimer from './AuctionCountdownTimer'
import AuctionBiddingControls from './AuctionBiddingControls'
import AuctionBidHistory from './AuctionBidHistory'

const useStyles = makeStyles(theme => ({
  paperTall: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 600
  },
  paperShort: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 290,
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
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paperTall}>
            <AuctionBidHistory />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperShort}>
            <p>Live auction item details go here.</p>
          </Paper>
          <Paper className={classes.paperShort}>
            <AuctionCountdownTimer />
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paperBottom}>
        <AuctionBiddingControls />
      </Paper>
    </Fragment>
  )
}

export default AuctionBiddingLayout
