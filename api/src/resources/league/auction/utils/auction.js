import { League } from '../../league.model'
import { defaultValues } from '../../league.config'
import { Player } from '../../../player/player.model'
import { nsp as socketIO } from '../../../../server'

const checkBidIsHighest = async (leagueId, auctionItemId, amount) => {
  const league = await League.findOne({
    _id: leagueId,
    status: 'auction',
    'auction.liveAuctionItem._id': auctionItemId,
    'auction.liveAuctionItem.currentHighBid': amount
  }).exec()
  return !!league
}

export const startCountdown = (leagueId, auctionItemId, amount) => {
  let count = defaultValues.countdownTimer
  const countdown = setInterval(async () => {
    const league = await checkBidIsHighest(leagueId, auctionItemId, amount)
    if (!league) {
      return clearInterval(countdown)
    }
    // TODO: Maybe need to checkBidIsHighestAndLock in one atomic transaction
    count -= 1
    if (count <= 0) {
      const lockedLeague = await lockAuction(leagueId)
      clearInterval(countdown)
      socketIO.to(leagueId).emit('presale lock', lockedLeague)
      const updatedLeague = await setAuctionItemComplete(leagueId)
      setTimeout(() => {
        socketIO.to(leagueId).emit('player sold', updatedLeague)
      }, 3000)
      return
    }

    socketIO.to(leagueId).emit('countdown', count)
    console.log(auctionItemId, amount, count)
  }, 1000)
}

const lockAuction = async leagueId => {
  return League.findByIdAndUpdate(
    leagueId,
    {
      status: 'locked'
    },
    { useFindAndModify: false }
  )
}

const getPositionConstraints = league => {
  const { numGoalkeepers, numDefenders, numMidfielders, numForwards } = league
  const positionConstraints = {
    Goalkeeper: numGoalkeepers,
    Defender: numDefenders,
    Midfielder: numMidfielders,
    Forward: numForwards
  }
  return positionConstraints
}

const getSoldPlayer = async playerId =>
  Player.findById(playerId)
    .select('-_id')
    .lean()
    .exec()

const getNextUser = (league, auctionUsers, maxSquad, status) => {
  if (status === 'postauction') return null
  const { nextUser } = league.auction
  const candidates = auctionUsers
    .filter(
      u =>
        u.squad.length < maxSquad || u.user.toString() === nextUser.toString()
    )
    .map(u => u.user)
  const idx = candidates.indexOf(nextUser)
  const newIdx = (idx + 1) % candidates.length
  const newNextUser = candidates[newIdx]
  return newNextUser
}

const hasMaxPerClub = (squad, team, maxPerClub) =>
  squad.filter(s => s.team === team).length >= maxPerClub

const hasMaxPerPosition = (squad, position, playerPosition, maximum) =>
  position === playerPosition &&
  squad.filter(s => s.position === position).length >= maximum

const getUpdatedAuctionUsers = async (
  league,
  playerIdSold,
  positionConstraints,
  winningBid,
  winningBidderId
) => {
  const player = await getSoldPlayer(playerIdSold)
  const { maxPerClub } = league
  let auctionUsers = league.auction.auctionUsers
  auctionUsers.forEach((auctionUser, i) => {
    if (auctionUser.user.toString() === winningBidderId.toString()) {
      auctionUsers[i].budget -= winningBid
      auctionUsers[i].squad.push({
        ...player,
        cost: winningBid
      })
      const { team } = player
      if (hasMaxPerClub(auctionUsers[i].squad, team, maxPerClub)) {
        auctionUsers[i].clubConstraints.push(team)
      }
      for (let [position, maximum] of Object.entries(positionConstraints)) {
        if (
          hasMaxPerPosition(
            auctionUsers[i].squad,
            position,
            player.position,
            maximum
          )
        ) {
          auctionUsers[i].positionConstraints.push(position)
        }
      }
    }
  })
  return auctionUsers
}

const getAuctionStatus = (auctionUsers, maxSquad) =>
  auctionUsers.every(u => u.squad.length >= maxSquad)
    ? 'postauction'
    : 'auction'

const updateLeague = (league, auctionUsers, nextUser, status, soldItem) => {
  league.auction.auctionUsers = auctionUsers
  league.auction.liveAuctionItem = null
  league.auction.nextUser = nextUser
  league.status = status
  league.auction.soldAuctionItems.push(soldItem)
}

const setAuctionItemComplete = async leagueId => {
  try {
    let league = await League.findById(leagueId).exec()
    const winningBidderId = league.auction.liveAuctionItem.currentHighBidder
    const winningBid = league.auction.liveAuctionItem.currentHighBid
    const playerIdSold = league.auction.liveAuctionItem.player
    const positionConstraints = getPositionConstraints(league)
    const maxSquad = Object.values(positionConstraints).reduce((a, b) => a + b)
    const auctionUsers = await getUpdatedAuctionUsers(
      league,
      playerIdSold,
      positionConstraints,
      winningBid,
      winningBidderId
    )
    const soldItem = {
      player: playerIdSold,
      winner: winningBidderId,
      cost: winningBid
    }
    const status = getAuctionStatus(auctionUsers, maxSquad)
    const nextUser = getNextUser(league, auctionUsers, maxSquad, status)
    updateLeague(league, auctionUsers, nextUser, status, soldItem)
    const updatedLeague = await league.save()
    console.log('Player successfully sold.')
    return updatedLeague
  } catch (e) {
    console.error(e)
  }
}
