import { Router } from 'express'
import { getOneAuction, makeOpeningBid } from './auction.controllers'

const router = Router()

router.get('/:auctionId', getOneAuction)
router.post('/open', makeOpeningBid)

export default router
