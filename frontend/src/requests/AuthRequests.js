import axios from 'axios'
import rootUrl from '../constants/rootUrl'

export const getUser = async () => {
  const url = rootUrl + 'api/user/'
  const token = localStorage.getItem('token')

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

export const signIn = async (username, password) => {
  const url = rootUrl + 'signin/'
  try {
    const res = await axios.post(url, { username, password })
    return res.data
  } catch (e) {
    return { token: null }
  }
}

export const signUp = async (username, password) => {
  const url = rootUrl + 'signup/'
  try {
    const res = await axios.post(url, { username, password })
    return res.data
  } catch (e) {
    return { token: null }
  }
}
