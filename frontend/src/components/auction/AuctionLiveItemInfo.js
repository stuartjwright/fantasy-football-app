import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FootballIcon from '@material-ui/icons/SportsSoccer'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import BidIcon from '@material-ui/icons/EmojiPeople'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    marginBottom: 15,
    textAlign: 'center'
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
    league: { auction, users }
  } = useContext(LeagueStateContext)
  let usersLookup = {}
  users.forEach(u => (usersLookup[u._id] = u.username))
  const { liveAuctionItem } = auction
  const { player, currentHighBid, currentHighBidder } = liveAuctionItem

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Current Auction Item
      </Typography>
      <Typography variant="h6">
        {player.firstName} {player.lastName}
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <FootballIcon />
          </ListItemIcon>
          <ListItemText primary={player.team} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FootballIcon />
          </ListItemIcon>
          <ListItemText primary={player.position} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary={getMoneyFormat(currentHighBid)} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BidIcon />
          </ListItemIcon>
          <ListItemText primary={usersLookup[currentHighBidder]} />
        </ListItem>
      </List>
    </>
  )
}

export default AuctionLiveItemInfo
