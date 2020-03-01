import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import useConstraints from './useConstraints'
import Typography from '@material-ui/core/Typography'
import BidIcon from '@material-ui/icons/EmojiPeopleRounded'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  counter: {
    color: props =>
      props.highBidder === true
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
    textAlign: 'center'
  },
  top: {
    textAlign: 'center',
    marginTop: 0
  },
  bottom: {
    textAlign: 'center'
  },
  newbid: {
    color: props =>
      props.highBidder === true
        ? theme.palette.primary.contrastText
        : theme.palette.primary.contrastText,
    backgroundColor: props =>
      props.highBidder === true
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
    height: '50%',
    width: '50%',
    margin: 'auto',
    borderRadius: '15%'
  },
  iconContainer: {
    textAlign: 'center'
  }
}))

const AuctionCountdownTimer = () => {
  const { countdown } = useContext(LeagueStateContext)
  const { bidderConstraint } = useConstraints()
  const classes = useStyles({ highBidder: bidderConstraint })
  const displayCounter = countdown || null
  const topMessage =
    displayCounter === 2
      ? 'Going once...'
      : displayCounter === 1
      ? 'Going twice...'
      : 'Player will be sold in...'
  const bottomMessage = displayCounter === 1 ? 'second' : 'seconds'
  const bidMessage = bidderConstraint ? 'Bid successful' : 'New bid'
  return countdown === null ? (
    <div className={classes.iconContainer}>
      <BidIcon className={classes.newbid} />
      <Typography variant="h6" component="h6">
        {bidMessage}
      </Typography>
    </div>
  ) : (
    <div>
      <Typography
        className={classes.top}
        variant="h6"
        component="h6"
        gutterBottom
      >
        {topMessage}
      </Typography>
      <Typography className={classes.counter} variant="h1" component="h1">
        {displayCounter}
      </Typography>
      <Typography
        className={classes.bottom}
        variant="h6"
        component="h6"
        gutterBottom
      >
        {bottomMessage}
      </Typography>
    </div>
  )
}

export default AuctionCountdownTimer
