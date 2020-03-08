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
import { getRegisteringLeagues, joinLeague } from '../requests/LeagueRequests'
import { useHistory } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600
  },
  button: { width: 200, margin: theme.spacing(2) },
  paper: {
    width: 500,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  }
}))

const JoinLeagues = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [leagueName, setLeagueName] = useState('')
  const [leagues, setLeagues] = useState([])
  const [trigger, setTrigger] = useState(true)
  const [leagueId, setLeagueId] = useState(null)

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
    const data = await joinLeague(leagueId)
    if (!data.league) {
      setIsWaiting(false)
    } else {
      setLeagueName(data.league.leagueName)
      setLeagueId(data.league._id)
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
      leagueId={leagueId}
      setLeagueId={setLeagueId}
    />
  ) : (
    <Fragment>
      <Typography variant="h6">Available Leagues</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>League Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell align="right">Players Registered</TableCell>
              <TableCell align="right">Max Players</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leagues.map(league => (
              <TableRow key={league._id}>
                <TableCell component="th" scope="row">
                  {league.leagueName}
                </TableCell>
                <TableCell>{league.creator.username}</TableCell>
                <TableCell align="right">{league.numRegistered}</TableCell>
                <TableCell align="right">{league.maxEntrants}</TableCell>
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
  setTrigger,
  leagueId,
  setLeagueId
}) => {
  const classes = useStyles()
  const history = useHistory()

  const reset = () => {
    setIsJoined(false)
    setIsWaiting(false)
    setIsLoading(true)
    setLeagueName('')
    setLeagues([])
    setTrigger(!trigger)
    setLeagueId(null)
  }

  const goToLeague = leagueId => () => {
    history.push(`/myleagues/${leagueId}`)
  }

  return (
    <>
      <Paper className={classes.paper}>
        <CheckCircleIcon className={classes.icon} />
        <Typography>Successfully joined league {leagueName}.</Typography>
      </Paper>
      <form>
        <Button
          variant="contained"
          color="secondary"
          onClick={reset}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={goToLeague(leagueId)}
          className={classes.button}
        >
          Go To League
        </Button>
      </form>
    </>
  )
}

export default JoinLeagues
