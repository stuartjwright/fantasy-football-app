import { Router } from 'express'
import { getOnePlayer, getAllPlayers } from './player.controllers'

const router = Router()

router.get('/:playerId', getOnePlayer)
router.get('/', getAllPlayers)

export default router
