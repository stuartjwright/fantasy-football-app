export const leagueReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LEAGUE_LOADING': {
      return { ...state, status: 'loading', error: null }
    }
    case 'GET_LEAGUE_COMPLETE': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data.league
      }
    }
    case 'GET_LEAGUE_ERROR': {
      return { ...state, status: 'error', error: action.error }
    }
    case 'START_AUCTION_LOADING': {
      return { ...state, status: 'loading', error: null }
    }
    case 'START_AUCTION_COMPLETE': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data.league,
        countdown: null
      }
    }
    case 'START_AUCTION_ERROR': {
      return { ...state, status: 'error', error: action.error }
    }
    case 'OPENING_BID_LOADING': {
      return { ...state, status: 'loading', error: null }
    }
    case 'OPENING_BID_COMPLETE': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data.league,
        countdown: null
      }
    }
    case 'OPENING_BID_ERROR': {
      return { ...state, status: 'error', error: action.error }
    }
    case 'BID_LOADING': {
      return { ...state, error: null } // removed status: 'loading', experimental
    }
    case 'BID_COMPLETE': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data.league,
        countdown: null
      }
    }
    case 'BID_ERROR': {
      return { ...state, error: action.error } // removed status: 'error', experimental
    }
    case 'SOCKETIO_AUCTION_START': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: null
      }
    }
    case 'SOCKETIO_OPENING_BID': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: null
      }
    }
    case 'SOCKETIO_BID': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: null
      }
    }
    case 'SOCKETIO_COUNTDOWN': {
      return {
        ...state,
        status: 'success',
        error: null,
        countdown: action.count
      }
    }
    case 'SOCKETIO_PRESALE_LOCK': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: null
      }
    }
    case 'SOCKETIO_PLAYER_SOLD': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: null
      }
    }
    case 'SOCKETIO_UPDATE_POINTS': {
      return {
        ...state,
        league: action.data
      }
    }
    case 'SOCKETIO_FINAL_POINTS': {
      return {
        ...state,
        league: action.data
      }
    }
    default: {
      return state
    }
  }
}
