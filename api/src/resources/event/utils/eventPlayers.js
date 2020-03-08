import { Player } from '../../player/player.model'
import { Event } from '../event.model'

export const getInitialPlayers = async () => {
  const players = await Player.find()
    .select('_id')
    .lean()
    .exec()
  return players.map(p => ({ player: p._id, points: 0 }))
}

export const addRandomPlayerPoints = async eventId => {
  let event = await Event.findById(eventId).exec()
  if (event.status === 'live') {
    const { playerPoints } = event
    const updatedPlayerPoints = playerPoints.map(p => ({
      _id: p._id,
      player: p.player,
      points: p.points + Math.floor(Math.random() * 5 + 1)
    }))
    event.playerPoints = updatedPlayerPoints
    await event.save()
    return event
  } else {
    event.status = 'live'
    await event.save()
    return event
  }
}

export const setEventComplete = async eventId => {
  const event = await findByIdAndUpdate(
    eventId,
    { status: 'complete' },
    { new: true, useFindAndModify: false }
  )
  return event
}

export const triggerEvent = async eventId => {
  // Do some kind of setInterval thing here to update points a few times every x seconds, then ultimately set league complete
  // socket listener on event namespace. members of league that use this event join that namespace.
}
