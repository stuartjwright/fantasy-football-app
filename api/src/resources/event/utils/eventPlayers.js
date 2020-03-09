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

export const setEventComplete = async eventId => {
  const event = await Event.findByIdAndUpdate(
    eventId,
    { status: 'complete' },
    { new: true, useFindAndModify: false }
  )
  return event
}

export const resetEvent = async eventId => {
  let event = await Event.findById(eventId).exec()
  event.playerPoints = await getInitialPlayers()
  event.status = 'not started'
  await event.save()
  return event
}

export const startSimulation = async eventId => {
  // TODO: maybe instead of having a socket here, we have this function send messages to relevant leagues, so that points can be updated there
  let event = await Event.findOne({ _id: eventId, status: 'not started' })
    .select('-playerPoints')
    .exec()
  if (!event) {
    throw new Error('Could not find event to simulate')
  }
  const interval = 5000 // update every 5 seconds, can probs make this a little higher
  let numUpdates = 10 // num times points updates come through, would be higher in reality but 10 fine for now
  event = await startEvent(eventId)
  console.log('Simulation started')
  const countdown = setInterval(async () => {
    numUpdates -= 1
    event = await addRandomPlayerPoints(eventId)
    console.log(numUpdates)
    console.log(event.status)
    console.log(event.playerPoints.slice(0, 3))
    // Do a socket emit here
    if (numUpdates <= 0) {
      clearInterval(countdown)
      event = await setEventComplete(eventId)
      console.log(event.status)
      console.log('Event Complete')
      // Do a final socket emit here, maybe pause a few seconds first
      event = await resetEvent(eventId) // get rid of this when running for real, just saves testing work for now
    }
  }, interval)
}
