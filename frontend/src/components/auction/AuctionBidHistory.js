import React, { useContext } from 'react'
import { useAuthState } from '../../contexts/AuthContext'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { getMoneyFormat, getUsersLookup } from './auctionUtils'

const useStyles = makeStyles(theme => ({
  root: {
    height: 160,
    overflow: 'auto'
  },
  highBid: {
    fontWeight: 'bold'
  },
  title: {
    color: theme.palette.primary.light,
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  }
}))

const AuctionBidHistory = () => {
  const classes = useStyles()
  const {
    state: { user }
  } = useAuthState()
  const thisUserId = user._id
  const {
    league: { auction, users }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)
  const {
    liveAuctionItem: { bidHistory }
  } = auction
  const bids = bidHistory
    .map((b, i) => {
      return {
        num: i,
        user: b.user === thisUserId ? 'You' : usersLookup[b.user],
        amount: b.amount
      }
    })
    .reverse()

  return (
    <div>
      <Typography className={classes.title} variant="h6">
        Bid History
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle2">
        (most recent first)
      </Typography>
      <List dense={true} className={classes.root}>
        <ListItem>
          <ListItemText
            disableTypography
            className={classes.highBid}
            primary={`${bids[0].user} bid ${getMoneyFormat(bids[0].amount)}`}
          />
        </ListItem>
        {bids.slice(1).map(b => {
          return (
            <ListItem key={b.num}>
              <ListItemText
                primary={`${b.user} bid ${getMoneyFormat(b.amount)}`}
              />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default AuctionBidHistory
