import React, { useContext } from 'react'
import { useAuthState } from '../../contexts/AuthContext'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main
  },
  card: {
    marginTop: 25,
    color: theme.palette.text.primary
  }
}))

const getMoneyFormat = value => {
  if (value === 0) return '£0'
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

const AuctionLiveItemInfo = () => {
  const classes = useStyles()
  const {
    state: { user }
  } = useAuthState()
  const thisUserId = user._id
  const {
    league: { auction, users }
  } = useContext(LeagueStateContext)
  let usersLookup = {}
  users.forEach(u => (usersLookup[u._id] = u.username))

  // TODO - make this component look a lot nicer

  const { liveAuctionItem } = auction
  const { player, currentHighBid, currentHighBidder } = liveAuctionItem

  return (
    <div>
      <Typography className={classes.title} variant="h6">
        Current Auction Item
      </Typography>
      <Typography variant="h5">
        {player.firstName} {player.lastName}
      </Typography>
      <Typography variant="subtitle2">Team: {player.team}</Typography>
      <Typography variant="subtitle2">Position: {player.position}</Typography>
      <Typography variant="subtitle2">
        High Bidder: {usersLookup[currentHighBidder]}
      </Typography>
      <Typography variant="subtitle2">
        Current Bid: {getMoneyFormat(currentHighBid)}
      </Typography>
    </div>
  )
}

export default AuctionLiveItemInfo
