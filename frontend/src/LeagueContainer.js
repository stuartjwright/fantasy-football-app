import React from 'react'
import LeagueHome from './LeagueHome'
import { LeagueProvider } from './LeagueContext'

const LeagueContainer = ({ match }) => {
  return (
    <LeagueProvider leagueId={match.params.leagueId}>
      <LeagueHome />
    </LeagueProvider>
  )
}

export default LeagueContainer
