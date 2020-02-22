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
    case 'SOCKETIO_AUCTION_START': {
      return {
        ...state,
        status: 'success',
        error: null,
        league: action.data
      }
    }
    default: {
      return state
    }
  }
}
