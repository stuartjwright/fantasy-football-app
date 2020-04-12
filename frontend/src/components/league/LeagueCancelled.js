import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import WarningIcon from '@material-ui/icons/Error'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.secondary.main
  },
  paper: {
    marginBottom: 25,
    width: 500
  }
}))

const LeagueCancelled = () => {
  const {
    league: {
      event: { eventName }
    }
  } = useContext(LeagueStateContext)
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <List>
        <ListItem>
          <ListItemIcon>
            <WarningIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText
            primary={`This league was cancelled because ${eventName} started before the auction could be completed.`}
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default LeagueCancelled
