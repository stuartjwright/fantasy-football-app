import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LeagueOverview from './PreAuction/LeagueOverview'
import LeagueUserList from './PreAuction/LeagueUserList'
import LeagueRules from './PreAuction/LeagueRules'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500
  }
}))

const LeagueRegistering = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LeagueOverview />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LeagueUserList />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <LeagueRules />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LeagueRegistering
