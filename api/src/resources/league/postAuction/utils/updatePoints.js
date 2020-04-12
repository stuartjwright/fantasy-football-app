import { League } from '../../league.model'
import { nsp as socketIO } from '../../../../server'

export const updateLeaguePoints = async (
  leagueId,
  playerPointsLookup,
  playerTrendLookup
) => {
  try {
    console.log(`Updating league ${leagueId}`)
    let league = await League.findOne({
      _id: leagueId,
      status: 'postauction'
    })
      .populate('users', 'username')
      .populate('event')
      .exec()
    let { postAuctionUsers } = league
    const updatedUsers = postAuctionUsers.map(u => {
      return {
        _id: u._id,
        user: u.user,
        points: u.squad.reduce(
          (acc, p) => acc + playerPointsLookup[p.playerId],
          0
        ),
        rank: u.rank,
        squad: u.squad.map(p => {
          return {
            _id: p._id,
            firstName: p.firstName,
            lastName: p.lastName,
            displayName: p.displayName,
            team: p.team,
            position: p.position,
            playerId: p.playerId,
            points: playerPointsLookup[p.playerId],
            trend: playerTrendLookup[p.playerId]
          }
        })
      }
    })

    const allPoints = updatedUsers.map(u => u.points)
    updatedUsers.forEach((u, i) => {
      const prevRank = updatedUsers[i].rank || 1
      const newRank = allPoints.filter(p => p > u.points).length + 1
      updatedUsers[i].trend = newRank - prevRank
      updatedUsers[i].rank = newRank
    })

    league.postAuctionUsers = updatedUsers
    await league.save()
    socketIO.to(leagueId).emit('update points', league)
  } catch (e) {
    console.error(e)
    console.log(`Couldn't update league ${leagueId}`)
  }
}

export const setFinalLeaguePoints = async leagueId => {
  try {
    const league = await League.findByIdAndUpdate(
      leagueId,
      {
        status: 'complete'
      },
      { new: true, useFindAndModify: false }
    )
      .populate('users', 'username')
      .populate('event')
    socketIO.to(leagueId).emit('final points', league)
  } catch (e) {
    console.error(e)
  }
}

export const cancelLeagues = async eventId => {
  const leaguesToCancel = await League.find({
    event: eventId,
    status: { $in: ['registering', 'ready', 'auction', 'locked'] }
  })
    .populate('event')
    .exec()
  leaguesToCancel.forEach(async league => {
    console.log(`Cancelling league ${league._id}`)
    league.status = 'cancelled'
    await league.save()
    socketIO.to(league._id).emit('cancel league', league)
  })
}
