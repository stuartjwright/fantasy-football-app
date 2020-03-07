import React, { useState, useContext } from 'react'
import { useAuthState } from '../../contexts/AuthContext'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import AuctionSideBarSingleSquad from './AuctionSideBarSingleSquad'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  title: {
    color: theme.palette.primary.light,
    marginTop: 15,
    textAlign: 'center'
  }
}))

const AuctionSideBarSquads = () => {
  const classes = useStyles()
  const {
    league: {
      users,
      auction: { auctionUsers }
    }
  } = useContext(LeagueStateContext)
  const {
    state: { user }
  } = useAuthState()
  let auctionUsersLookup = {}
  auctionUsers.forEach(a => {
    auctionUsersLookup[a.user] = a
  })

  const [currentUser, setCurrentUser] = useState(
    users.filter(u => u._id === user._id)[0]._id
  )

  const handleChange = event => {
    setCurrentUser(event.target.value)
  }

  return (
    <div>
      <Typography className={classes.title} variant="h6">
        Current Squads
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="user-select">User</InputLabel>
        <Select
          labelId="user-select"
          value={currentUser}
          onChange={handleChange}
        >
          {users.map(u => {
            return (
              <MenuItem value={u._id} key={u._id}>
                {`${u.username}${u._id === user._id ? ' (You)' : ''}`}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <AuctionSideBarSingleSquad
        squad={auctionUsersLookup[currentUser].squad}
      />
    </div>
  )
}

export default AuctionSideBarSquads
