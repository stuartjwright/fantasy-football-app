import { Router } from 'express'
import {
  getOneLeague,
  getAllLeagues,
  createLeague,
  getMyLeagues,
  joinLeague,
  getRegisteringLeagues,
  setLeagueToStartAuction,
  makeOpeningBid,
  makeBid
} from './league.controllers'

const router = Router()

router.get('/my', getMyLeagues)
router.get('/registering', getRegisteringLeagues)
router.get('/:leagueId', getOneLeague)
router.get('/', getAllLeagues)
router.post('/', createLeague)
router.put('/', joinLeague)
router.put('/start', setLeagueToStartAuction)
router.post('/open', makeOpeningBid)
router.post('/bid', makeBid)

export default router
