import { Router } from 'express'
import {
  getOneLeague,
  getAllLeagues,
  createLeague,
  getMyLeagues,
  joinLeague,
  getRegisteringLeagues
} from './league.controllers'

const router = Router()

router.get('/my', getMyLeagues)
router.get('/registering', getRegisteringLeagues)
router.get('/:leagueId', getOneLeague)
router.get('/', getAllLeagues)
router.post('/', createLeague)
router.put('/', joinLeague)

export default router
