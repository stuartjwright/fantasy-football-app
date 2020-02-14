import { League } from '../../league.model'
import { Player } from '../../../player/player.model'

export const checkConstraintsOpening = async (user, leagueId, playerId) => {
  const league = await League.findById(leagueId)
  const player = await Player.findById(playerId)
  const { position, team } = player
  const auctionUser = league.auction.auctionUsers.filter(
    u => u.user.toString() === user.toString()
  )[0]
  const { positionConstraints, clubConstraints } = auctionUser
  return (
    positionConstraints.includes(position) || clubConstraints.includes(team)
  )
}
export const checkConstraints = async (user, leagueId, amount) => {
  const league = await League.findById(leagueId)
  const playerId = league.auction.liveAuctionItem.player._id
  const player = await Player.findById(playerId)
  const { position, team } = player
  const auctionUser = league.auction.auctionUsers.filter(
    u => u.user.toString() === user.toString()
  )[0]
  const { budget, positionConstraints, clubConstraints } = auctionUser
  return (
    amount > budget ||
    positionConstraints.includes(position) ||
    clubConstraints.includes(team)
  )
}
