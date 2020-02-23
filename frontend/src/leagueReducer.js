// Need to do something to make unsuccessful bids not make frontend blowup

const countdownStart = 10 // make sure this is same as backend default value

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
        league: action.data.league
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
        league: action.data.league
      }
    }
    case 'OPENING_BID_ERROR': {
      return { ...state, status: 'error', error: action.error }
    }
    case 'BID_LOADING': {
      return { ...state, status: 'loading', error: null }
    }
    case 'BID_COMPLETE': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data.league
      }
    }
    case 'BID_ERROR': {
      return { ...state, status: 'error', error: action.error }
    }
    case 'SOCKETIO_AUCTION_START': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: countdownStart
      }
    }
    case 'SOCKETIO_OPENING_BID': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data
      }
    }
    case 'SOCKETIO_BID': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: countdownStart
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
    case 'SOCKETIO_PLAYER_SOLD': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data,
        countdown: countdownStart
      }
    }
    default: {
      return state
    }
  }
}
