import { Router } from 'express'
import {
  getOneLeague,
  getAllLeagues,
  createLeague,
  getMyLeagues,
  joinLeague,
  getRegisteringLeagues,
  setLeagueToStartAuction
} from './league.controllers'

const router = Router()

router.get('/my', getMyLeagues)
router.get('/registering', getRegisteringLeagues)
router.get('/:leagueId', getOneLeague)
router.get('/', getAllLeagues)
router.post('/', createLeague)
router.put('/', joinLeague)
router.put('/start', setLeagueToStartAuction)

export default router
