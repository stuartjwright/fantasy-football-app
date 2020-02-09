import { Bid } from './bid.model'

export const createOpeningBid = async user => {
  const bid = await Bid.create({ user })
  return bid
}
