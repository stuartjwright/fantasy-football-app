import React, { createContext, useEffect, useReducer } from 'react'
import Loading from './Loading'
import Error from './Error'
import { getLeague } from './LeagueRequests'
import { leagueReducer } from './leagueReducer'
import io from 'socket.io-client'
import { useAuthState } from './AuthContext'

export const LeagueStateContext = createContext()
export const LeagueDispatchContext = createContext()

export const LeagueProvider = ({ children, leagueId }) => {
  const initialState = {
    status: 'loading',
    error: null,
    league: null,
    countdown: 10 // change this so it refs same value as reducer file
  }
  const [state, dispatch] = useReducer(leagueReducer, initialState)
  const {
    state: { user }
  } = useAuthState()

  useEffect(() => {
    const getLeagueOnLoad = async () => {
      dispatch({ type: 'GET_LEAGUE_LOADING' })
      try {
        const data = await getLeague(leagueId)
        dispatch({ type: 'GET_LEAGUE_COMPLETE', data })
      } catch (error) {
        dispatch({ type: 'GET_LEAGUE_ERROR', error })
      }
    }
    getLeagueOnLoad()
    const socket = io.connect('http://localhost:5000/leagues', {
      query: `leagueId=${leagueId}`
    })
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('auction start', data => {
      console.log('auction starting!')
      if (data.creator !== user._id) {
        dispatch({ type: 'SOCKETIO_AUCTION_START', data })
      }
    })
    socket.on('opening bid', data => {
      console.log('someone has opened bidding!')
      dispatch({ type: 'SOCKETIO_OPENING_BID', data })
    })
    socket.on('counter bid', data => {
      console.log('someone has bid!')
      dispatch({ type: 'SOCKETIO_BID', data })
    })
    socket.on('countdown', count => {
      dispatch({ type: 'SOCKETIO_COUNTDOWN', count })
    })
    socket.on('player sold', data => {
      console.log('player sold!')
      dispatch({ type: 'SOCKETIO_PLAYER_SOLD', data })
    })
    return () => socket.disconnect()
  }, [leagueId, user._id])

  return (
    <LeagueStateContext.Provider value={state}>
      <LeagueDispatchContext.Provider value={dispatch}>
        {state.status === 'loading' ? (
          <Loading />
        ) : state.status === 'error' ? (
          <Error />
        ) : (
          children
        )}
      </LeagueDispatchContext.Provider>
    </LeagueStateContext.Provider>
  )
}
