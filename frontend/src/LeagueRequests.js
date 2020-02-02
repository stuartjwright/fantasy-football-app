import axios from 'axios'

const rootUrl = 'http://localhost:5000/api/league/'

export const createLeague = async leagueName => {
  const token = localStorage.getItem('token')
  const url = rootUrl
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

export const getMyLeagues = async () => {
  const token = localStorage.getItem('token')
  const url = rootUrl + 'my'
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
