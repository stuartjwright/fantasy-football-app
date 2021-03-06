import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import useConstraints from './useConstraints'
import Typography from '@material-ui/core/Typography'
import BidIcon from '@material-ui/icons/EmojiPeopleRounded'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    marginBottom: 10,
    textAlign: 'center'
  },
  counter: {
    color: props =>
      props.highBidder === true
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
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
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    height: '120px',
    width: '120px',
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
    <>
      <Typography className={classes.title} variant="h6">
        Countdown
      </Typography>
      <div className={classes.iconContainer}>
        <BidIcon className={classes.newbid} />
        <Typography variant="h6" component="h6">
          {bidMessage}
        </Typography>
      </div>
    </>
  ) : (
    <>
      <Typography className={classes.title} variant="h6">
        Countdown
      </Typography>
      <Typography
        className={classes.top}
        variant="h6"
        component="h6"
        gutterBottom
      >
        {topMessage}
      </Typography>
      <Typography className={classes.counter} variant="h2" component="h2">
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
    </>
  )
}

export default AuctionCountdownTimer
