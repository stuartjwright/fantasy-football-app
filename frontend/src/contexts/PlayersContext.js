import React, { useState, createContext, useEffect } from 'react'
import Loading from '../components/generic/Loading'
import Error from '../components/generic/Error'
import { getAllPlayers } from '../requests/PlayerRequests'

export const PlayersContext = createContext()

const getPlayersLookup = players => {
  let playersLookup = {}
  players.forEach(p => {
    playersLookup[p._id] = p
  })
  return playersLookup
}

export const PlayersProvider = ({ children }) => {
  const initialState = {
    status: 'loading',
    error: null,
    players: null
  }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    getAllPlayers().then(
      data =>
        setState({
          status: 'success',
          error: null,
          players: data.players,
          playersLookup: getPlayersLookup(data.players)
        }),
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
