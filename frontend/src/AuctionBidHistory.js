import React, { useContext } from 'react'
import { useAuthState } from './AuthContext'
import { LeagueStateContext } from './LeagueContext'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: 520,
    overflow: 'auto'
  },
  bidText: {
    color: theme.palette.text.primary
  },
  highBid: {
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  title: {
    color: theme.palette.primary.main
  }
}))

const getMoneyFormat = value => {
  if (value === 0) return '£0'
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

const AuctionBidHistory = () => {
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
      <Typography variant="subtitle2">(most recent first)</Typography>
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
                className={classes.bidText}
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
