import React, { useState, useContext, useEffect } from 'react'
import {
  LeagueStateContext,
  LeagueDispatchContext
} from '../../contexts/LeagueContext'
import { useAuthState } from '../../contexts/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import BidIcon from '@material-ui/icons/EmojiPeople'
import Button from '@material-ui/core/Button'
import { makeCounterBid } from '../../requests/AuctionRequests'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    textAlign: 'center'
  },
  button: {
    width: 250,
    marginTop: 25,
    textAlign: 'center'
  }
}))

const getMoneyFormat = value => {
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

const AuctionBiddingControls = () => {
  const classes = useStyles()
  const dispatch = useContext(LeagueDispatchContext)
  const { league, countdown } = useContext(LeagueStateContext)
  const { auction } = league
  const { liveAuctionItem } = auction
  const { currentHighBid, currentHighBidder } = liveAuctionItem
  const increments =
    currentHighBid < 2500000
      ? [100000, 250000, 500000, 1000000]
      : currentHighBid < 5000000
      ? [250000, 500000, 1000000, 1500000]
      : [500000, 1000000, 1500000, 2000000]
  const bidAmounts = increments.map(i => currentHighBid + i)

  const [bid, setBid] = useState(bidAmounts[0])
  const marks = bidAmounts.map(b => {
    return { value: b, label: getMoneyFormat(b) }
  })

  const { player } = liveAuctionItem
  const {
    state: { user }
  } = useAuthState()
  const thisUserId = user._id
  const thisAuctionUser = auction.auctionUsers.filter(
    a => a.user === thisUserId
  )[0]
  const { positionConstraints, clubConstraints, budget } = thisAuctionUser
  const { position, team } = player
  const positionConstraint = positionConstraints.includes(position)
  const clubConstraint = clubConstraints.includes(team)
  const budgetConstraint = currentHighBid + bidAmounts[0] >= budget
  const bidderConstraint = currentHighBidder === thisUserId
  const highBidConstraint = bid > budget
  const disableSlider =
    bidderConstraint || positionConstraint || clubConstraint || budgetConstraint
  const disableButton = disableSlider || highBidConstraint || countdown === null

  useEffect(() => {
    setBid(currentHighBid + increments[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHighBid])

  const handleBidChange = (event, value) => {
    setBid(value)
  }

  const handleBidSubmit = async () => {
    const leagueId = league._id
    const auctionItemId = league.auction.liveAuctionItem._id
    dispatch({ type: 'BID_LOADING' })
    try {
      const data = await makeCounterBid(leagueId, auctionItemId, bid)
      if (data) {
        dispatch({ type: 'BID_COMPLETE', data })
      } else {
        dispatch({ type: 'BID_ERROR', error: 'bid unsuccessful' })
      }
    } catch (error) {
      dispatch({ type: 'BID_ERROR', error })
    }
  }
  return (
    <form className={classes.root}>
      <Slider
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={marks}
        min={bidAmounts[0]}
        max={bidAmounts[bidAmounts.length - 1]}
        onChange={handleBidChange}
        value={bid}
        disabled={disableSlider}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleBidSubmit}
        disabled={disableButton}
      >
        Bid
        <BidIcon />
      </Button>
    </form>
  )
}

export default AuctionBiddingControls
