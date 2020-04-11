import React, { useContext } from 'react'
import {
  LeagueStateContext,
  LeagueDispatchContext
} from '../../contexts/LeagueContext'
import { useAuthState } from '../../contexts/AuthContext'
import Button from '@material-ui/core/Button'
import InfoIcon from '@material-ui/icons/Info'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { startAuction } from '../../requests/AuctionRequests'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.main
  },
  paper: {
    marginBottom: 25,
    width: 500
  }
}))

const AuctionReady = () => {
  const { league } = useContext(LeagueStateContext)
  const dispatch = useContext(LeagueDispatchContext)
  const {
    state: { user }
  } = useAuthState()
  const classes = useStyles()
  const thisUserId = user._id
  const creatorId = league.creator._id
  const thisUserIsCreator = thisUserId === creatorId

  const handleAuctionStart = async () => {
    dispatch({ type: 'START_AUCTION_LOADING' })
    try {
      const data = await startAuction(league._id)
      dispatch({ type: 'START_AUCTION_COMPLETE', data })
    } catch (error) {
      dispatch({ type: 'START_AUCTION_ERROR', error })
    }
  }

  return thisUserIsCreator ? (
    <div>
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemIcon>
              <InfoIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="You are the league owner. Click below to start auction." />
          </ListItem>
        </List>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleAuctionStart}>
        Start Auction
      </Button>
    </div>
  ) : (
    <Paper className={classes.paper}>
      <List>
        <ListItem>
          <ListItemIcon>
            <InfoIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Waiting on league owner to start auction." />
        </ListItem>
      </List>
    </Paper>
  )
}

export default AuctionReady
