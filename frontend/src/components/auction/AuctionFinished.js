import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const AuctionFinished = () => {
  const history = useHistory()
  const redirect = () => {
    history.push(history.location.pathname.slice(0, -7))
  }

  useEffect(() => {
    const timer = setTimeout(redirect, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      Auction is complete. You will be redirected to league home shortly.
    </div>
  )
}

export default AuctionFinished
