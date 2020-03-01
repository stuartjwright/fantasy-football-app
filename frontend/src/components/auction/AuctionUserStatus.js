import React, { useContext } from 'react'
import useConstaints from './useConstraints'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BadIcon from '@material-ui/icons/Cancel'
import GoodIcon from '@material-ui/icons/CheckCircle'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const getMoneyFormat = value => {
  if (value === 0) return '£0'
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

const useStyles = makeStyles(theme => ({
  bad: {
    color: theme.palette.secondary.light,
    fontWeight: 'bold'
  },
  good: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  title: {
    color: theme.palette.primary.light,
    marginBottom: 10,
    textAlign: 'center'
  }
}))

const AuctionUserStatus = () => {
  const classes = useStyles()
  const {
    league: {
      auction: {
        liveAuctionItem: {
          player: { team, position }
        }
      }
    }
  } = useContext(LeagueStateContext)
  const {
    positionConstraint,
    clubConstraint,
    budgetConstraint,
    bidderConstraint,
    budget
  } = useConstaints`${team} slot remaining`
  const clubMessage = clubConstraint
    ? `${team} slots full`
    : `${team} slot available`
  const positionMessage = positionConstraint
    ? `${position} slots full`
    : `${position} slot available`
  const budgetMessage = `Budget: ${getMoneyFormat(budget)}`

  const canBid = !(positionConstraint || clubConstraint || budgetConstraint)

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Bidding Status
      </Typography>
      <Typography>
        You{' '}
        <span className={canBid ? classes.good : classes.bad}>
          {canBid ? 'can' : 'cannot'}
        </span>{' '}
        bid on this player:
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon>
            {budgetConstraint ? (
              <BadIcon className={classes.bad} />
            ) : (
              <GoodIcon className={classes.good} />
            )}
          </ListItemIcon>
          <ListItemText primary={budgetMessage} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {clubConstraint ? (
              <BadIcon className={classes.bad} />
            ) : (
              <GoodIcon className={classes.good} />
            )}
          </ListItemIcon>
          <ListItemText primary={clubMessage} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {positionConstraint ? (
              <BadIcon className={classes.bad} />
            ) : (
              <GoodIcon className={classes.good} />
            )}
          </ListItemIcon>
          <ListItemText primary={positionMessage} />
        </ListItem>
      </List>
      <Typography>
        You{' '}
        <span className={bidderConstraint ? classes.good : classes.bad}>
          {bidderConstraint ? 'are' : 'are not'}
        </span>{' '}
        the high bidder.
      </Typography>
    </>
  )
}

export default AuctionUserStatus
