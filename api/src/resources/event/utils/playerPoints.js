import { Player } from '../../player/player.model'
import { Event } from '../event.model'
import { League } from '../../league/league.model'
import {
  updateLeaguePoints,
  setFinalLeaguePoints
} from '../../league/postAuction/utils/updatePoints'

export const getInitialPlayers = async () => {
  const players = await Player.find()
    .select('_id')
    .lean()
    .exec()
  return players.map(p => ({ player: p._id, points: 0 }))
}

const addRandomPlayerPoints = async eventId => {
  let event = await Event.findById(eventId).exec()
  const { playerPoints } = event
  const updatedPlayerPoints = playerPoints.map(p => ({
    _id: p._id,
    player: p.player,
    points: p.points + Math.floor(Math.random() * 5 + 1)
  }))
  event.playerPoints = updatedPlayerPoints
  await event.save()
  return event
}

export const startEvent = async eventId => {
  const event = await Event.findByIdAndUpdate(
    eventId,
    { status: 'live' },
    { new: true, useFindAndModify: false }
  )
  return event
}

const setEventComplete = async eventId => {
  const event = await Event.findByIdAndUpdate(
    eventId,
    { status: 'complete' },
    { new: true, useFindAndModify: false }
  )
  return event
}

const resetEvent = async eventId => {
  let event = await Event.findById(eventId).exec()
  event.playerPoints = await getInitialPlayers()
  event.status = 'not started'
  await event.save()
  return event
}

export const startSimulation = async eventId => {
  try {
    let event = await Event.findOne({ _id: eventId, status: 'not started' })
      .select('-playerPoints')
      .exec()
    if (!event) {
      throw new Error('Could not find event to simulate')
    }

    const leaguesToCancel = await League.find({
      event: eventId,
      status: { $in: ['registering', 'ready', 'auction', 'locked'] }
    })
    leaguesToCancel.forEach(async league => {
      console.log(`Cancelling league ${league._id}`)
      league.status = 'cancelled'
      await league.save()
    })

    const leagues = await League.find(
      { event: eventId, status: 'postauction' },
      'id users'
    ).exec()
    const leagueIds = leagues.map(l => l.id)
    const interval = 3000 // update every 3 seconds, can probs make this a little higher
    let numUpdates = 4 // num times points updates come through, would be higher in reality but 4 fine for now
    event = await startEvent(eventId)
    console.log('Simulation started')
    const countdown = setInterval(async () => {
      numUpdates -= 1
      event = await addRandomPlayerPoints(eventId)
      const { playerPoints } = event
      let playerPointsLookup = {}
      playerPoints.forEach(p => (playerPointsLookup[p.player] = p.points))
      leagueIds.forEach(leagueId =>
        updateLeaguePoints(leagueId, playerPointsLookup)
      )
      if (numUpdates <= 0) {
        clearInterval(countdown)
        event = await setEventComplete(eventId)
        console.log('Event Complete')
        leagueIds.forEach(leagueId => setFinalLeaguePoints(leagueId))

        // TODO: Delete this, just saves testing work for now
        // event = await resetEvent(eventId)
      }
    }, interval)
  } catch (e) {
    console.error(e)
  }
}
