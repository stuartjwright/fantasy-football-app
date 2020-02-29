import React, { useContext } from 'react'
import {
  LeagueStateContext,
  LeagueDispatchContext
} from '../../contexts/LeagueContext'
import { useAuthState } from '../../contexts/AuthContext'
import { PlayersContext } from '../../contexts/PlayersContext'
import MaterialTable from 'material-table'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import { makeOpeningBid } from '../../requests/AuctionRequests'

const AuctionOpeningBid = () => {
  const {
    state: { players }
  } = useContext(PlayersContext)
  const dispatch = useContext(LeagueDispatchContext)
  const { league } = useContext(LeagueStateContext)
  const {
    state: { user }
  } = useAuthState()

  const { auction } = league
  const soldPlayers = auction.soldAuctionItems.map(i => i.player)
  const unsoldPlayers = players.filter(p => !soldPlayers.includes(p._id))

  const thisUserId = user._id
  const thisAuctionUser = auction.auctionUsers.filter(
    a => a.user === thisUserId
  )[0]
  const { positionConstraints, clubConstraints } = thisAuctionUser
  const availablePlayers = unsoldPlayers.filter(
    p =>
      !positionConstraints.includes(p.position) &&
      !clubConstraints.includes(p.team)
  )

  const handleOpeningBid = playerId => async () => {
    dispatch({ type: 'OPENING_BID_LOADING' })
    try {
      const data = await makeOpeningBid(league._id, playerId)
      if (data) {
        dispatch({ type: 'OPENING_BID_COMPLETE', data })
      } else {
        dispatch({ type: 'OPENING_BID_ERROR', error: 'bid unsuccessful' })
      }
    } catch (error) {
      dispatch({ type: 'OPENING_BID_ERROR', error })
    }
  }

  return (
    <MaterialTable
      title="Available Players"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Team', field: 'team' },
        { title: 'Position', field: 'position' },
        {
          title: 'Select',
          field: 'button'
        }
      ]}
      data={availablePlayers.map(p => {
        return {
          name: p.displayName,
          team: p.team,
          position: p.position,
          button: (
            <IconButton color="primary" onClick={handleOpeningBid(p._id)}>
              <AddCircleIcon />
            </IconButton>
          )
        }
      })}
      options={{
        filtering: true
      }}
    />
  )
}

export default AuctionOpeningBid
