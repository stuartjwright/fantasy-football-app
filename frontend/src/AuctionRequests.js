import axios from 'axios'

const rootUrl = 'http://localhost:5000/api/league/'

export const startAuction = async leagueId => {
  const token = localStorage.getItem('token')
  const url = rootUrl + 'start'
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

export const makeOpeningBid = async (leagueId, playerId) => {
  const token = localStorage.getItem('token')
  const url = rootUrl + 'open'
  if (!token) {
    return null
  }

  try {
    const res = await axios.post(
      url,
      { leagueId, playerId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res.data
  } catch (e) {
    return null
  }
}
