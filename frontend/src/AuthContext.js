import React, { useState, createContext, useEffect, useContext } from 'react'
import axios from 'axios'

const api = 'http://localhost:5000/api/user/'

const getUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }

  const res = await axios.get(api, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    status: 'pending',
    error: null,
    user: null
  })
  useEffect(() => {
    getUser().then(
      user => setState({ status: 'success', error: null, user }),
      error => setState({ status: 'error', error, user: null })
    )
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {state.status === 'pending' ? (
        'Loading...'
      ) : state.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{state.error.message}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export const useAuthState = () => {
  const state = useContext(AuthContext)
  const isPending = state.status === 'pending'
  const isError = state.status === 'error'
  const isSuccess = state.status === 'success'
  const isAuthenticated = state.user && isSuccess
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated
  }
}
