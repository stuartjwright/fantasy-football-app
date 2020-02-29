import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { useAuthState } from '../../contexts/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AuctionSideBar from './AuctionSideBar'
import AuctionOpeningBid from './AuctionOpeningBid'
import AuctionBiddingLayout from './AuctionBiddingLayout'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 800
  }
}))

const AuctionLive = () => {
  const classes = useStyles()
  const { league } = useContext(LeagueStateContext)
  const {
    state: { user }
  } = useAuthState()
  const thisUserId = user._id
  const { auction } = league
  const { liveAuctionItem, nextUser } = auction

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {liveAuctionItem ? (
            <AuctionBiddingLayout />
          ) : nextUser === thisUserId ? (
            <AuctionOpeningBid />
          ) : (
            <p>Waiting on opening bid from someone else.</p>
          )}
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <AuctionSideBar />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default AuctionLive
