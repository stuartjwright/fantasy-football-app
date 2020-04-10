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

export const getMoneyFormat = value => {
  if (value === 0) return '£0'
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

const LeagueRules = () => {
  const {
    league: {
      startBudget,
      maxPerClub,
      numGoalkeepers,
      numDefenders,
      numMidfielders,
      numForwards
    }
  } = useContext(LeagueStateContext)
  const classes = useStyles()

  const keys = [
    'Budget',
    'Max Players Per Club',
    'Squad Size',
    'Goalkeepers',
    'Defenders',
    'Midfielders',
    'Forwards'
  ]
  const values = [
    getMoneyFormat(startBudget),
    maxPerClub,
    numGoalkeepers + numDefenders + numMidfielders + numForwards,
    numGoalkeepers,
    numDefenders,
    numMidfielders,
    numForwards
  ]

  return (
    <>
      <Typography className={classes.header} variant="subtitle1">
        League Rules
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

export default LeagueRules
