import React from 'react'
import AuctionHome from './AuctionHome'
import { LeagueProvider } from './LeagueContext'

const AuctionContainer = ({ match }) => {
  return (
    <LeagueProvider leagueId={match.params.leagueId}>
      <AuctionHome />
    </LeagueProvider>
  )
}

export default AuctionContainer
