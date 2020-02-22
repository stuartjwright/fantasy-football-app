import React, { useContext } from 'react'
import { LeagueStateContext } from './LeagueContext'

const AuctionStatus = () => {
  const {
    league: { status }
  } = useContext(LeagueStateContext)

  return <p>Status: {status}</p>
}

export default AuctionStatus
