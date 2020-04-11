import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import LeagueRegistering from './LeagueRegistering'
import LeagueReady from './LeagueReady'
import LeagueAuction from './LeagueAuction'
import LeaguePostAuction from './LeaguePostAuction'
// import LeagueComplete from './LeagueComplete'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: 20
  }
}))

const LeagueHome = () => {
  const state = useContext(LeagueStateContext)
  const classes = useStyles()
  const {
    league: { status }
  } = state

  return (
    <div>
      <Typography className={classes.header} variant="h6">
        League Home
      </Typography>
      {status === 'registering' && <LeagueRegistering />}
      {status === 'ready' && <LeagueReady />}
      {status === 'auction' && <LeagueAuction />}
      {(status === 'postauction' || status === 'complete') && (
        <LeaguePostAuction />
      )}
    </div>
  )
}

export default LeagueHome
