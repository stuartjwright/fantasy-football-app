import { Router } from 'express'
import { getOneAuction } from './auction.controllers'

const router = Router()

router.get('/:auctionId', getOneAuction)

export default router
