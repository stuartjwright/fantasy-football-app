import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { getRegisteringLeagues, joinLeague } from './LeagueRequests'

const useStyles = makeStyles({
  table: {
    minWidth: 600
  }
})

const JoinLeagues = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [leagueName, setLeagueName] = useState('')
  const [leagues, setLeagues] = useState([])
  const [trigger, setTrigger] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { leagues } = await getRegisteringLeagues()
      setLeagues(leagues)
      setIsLoading(false)
    }
    fetchData()
  }, [trigger])

  const handleRegistration = leagueId => async () => {
    setIsWaiting(true)
    const league = await joinLeague(leagueId)
    if (!league) {
      setIsWaiting(false)
    } else {
      setLeagueName(league.leagueName)
      setIsJoined(true)
    }
  }

  return isLoading ? (
    <p>Loading</p>
  ) : isJoined ? (
    <LeagueJoined
      leagueName={leagueName}
      setLeagues={setLeagues}
      setIsJoined={setIsJoined}
      setIsWaiting={setIsWaiting}
      setIsLoading={setIsLoading}
      setLeagueName={setLeagueName}
      setTrigger={setTrigger}
      trigger={trigger}
    />
  ) : (
    <Fragment>
      <Typography variant="h6">Available Leagues</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell>League Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell align="right">Players Registered</TableCell>
              <TableCell align="right">Max Players</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leagues.map(league => (
              <TableRow key={league._id}>
                <TableCell align="right">
                  <Button
                    disabled={isWaiting ? true : false}
                    variant="contained"
                    color="primary"
                    onClick={handleRegistration(league._id)}
                  >
                    Join
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {league.leagueName}
                </TableCell>
                <TableCell>{league.creator.username}</TableCell>
                <TableCell align="right">{league.numRegistered}</TableCell>
                <TableCell align="right">{league.maxEntrants}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  )
}

const LeagueJoined = ({
  leagueName,
  setIsJoined,
  setIsWaiting,
  setIsLoading,
  setLeagueName,
  setLeagues,
  trigger,
  setTrigger
}) => {
  const classes = useStyles()

  const reset = () => {
    setIsJoined(false)
    setIsWaiting(false)
    setIsLoading(true)
    setLeagueName('')
    setLeagues([])
    setTrigger(!trigger)
  }

  return (
    <form className={classes.root}>
      <Typography>League {leagueName} successfully joined.</Typography>
      <Button variant="contained" color="secondary" onClick={reset}>
        Back
      </Button>
    </form>
  )
}

export default JoinLeagues
