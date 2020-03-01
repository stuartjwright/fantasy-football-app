import React, { useState, useContext, useEffect } from 'react'
import {
  LeagueStateContext,
  LeagueDispatchContext
} from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import BidIcon from '@material-ui/icons/EmojiPeople'
import Button from '@material-ui/core/Button'
import { makeCounterBid } from '../../requests/AuctionRequests'
import useConstraints from './useConstraints'

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

const getBidAmounts = (current, budget) => {
  const increment =
    current < 1000000 ? 100000 : current < 2500000 ? 250000 : 500000
  const bidAmounts = [1, 2, 3, 4].map(i => current + i * increment)
  const rounded = bidAmounts.map(b => Math.floor(b / increment) * increment)
  const filtered = rounded.filter(b => b > current && b <= budget)

  if (filtered.length < 4 && filtered[filtered.length - 1] !== budget) {
    // Let a bidder go 'all-in' when necessary
    return [...filtered, budget]
  }
  return filtered
}

const AuctionBiddingControls = () => {
  const classes = useStyles()
  const dispatch = useContext(LeagueDispatchContext)
  const { league, countdown } = useContext(LeagueStateContext)
  const {
    auction: {
      liveAuctionItem: { currentHighBid }
    }
  } = league

  const constraints = useConstraints()

  const bidAmounts = getBidAmounts(currentHighBid, constraints.budget)

  useEffect(() => {
    setBid(bidAmounts[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHighBid])

  const [bid, setBid] = useState(bidAmounts[0])
  const bidTicks = bidAmounts.map(b => {
    return { value: b, label: getMoneyFormat(b) }
  })

  const {
    positionConstraint,
    clubConstraint,
    budgetConstraint,
    bidderConstraint
  } = constraints
  const disableSlider =
    bidderConstraint || positionConstraint || clubConstraint || budgetConstraint
  const disableButton = disableSlider || countdown === null

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
        marks={bidTicks}
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
