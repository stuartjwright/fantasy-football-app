import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { LeagueStateContext } from './LeagueContext'

const LeagueHome = () => {
  const state = useContext(LeagueStateContext)
  const history = useHistory()
  const { league } = state

  const goToAuction = () => {
    history.push(history.location.pathname + '/auction')
  }

  return (
    <div>
      <Typography variant="h6">{league.leagueName}</Typography>
      <Button variant="contained" color="primary" onClick={goToAuction}>
        Go To Auction
      </Button>
    </div>
  )
}

export default LeagueHome
