import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import { getUsersLookup } from './auctionUtils'
import WaitingIcon from '@material-ui/icons/HourglassFullTwoTone'
import InfoIcon from '@material-ui/icons/Info'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  iconLarge: {
    color: theme.palette.primary.main,
    marginLeft: 100,
    marginTop: 50,
    marginBottom: 25,
    width: 200,
    height: 200
  },
  iconSmall: {
    color: theme.palette.primary.main
  }
}))

const AuctionWaitingOpeningBid = () => {
  const classes = useStyles()
  const {
    league: {
      users,
      auction: { nextUser }
    }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)
  const nextBidder = usersLookup[nextUser]

  return (
    <div>
      <WaitingIcon className={classes.iconLarge} />
      <List component={Paper}>
        <ListItem>
          <ListItemIcon>
            <InfoIcon className={classes.iconSmall} />
          </ListItemIcon>
          <ListItemText primary="Bidding on next player will begin shortly." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoIcon className={classes.iconSmall} />
          </ListItemIcon>
          <ListItemText
            primary={`Waiting on ${nextBidder} to select a player.`}
          />
        </ListItem>
      </List>
    </div>
  )
}

export default AuctionWaitingOpeningBid
