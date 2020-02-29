import { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { useAuthState } from '../../contexts/AuthContext'

const useConstraints = () => {
  const {
    league: { auction }
  } = useContext(LeagueStateContext)
  const { liveAuctionItem } = auction
  const { currentHighBid, currentHighBidder } = liveAuctionItem
  const { player } = liveAuctionItem
  const {
    state: { user }
  } = useAuthState()
  const thisUserId = user._id
  const thisAuctionUser = auction.auctionUsers.filter(
    a => a.user === thisUserId
  )[0]
  const { positionConstraints, clubConstraints, budget } = thisAuctionUser
  const { position, team } = player
  const positionConstraint = positionConstraints.includes(position)
  const clubConstraint = clubConstraints.includes(team)
  const budgetConstraint = currentHighBid >= budget
  const bidderConstraint = currentHighBidder === thisUserId

  return {
    positionConstraint,
    clubConstraint,
    budgetConstraint,
    bidderConstraint,
    budget
  }
}

export default useConstraints
