import { AuctionUser } from './auctionUser.model'

export const generateAuctionUsers = async (league, budget) => {
  const { users } = league
  const auctionUsers = await Promise.all(
    users.map(user => AuctionUser.create({ user, budget }))
  )
  const auctionUserIds = auctionUsers.map(auctionUser => auctionUser._id)
  return auctionUserIds
}

export const getAuctionUser = async id => {
  const auctionUser = await AuctionUser.findById(id).exec()
  return auctionUser
}
