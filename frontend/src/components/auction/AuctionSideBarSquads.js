import React, { useState, useContext } from 'react'
import { useAuthState } from '../../contexts/AuthContext'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
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

  console.log(auctionUsersLookup[currentUser]) // TODO: display this

  return (
    <div>
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
    </div>
  )
}

export default AuctionSideBarSquads
