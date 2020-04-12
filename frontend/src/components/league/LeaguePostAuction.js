import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LeagueInfo from './PostAuction/LeagueInfo'
import LeagueEventStatus from './PostAuction/LeagueEventStatus'
import LeagueStandings from './PostAuction/LeagueStandings'
import LeaguePlayerPoints from './PostAuction/LeaguePlayerPoints'
import { useAuthState } from '../../contexts/AuthContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperTop: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 150
  },
  paperBottom: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 650
  }
}))

const LeaguePostAuction = () => {
  const classes = useStyles()
  const {
    state: {
      user: { _id }
    }
  } = useAuthState()
  const [squadUser, setSquadUser] = useState(_id)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paperTop}>
            <LeagueInfo />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperTop}>
            <LeagueEventStatus />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Paper className={classes.paperBottom}>
            <LeagueStandings setSquadUser={setSquadUser} />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paperBottom}>
            <LeaguePlayerPoints squadUser={squadUser} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LeaguePostAuction
