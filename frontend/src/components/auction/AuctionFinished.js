import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const AuctionFinished = () => {
  const history = useHistory()
  useEffect(() => {
    const redirect = () => {
      history.push(history.location.pathname.slice(0, -8))
    }
    const timer = setTimeout(redirect, 3000)
    return () => clearTimeout(timer)
  }, [history])

  return (
    <div>
      Auction is complete. You will be redirected to league home shortly.
    </div>
  )
}

export default AuctionFinished
