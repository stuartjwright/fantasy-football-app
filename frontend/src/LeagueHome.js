import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Error from './Error'
import { getLeague } from './LeagueRequests'
import LeagueSummary from './LeagueSummary'

const LeagueHome = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [league, setLeague] = useState({})
  const [isError, setIsError] = useState(false)
  console.log(league)

  useEffect(() => {
    const fetchData = async () => {
      setLeague({})
      setIsLoading(true)
      try {
        const { league } = await getLeague(match.params.leagueId)
        setIsLoading(false)
        setLeague(league)
      } catch {
        setLeague({})
        setIsError(true)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [match.params.leagueId])

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <LeagueSummary league={league} />
  )
}

export default LeagueHome
