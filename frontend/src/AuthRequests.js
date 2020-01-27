import axios from 'axios'

export const getUser = async () => {
  const api = 'http://localhost:5000/api/user/'
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  try {
    const res = await axios.get(api, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (e) {
    return null
  }
}

export const signIn = async (username, password) => {
  const api = 'http://localhost:5000/signin/'
  try {
    const res = await axios.post(api, { username, password })
    return res.data
  } catch (e) {
    return { token: null }
  }
}
