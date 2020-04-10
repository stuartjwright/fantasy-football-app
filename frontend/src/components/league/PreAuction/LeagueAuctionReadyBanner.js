import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const LeagueAuctionReadyBanner = () => {
  const history = useHistory()
  const goToAuction = () => {
    history.push(history.location.pathname + '/auction')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        style={{ width: '100%' }}
        variant="contained"
        color="primary"
        onClick={goToAuction}
      >
        Go To Auction
      </Button>
    </div>
  )
}

export default LeagueAuctionReadyBanner
