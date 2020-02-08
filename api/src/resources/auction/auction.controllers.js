import { Auction } from './auction.model'

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
