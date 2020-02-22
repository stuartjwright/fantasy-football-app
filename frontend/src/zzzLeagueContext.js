import React, { useState, createContext, useEffect } from 'react'
import Loading from './Loading'
import Error from './Error'
import { getLeague } from './LeagueRequests'

export const LeagueContext = createContext()

export const LeagueProvider = ({ children, leagueId }) => {
  const initialState = {
    status: 'loading',
    error: null,
    league: null,
    leagueId
  }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!state.leagueId) {
      return
    }
    getLeague(state.leagueId).then(
      data => setState({ status: 'success', error: null, ...data }),
      error => setState({ status: 'error', error, league: null })
    )
  }, [state.leagueId])

  return (
    <LeagueContext.Provider value={{ state, setState }}>
      {state.status === 'loading' ? (
        <Loading />
      ) : state.status === 'error' ? (
        <Error />
      ) : (
        children
      )}
    </LeagueContext.Provider>
  )
}
