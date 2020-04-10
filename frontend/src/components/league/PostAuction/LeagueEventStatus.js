import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../../contexts/LeagueContext'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import WaitingIcon from '@material-ui/icons/HourglassEmpty'
import LiveIcon from '@material-ui/icons/PlayCircleFilled'
import CompleteIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.main,
    height: 30,
    width: 30
  },
  header: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: 15
  }
}))

const LeagueEventStatus = () => {
  const classes = useStyles()
  const {
    league: {
      event: { status, eventName }
    }
  } = useContext(LeagueStateContext)
  console.log(status)
  const statuses = {
    'not started': 'Not Yet Started',
    live: 'Live Now',
    complete: 'Completed'
  }
  const icons = {
    'not started': WaitingIcon,
    live: LiveIcon,
    complete: CompleteIcon
  }
  const statusMessage = statuses[status]
  const Icon = icons[status]

  return (
    <>
      <Typography className={classes.header} variant="subtitle1">
        {eventName} Status
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Icon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={statusMessage} />
        </ListItem>
      </List>
    </>
  )
}

export default LeagueEventStatus
