import { AuctionItem } from './auctionItem.model'
import { Player } from './../player/player.model'

export const generateAuctionItems = async () => {
  const players = await Player.find()
  const playerIds = players.map(player => player._id)
  const auctionItems = await Promise.all(
    playerIds.map(playerId => AuctionItem.create({ player: playerId }))
  )
  const auctionItemIds = auctionItems.map(item => item._id)
  return auctionItemIds
}

export const registerBidOnAuctionItem = async (
  auctionItemId,
  bidId,
  amount
) => {
  let auctionItem = await AuctionItem.findById(auctionItemId)
  auctionItem.bidHistory.push(bidId)
  auctionItem.highBid = 0
  auctionItem.status = 'live'
  await auctionItem.save()
  return auctionItem
}
