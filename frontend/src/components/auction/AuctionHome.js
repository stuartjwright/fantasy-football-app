import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
// import AuctionStatus from './AuctionStatus'
import AuctionReady from './AuctionReady'
import AuctionLive from './AuctionLive'
import AuctionItemSold from './AuctionItemSold'

const AuctionHome = () => {
  const { league } = useContext(LeagueStateContext)
  const { status, itemSold } = league

  return (
    <div>
      {/* <p>Auction Page - {league.leagueName}</p>
      <AuctionStatus /> */}
      {status === 'ready' && <AuctionReady />}
      {status === 'auction' && !itemSold && <AuctionLive />}
      {status === 'auction' && itemSold && <AuctionItemSold />}
    </div>
  )
}

export default AuctionHome
