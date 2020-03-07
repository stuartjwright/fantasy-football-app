import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FootballIcon from '@material-ui/icons/SportsSoccer'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import BidIcon from '@material-ui/icons/EmojiPeople'
import PlayerIcon from '@material-ui/icons/Person'
import TeamIcon from '@material-ui/icons/People'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { getMoneyFormat, getUsersLookup } from './auctionUtils'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    marginBottom: 0,
    textAlign: 'center'
  }
}))

const AuctionLiveItemInfo = () => {
  const classes = useStyles()
  const {
    league: { auction, users }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)
  const { liveAuctionItem } = auction
  const { player, currentHighBid, currentHighBidder } = liveAuctionItem

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Current Auction Item
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <PlayerIcon />
          </ListItemIcon>
          <ListItemText primary={`${player.firstName} ${player.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TeamIcon />
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
