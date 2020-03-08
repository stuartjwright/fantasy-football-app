import { Router } from 'express'
import {
  getOneEvent,
  getAllEvents,
  createEvent,
  updateEventPoints
} from './event.controllers'

const router = Router()

router.get('/:eventId', getOneEvent)
router.get('/', getAllEvents)
router.post('/', createEvent)
router.put('/', updateEventPoints)

export default router
