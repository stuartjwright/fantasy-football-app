import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InfoIcon from '@material-ui/icons/Info'
import { LeagueStateContext } from '../../../contexts/LeagueContext'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.main
  }
}))

const LeagueInfo = () => {
  const classes = useStyles()
  const {
    league: {
      event: { status }
    }
  } = useContext(LeagueStateContext)

  const pointsMessages = {
    'not started':
      'Scores and standings will be automatically updated once event starts.',
    live:
      'Scores and standings will be automatically updated as players score points.',
    complete: 'Scores and standings are now final.'
  }
  const playersMessages = {
    'not started': 'Click on any team in the standings section to see squad.',
    live:
      'Click on any team in the standings section to see detailed points breakdown.',
    complete:
      'Click on any team in the standings section to see detailed points breakdown.'
  }

  const pointsMessage = pointsMessages[status]
  const playersMessage = playersMessages[status]

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <InfoIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={pointsMessage} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <InfoIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={playersMessage} />
      </ListItem>
    </List>
  )
}

export default LeagueInfo
