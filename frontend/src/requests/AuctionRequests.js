import axios from 'axios'
import rootUrl from '../constants/rootUrl'

const apiUrl = rootUrl + 'api/league/'

export const startAuction = async leagueId => {
  const token = localStorage.getItem('token')
  const url = apiUrl + 'start'
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
  const url = apiUrl + 'open'
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

export const makeCounterBid = async (leagueId, auctionItemId, amount) => {
  const token = localStorage.getItem('token')
  const url = apiUrl + 'bid'
  if (!token) {
    return null
  }

  try {
    const res = await axios.post(
      url,
      { leagueId, auctionItemId, amount },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res.data
  } catch (e) {
    return null
  }
}
