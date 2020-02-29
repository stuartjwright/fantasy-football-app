import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import Typography from '@material-ui/core/Typography'
import BidIcon from '@material-ui/icons/EmojiPeopleRounded'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  counter: {
    textAlign: 'center'
  },
  top: {
    textAlign: 'center',
    marginTop: 25
  },
  bottom: {
    textAlign: 'center'
  },
  newbid: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.light,
    width: '100%',
    height: '100%',
    borderRadius: '15%'
  }
}))

const AuctionCountdownTimer = () => {
  const { countdown } = useContext(LeagueStateContext)
  const classes = useStyles()
  const displayCounter = countdown || null
  const topMessage =
    displayCounter === 2
      ? 'Going once...'
      : displayCounter === 1
      ? 'Going twice...'
      : 'Player will be sold in...'
  const bottomMessage = displayCounter === 1 ? 'second' : 'seconds'
  return countdown === null ? (
    <div>
      <BidIcon className={classes.newbid} />
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
