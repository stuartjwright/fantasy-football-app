import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../../contexts/LeagueContext'

const useStyles = makeStyles(theme => ({
  listKey: {
    fontWeight: 'bold'
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  message: {
    marginTop: 50,
    color: theme.palette.secondary.main
  }
}))

const LeagueUserList = () => {
  const {
    league: { numRegistered, maxEntrants, users }
  } = useContext(LeagueStateContext)
  const classes = useStyles()
  const usernames = users.map(u => u.username)
  const required = maxEntrants - numRegistered

  return (
    <>
      <Typography className={classes.header} variant="subtitle1">
        Registered Users
      </Typography>

      {usernames.map(username => (
        <Typography variant="body2" className={classes.listKey} key={username}>
          {username}
        </Typography>
      ))}

      {required > 0 ? (
        <Typography className={classes.message} variant="body2">
          {required} more {required === 1 ? 'user' : 'users'} required before
          auction can start.
        </Typography>
      ) : (
        <Typography className={classes.message} variant="body2">
          League is full. No more users can register.
        </Typography>
      )}
    </>
  )
}

export default LeagueUserList
