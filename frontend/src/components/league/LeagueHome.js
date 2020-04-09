import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import LeagueRegistering from './LeagueRegistering'
import LeagueReady from './LeagueReady'
import LeagueAuction from './LeagueAuction'
import LeaguePostAuction from './LeaguePostAuction'
import LeagueComplete from './LeagueComplete'

const LeagueHome = () => {
  const state = useContext(LeagueStateContext)
  const history = useHistory()
  const {
    league: { status, leagueName }
  } = state

  const goToAuction = () => {
    history.push(history.location.pathname + '/auction')
  }

  console.log(status)

  return (
    <div>
      <Typography variant="h6">League Home: {leagueName}</Typography>
      {status === 'registering' && <LeagueRegistering />}
      {status === 'ready' && <LeagueReady />}
      {status === 'auction' && <LeagueAuction />}
      {status === 'postauction' && <LeaguePostAuction />}
      {status === 'complete' && <LeagueComplete />}

      <Button variant="contained" color="primary" onClick={goToAuction}>
        Go To Auction
      </Button>
    </div>
  )
}

export default LeagueHome
