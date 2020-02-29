import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'

const AuctionSideBar = () => {
  const { league } = useContext(LeagueStateContext)
  return (
    <p>
      This is the sidebar. Need to put information here like current squads and
      budgets. {league._id}
    </p>
  )
}

export default AuctionSideBar
