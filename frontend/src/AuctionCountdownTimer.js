import React, { useContext } from 'react'
import { LeagueStateContext } from './LeagueContext'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  counter: {
    textAlign: 'center'
  },
  top: {
    textAlign: 'center',
    marginTop: 25
  },
  bottom: {
    textAlign: 'center'
  }
})

const AuctionCountdownTimer = () => {
  const { countdown } = useContext(LeagueStateContext)
  const classes = useStyles()
  const displayCounter = countdown || null
  return (
    <div>
      <Typography
        className={classes.top}
        variant="h6"
        component="h6"
        gutterBottom
      >
        Player will be sold in...
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
        seconds
      </Typography>
    </div>
  )
}

export default AuctionCountdownTimer
