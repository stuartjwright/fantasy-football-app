import { Event } from './event.model'
import { getInitialPlayers, startSimulation } from './utils/eventPlayers'

export const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .lean()
      .exec()

    if (!event) {
      return res.status(400).end()
    }

    res.status(200).json({ event })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .lean()
      .exec()

    if (!events) {
      return res.status(400).end()
    }

    res.status(200).json({ events })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createEvent = async (req, res) => {
  try {
    const playerPoints = await getInitialPlayers()
    const event = await Event.create({
      ...req.body,
      playerPoints,
      status: 'not started'
    })
    res.status(201).json({ event })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const simulateEvent = async (req, res) => {
  try {
    const { eventId } = req.body
    startSimulation(eventId)
    res.status(201).json({ message: 'Simulation started' })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
