import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../../contexts/LeagueContext'

const useStyles = makeStyles(theme => ({
  listKey: {
    height: 40,
    fontWeight: 'bold'
  },
  listValue: {
    height: 40
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 'bold',
    color: theme.palette.primary.main
  }
}))

const LeagueOverview = () => {
  const {
    league: {
      leagueName,
      creator: { username },
      status,
      numRegistered,
      maxEntrants,
      event: { eventName }
    }
  } = useContext(LeagueStateContext)
  const classes = useStyles()

  const keys = [
    'League Name',
    'League Owner',
    'Event',
    'Status',
    'Players Registered'
  ]
  const values = [
    leagueName,
    username,
    eventName,
    status.charAt(0).toUpperCase() + status.slice(1),
    `${numRegistered} / ${maxEntrants}`
  ]

  return (
    <>
      <Typography className={classes.header} variant="subtitle1">
        League Overview
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs>
          {keys.map((k, i) => (
            <Typography variant="body2" className={classes.listKey} key={i}>
              {k}
            </Typography>
          ))}
        </Grid>
        <Grid item xs>
          {values.map((v, i) => (
            <Typography variant="body2" className={classes.listValue} key={i}>
              {v}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default LeagueOverview
