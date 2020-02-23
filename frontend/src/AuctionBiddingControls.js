import React, { useState, useContext, useEffect } from 'react'
import { LeagueStateContext, LeagueDispatchContext } from './LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import BidIcon from '@material-ui/icons/EmojiPeople'
import Button from '@material-ui/core/Button'
import { makeCounterBid } from './AuctionRequests'

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
  const { league } = useContext(LeagueStateContext)
  const { currentHighBid } = league.auction.liveAuctionItem
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
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleBidSubmit}
      >
        Bid
        <BidIcon />
      </Button>
    </form>
  )
}

export default AuctionBiddingControls
