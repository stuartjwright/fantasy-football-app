import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useAuthState } from '../contexts/AuthContext'
import PersonIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  paper: {
    width: 500,
    marginBottom: 25
  },
  icon: {
    color: theme.palette.primary.main
  }
}))

const Home = () => {
  const classes = useStyles()
  const {
    state: {
      user: { username }
    }
  } = useAuthState()

  return (
    <>
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={`Welcome, ${username}.`} />
          </ListItem>
        </List>
      </Paper>
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemIcon>
              <InfoIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Use the menu on the left to view your existing leagues, create new leagues, or join leagues that others have created." />
          </ListItem>
        </List>
      </Paper>
    </>
  )
}

export default Home
