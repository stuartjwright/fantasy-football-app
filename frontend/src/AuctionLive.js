import React, { useContext } from 'react'
import { LeagueStateContext } from './LeagueContext'

const AuctionLive = () => {
  const { league } = useContext(LeagueStateContext)
  return <p>Auction {league.leagueName} is live!</p>
}

export default AuctionLive
