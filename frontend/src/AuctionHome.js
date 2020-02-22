import React, { useContext } from 'react'
import { LeagueStateContext } from './LeagueContext'
import AuctionStatus from './AuctionStatus'
import AuctionReady from './AuctionReady'
import AuctionLive from './AuctionLive'

const AuctionHome = () => {
  const { league } = useContext(LeagueStateContext)
  const { status } = league

  return (
    <div>
      <p>Auction Page - {league.leagueName}</p>
      <AuctionStatus />
      {status === 'ready' && <AuctionReady />}
      {status === 'auction' && <AuctionLive />}
    </div>
  )
}

export default AuctionHome
