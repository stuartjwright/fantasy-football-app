import React, { useContext } from 'react'
import { LeagueStateContext, LeagueDispatchContext } from './LeagueContext'
import { PlayersContext } from './PlayersContext'
import MaterialTable from 'material-table'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import { makeOpeningBid } from './AuctionRequests'

const AuctionOpeningBid = () => {
  const {
    state: { players }
  } = useContext(PlayersContext)
  const { league } = useContext(LeagueStateContext)
  const dispatch = useContext(LeagueDispatchContext)

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
        {
          title: 'Select',
          field: 'button'
        }
      ]}
      data={players.map(p => {
        return {
          name: p.displayName,
          team: p.team,
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
