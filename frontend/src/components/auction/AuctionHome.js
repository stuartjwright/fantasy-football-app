import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import AuctionNotReady from './AuctionNotReady'
import AuctionReady from './AuctionReady'
import AuctionLive from './AuctionLive'
import AuctionItemSold from './AuctionItemSold'

const AuctionHome = () => {
  const { league } = useContext(LeagueStateContext)
  const { status, itemSold } = league

  return (
    <>
      {status === 'registering' && <AuctionNotReady />}
      {status === 'ready' && <AuctionReady />}
      {status === 'auction' && !itemSold && <AuctionLive />}
      {status === 'auction' && itemSold && <AuctionItemSold />}
    </>
  )
}

export default AuctionHome
