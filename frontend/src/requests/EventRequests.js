import axios from 'axios'
import rootUrl from '../constants/rootUrl'

const url = rootUrl + 'api/event/'

export const getAllEvents = async () => {
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
