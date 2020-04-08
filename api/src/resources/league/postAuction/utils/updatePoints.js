import { League } from '../../league.model'
import { nsp as socketIO } from '../../../../server'

export const updateLeaguePoints = async (leagueId, playerPointsLookup) => {
  try {
    console.log(`Updating league ${leagueId}`)
    let league = await League.findOne({
      _id: leagueId,
      status: 'postauction'
    }).exec()
    let { postAuctionUsers } = league
    const updated = postAuctionUsers.map(u => {
      return {
        _id: u._id,
        user: u.user,
        squad: u.squad.map(p => {
          return {
            _id: p._id,
            firstName: p.firstName,
            lastName: p.lastName,
            displayName: p.displayName,
            team: p.team,
            position: p.position,
            playerId: p.playerId,
            points: playerPointsLookup[p.playerId]
          }
        })
      }
    })

    league.postAuctionUsers = updated
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
    socketIO.to(leagueId).emit('final points', league)

    // TODO: Delete this, just saves work while testing
    League.findByIdAndUpdate(
      leagueId,
      { status: 'postauction' },
      { useFindAndModify: false }
    )
  } catch (e) {
    console.error(e)
  }
}
