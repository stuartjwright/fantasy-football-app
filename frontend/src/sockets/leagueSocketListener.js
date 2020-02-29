import io from 'socket.io-client'
import rootUrl from '../constants/rootUrl'

const socketIoUrl = rootUrl + 'leagues'

const leagueSocketListener = (leagueId, dispatch) => {
  const socket = io.connect(socketIoUrl, {
    query: `leagueId=${leagueId}`
  })
  socket.on('connect', () => {
    console.log('connected')
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
  socket.on('auction start', data => {
    console.log('auction starting!')
    dispatch({ type: 'SOCKETIO_AUCTION_START', data })
  })
  socket.on('opening bid', data => {
    console.log('someone has opened bidding!')
    dispatch({ type: 'SOCKETIO_OPENING_BID', data })
  })
  socket.on('counter bid', data => {
    console.log('someone has bid!')
    dispatch({ type: 'SOCKETIO_BID', data })
  })
  socket.on('countdown', count => {
    dispatch({ type: 'SOCKETIO_COUNTDOWN', count })
  })
  socket.on('presale lock', data => {
    console.log('processing sale!')
    dispatch({
      type: 'SOCKETIO_PRESALE_LOCK',
      data: { ...data, status: 'auction', itemSold: true }
    })
  })
  socket.on('player sold', data => {
    console.log('player sold!')
    dispatch({ type: 'SOCKETIO_PLAYER_SOLD', data })
  })
  return socket
}

export default leagueSocketListener
