import React, { useState, createContext, useEffect } from 'react'
import Loading from './Loading'
import Error from './Error'
import { getAllPlayers } from './PlayerRequests'

export const PlayersContext = createContext()

export const PlayersProvider = ({ children }) => {
  const initialState = {
    status: 'loading',
    error: null,
    players: null
  }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    getAllPlayers().then(
      data => setState({ status: 'success', error: null, ...data }),
      error => setState({ status: 'error', error, players: null })
    )
  }, [])

  return (
    <PlayersContext.Provider value={{ state, setState }}>
      {state.status === 'loading' ? (
        <Loading />
      ) : state.status === 'error' ? (
        <Error />
      ) : (
        children
      )}
    </PlayersContext.Provider>
  )
}
