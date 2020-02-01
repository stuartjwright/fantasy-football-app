import { Router } from 'express'
import {
  getOneLeague,
  getAllLeagues,
  createLeague,
  getMyLeagues,
  joinLeague
} from './league.controllers'

const router = Router()

router.get('/my', getMyLeagues)
router.get('/:leagueId', getOneLeague)
router.get('/', getAllLeagues)
router.post('/', createLeague)
router.put('/', joinLeague)

export default router
