import React, { useContext } from 'react'
import { LeagueStateContext, LeagueDispatchContext } from './LeagueContext'
import { useAuthState } from './AuthContext'
import Button from '@material-ui/core/Button'
import { startAuction } from './AuctionRequests'

const AuctionReady = () => {
  const { league } = useContext(LeagueStateContext)
  const dispatch = useContext(LeagueDispatchContext)
  const {
    state: { user }
  } = useAuthState()
  const thisUserId = user._id
  const creatorId = league.creator._id
  const thisUserIsCreator = thisUserId === creatorId

  const handleAuctionStart = async () => {
    dispatch({ type: 'START_AUCTION_LOADING' })
    try {
      const data = await startAuction(league._id)
      dispatch({ type: 'START_AUCTION_COMPLETE', data })
    } catch (error) {
      dispatch({ type: 'START_AUCTION_ERROR', error })
    }
  }

  return thisUserIsCreator ? (
    <div>
      <p>You are the league owner. Click below to start auction.</p>
      <Button variant="contained" color="primary" onClick={handleAuctionStart}>
        Start Auction
      </Button>
    </div>
  ) : (
    <div>Waiting on creator to start.</div>
  )
}

export default AuctionReady
