import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.main
  },
  paper: {
    marginBottom: 25,
    width: 500
  }
}))

const AuctionFinished = () => {
  const history = useHistory()
  const classes = useStyles()
  useEffect(() => {
    const redirect = () => {
      history.push(history.location.pathname.slice(0, -8))
    }
    const timer = setTimeout(redirect, 3000)
    return () => clearTimeout(timer)
  }, [history])

  return (
    <Paper className={classes.paper}>
      <List>
        <ListItem>
          <ListItemIcon>
            <InfoIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Auction complete. You will be redirected to this league's home page." />
        </ListItem>
      </List>
    </Paper>
  )
}

export default AuctionFinished
