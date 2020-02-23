import axios from 'axios'

const url = 'http://localhost:5000/api/player/'

export const getAllPlayers = async () => {
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
