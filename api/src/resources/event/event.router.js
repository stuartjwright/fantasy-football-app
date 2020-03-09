import { Router } from 'express'
import {
  getOneEvent,
  getAllEvents,
  createEvent,
  simulateEvent
} from './event.controllers'

const router = Router()

router.get('/:eventId', getOneEvent)
router.get('/', getAllEvents)
router.post('/', createEvent)
router.put('/', simulateEvent)

export default router
