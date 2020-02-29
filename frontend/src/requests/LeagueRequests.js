import axios from 'axios'
import rootUrl from '../constants/rootUrl'

const apiUrl = rootUrl + 'api/league/'

export const createLeague = async leagueName => {
  const token = localStorage.getItem('token')
  const url = apiUrl
  if (!token) {
    return null
  }

  try {
    const res = await axios.post(
      url,
      { leagueName },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res.data
  } catch (e) {
    return null
  }
}

export const joinLeague = async leagueId => {
  const token = localStorage.getItem('token')
  const url = apiUrl
  if (!token) {
    return null
  }

  try {
    const res = await axios.put(
      url,
      { leagueId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res.data
  } catch (e) {
    return null
  }
}

export const getMyLeagues = async () => {
  const token = localStorage.getItem('token')
  const url = apiUrl + 'my'
  if (!token) {
    return null
  }

  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (e) {
    return null
  }
}

export const getRegisteringLeagues = async () => {
  const token = localStorage.getItem('token')
  const url = apiUrl + 'registering'
  if (!token) {
    return null
  }

  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (e) {
    return null
  }
}

export const getLeague = async leagueId => {
  const token = localStorage.getItem('token')
  const url = apiUrl + leagueId
  if (!token) {
    return null
  }

  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (e) {
    return null
  }
}
