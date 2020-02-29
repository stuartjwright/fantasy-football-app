import React, { createContext, useEffect, useReducer } from 'react'
import Loading from '../components/generic/Loading'
import Error from '../components/generic/Error'
import { getLeague } from '../requests/LeagueRequests'
import { leagueReducer } from '../reducers/leagueReducer'
import { useAuthState } from './AuthContext'
import leagueSocketListener from '../sockets/leagueSocketListener'

export const LeagueStateContext = createContext()
export const LeagueDispatchContext = createContext()

export const LeagueProvider = ({ children, leagueId }) => {
  const initialState = {
    status: 'loading',
    error: null,
    league: null,
    countdown: null
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
    const socket = leagueSocketListener(leagueId, dispatch)
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
