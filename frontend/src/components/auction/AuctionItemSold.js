import React, { useContext } from 'react'
import { useAuthState } from '../../contexts/AuthContext'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { PlayersContext } from '../../contexts/PlayersContext'
import GavelIcon from '@material-ui/icons/Gavel'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FootballIcon from '@material-ui/icons/SportsSoccer'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import PersonIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info'
import { getUsersLookup, getMoneyFormat } from './auctionUtils'

const useStyles = makeStyles(theme => ({
  iconLarge: {
    color: props =>
      props.winner ? theme.palette.primary.main : theme.palette.secondary.main,
    marginLeft: 100,
    marginTop: 50,
    marginBottom: 25,
    width: 200,
    height: 200
  },
  iconSmall: {
    color: theme.palette.primary.main
  },
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  title: {
    color: theme.palette.text.secondary
  }
}))

const AuctionItemSold = () => {
  const {
    state: { user }
  } = useAuthState()
  const {
    league: {
      users,
      auction: { liveAuctionItem }
    }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)
  const {
    state: { playersLookup }
  } = useContext(PlayersContext)

  const winningBidder = liveAuctionItem.currentHighBidder
  const thisUserIsWinningBidder = winningBidder === user._id
  const winningUsername = usersLookup[winningBidder]
  const winningBid = liveAuctionItem.currentHighBid
  const playerSold = playersLookup[liveAuctionItem.player]
  const playerName = `${playerSold.firstName} ${playerSold.lastName}`
  const message = thisUserIsWinningBidder
    ? 'You have won this player!'
    : 'Player sold!'

  const classes = useStyles({ winner: thisUserIsWinningBidder })

  return (
    <div>
      <GavelIcon className={classes.iconLarge} />
      <Paper className={classes.root}>
        <Typography className={classes.title} variant="h6">
          {message}
        </Typography>
      </Paper>
      <Paper className={classes.root}>
        <Typography variant="subtitle1">Details:</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <FootballIcon className={classes.iconSmall} />
            </ListItemIcon>
            <ListItemText primary={playerName} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MoneyIcon className={classes.iconSmall} />
            </ListItemIcon>
            <ListItemText primary={getMoneyFormat(winningBid)} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PersonIcon className={classes.iconSmall} />
            </ListItemIcon>
            <ListItemText primary={winningUsername} />
          </ListItem>
        </List>
      </Paper>
      <Paper className={classes.root}>
        <List>
          <ListItem>
            <ListItemIcon>
              <InfoIcon className={classes.iconSmall} />
            </ListItemIcon>
            <ListItemText primary="Auction will continue in a few seconds." />
          </ListItem>
        </List>
      </Paper>
    </div>
  )
}

export default AuctionItemSold
