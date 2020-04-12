import { Auction } from './auction.model'
import { getAuctionUser } from './../auctionUser/auctionUser.controllers'
import { createOpeningBid } from './../bid/bid.controllers'
import { registerBidOnAuctionItem } from './../auctionItem/auctionItem.controllers'

export const getOneAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId)
      .lean()
      .exec()

    if (!auction) {
      return res.status(400).end()
    }

    res.status(200).json({ auction })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createAuction = async (auctionItems, auctionUsers) => {
  const auction = await Auction.create({
    auctionItems,
    auctionUsers,
    liveItem: null,
    nextUser: auctionUsers[0]
  })
  return auction
}

export const makeOpeningBid = async (req, res) => {
  try {
    const { auctionId, auctionItemId, auctionUserId } = req.body
    const user = req.user._id
    const auctionUser = await getAuctionUser(auctionUserId)
    if (auctionUser.user.toString() !== user.toString()) {
      throw new Error('User does not match auction user')
    }
    let auction = await Auction.findById(auctionId)
    if (auctionUserId.toString() !== auction.nextUser.toString()) {
      throw new Error("Not this user's turn")
    }
    if (!auction.auctionItems.includes(auctionItemId.toString())) {
      throw new Error('This item does not belong to this auction.')
    }
    if (auction.liveItem) {
      throw new Error(
        'Cannot open bidding on new item until existing item sold.'
      )
    }

    const bid = await createOpeningBid(auctionUser.user)
    const bidId = bid._id
    await registerBidOnAuctionItem(auctionItemId, bidId, 0)
    auction.liveItem = auctionItemId
    auction.save()
    res.status(200).json({ auction })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
