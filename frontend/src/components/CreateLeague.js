import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import { createLeague } from '../requests/LeagueRequests'
import { getAllEvents } from '../requests/EventRequests'
import { useHistory } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 400
    }
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
  },
  message: { color: theme.palette.primary.light, width: 400 }
}))

const CreateLeague = () => {
  const classes = useStyles()
  const [leagueName, setLeagueName] = useState('')
  const [leagueNameError, setLeagueNameError] = useState('')
  const [maxEntrants, setMaxEntrants] = useState(2)
  const [maxPerClub, setMaxPerClub] = useState(3)
  const [numGoalkeepers, setNumGoalkeepers] = useState(1)
  const [numDefenders, setNumDefenders] = useState(4)
  const [numMidfielders, setNumMidfielders] = useState(4)
  const [numForwards, setNumForwards] = useState(2)
  const [isCreated, setIsCreated] = useState(false)
  const [leagueId, setLeagueId] = useState(null)
  const [availableEvents, setAvailableEvents] = useState([])
  const [event, setEvent] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { events } = await getAllEvents()
      setAvailableEvents(events)
      setEvent(events[0]._id)
    }
    fetchData()
  }, [])

  const handleLeagueNameChange = event => {
    setLeagueName(event.target.value)
  }

  const handleClubChange = event => {
    setMaxPerClub(event.target.value)
  }

  const handleGoalkeepersChange = event => {
    setNumGoalkeepers(event.target.value)
  }

  const handleDefendersChange = event => {
    setNumDefenders(event.target.value)
  }

  const handleMidfieldersChange = event => {
    setNumMidfielders(event.target.value)
  }

  const handleForwardsChange = event => {
    setNumForwards(event.target.value)
  }

  const handleEntrantsChange = event => {
    setMaxEntrants(event.target.value)
  }
  const handleEventChange = event => {
    setEvent(event.target.value)
  }

  const isValidLeagueName = () =>
    leagueName.length >= 4 && leagueName.length <= 24

  const handleSubmit = async e => {
    e.preventDefault()
    setLeagueNameError('')
    setIsCreated(false)
    if (!isValidLeagueName()) {
      setLeagueNameError('Must be 4-24 characters')
    } else {
      const params = {
        leagueName,
        maxEntrants,
        maxPerClub,
        numGoalkeepers,
        numDefenders,
        numMidfielders,
        numForwards,
        event
      }
      const data = await createLeague(params)
      if (data.league) {
        setLeagueId(data.league._id)
        setIsCreated(true)
      } else {
        setLeagueNameError('Could not create league. Duplicate name.')
      }
    }
  }

  return isCreated ? (
    <LeagueCreated
      leagueName={leagueName}
      setLeagueName={setLeagueName}
      setIsCreated={setIsCreated}
      leagueId={leagueId}
      setLeagueId={setLeagueId}
      setMaxEntrants={setMaxEntrants}
      setMaxPerClub={setMaxPerClub}
      setNumGoalkeepers={setNumGoalkeepers}
      setNumDefenders={setNumDefenders}
      setNumMidfielders={setNumMidfielders}
      setNumForwards={setNumForwards}
      availableEvents={availableEvents}
      setEvent={setEvent}
    />
  ) : (
    <>
      <Typography variant="h6">Create a League</Typography>
      <br />
      <Typography className={classes.message} variant="subtitle2">
        Choose a name for your league, event in which players will score points,
        and number of participants.
      </Typography>
      <br />
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="league-name"
          label="League Name"
          error={leagueNameError ? true : false}
          helperText={leagueNameError}
          variant="outlined"
          value={leagueName}
          onChange={handleLeagueNameChange}
        />
        <br />
        <FormControl>
          <InputLabel id="event-label">Event</InputLabel>
          <Select
            labelId="event-label"
            value={event}
            onChange={handleEventChange}
          >
            {availableEvents.map(e => (
              <MenuItem key={e._id} value={e._id}>
                {e.eventName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="entrants-label">Number of Participants</InputLabel>
          <Select
            labelId="entrants-label"
            value={maxEntrants}
            onChange={handleEntrantsChange}
          >
            {Array(9)
              .fill(2)
              .map((x, y) => x + y)
              .map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <br />
        <br />
        <br />
        <Typography className={classes.message} variant="subtitle2">
          Set the rules for number of players per squad allowed by club and
          position.
        </Typography>
        <FormControl>
          <InputLabel id="club-label">Max Players Per Club</InputLabel>
          <Select
            labelId="club-label"
            value={maxPerClub}
            onChange={handleClubChange}
          >
            {Array(3)
              .fill(1)
              .map((x, y) => x + y)
              .map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="gk-label">Goalkeepers</InputLabel>
          <Select
            labelId="gk-label"
            value={numGoalkeepers}
            onChange={handleGoalkeepersChange}
          >
            {Array(2)
              .fill(1)
              .map((x, y) => x + y)
              .map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="def-label">Defenders</InputLabel>
          <Select
            labelId="def-label"
            value={numDefenders}
            onChange={handleDefendersChange}
          >
            {Array(5)
              .fill(1)
              .map((x, y) => x + y)
              .map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="mid-label">Midfielders</InputLabel>
          <Select
            labelId="mid-label"
            value={numMidfielders}
            onChange={handleMidfieldersChange}
          >
            {Array(5)
              .fill(1)
              .map((x, y) => x + y)
              .map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="fwd-label">Forwards</InputLabel>
          <Select
            labelId="fwd-label"
            value={numForwards}
            onChange={handleForwardsChange}
          >
            {Array(3)
              .fill(1)
              .map((x, y) => x + y)
              .map(num => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Create League
        </Button>
      </form>
    </>
  )
}

const LeagueCreated = ({
  leagueName,
  setLeagueName,
  setIsCreated,
  leagueId,
  setLeagueId,
  setMaxEntrants,
  setMaxPerClub,
  setNumDefenders,
  setNumMidfielders,
  setNumForwards,
  setNumGoalkeepers,
  availableEvents,
  setEvent
}) => {
  const classes = useStyles()
  const history = useHistory()

  const reset = () => {
    setLeagueName('')
    setIsCreated(false)
    setLeagueId(null)
    setMaxEntrants(2)
    setMaxPerClub(3)
    setNumDefenders(4)
    setNumMidfielders(4)
    setNumForwards(2)
    setNumGoalkeepers(1)
    setEvent(availableEvents[0]._id)
  }

  const goToLeague = leagueId => () => {
    history.push(`/myleagues/${leagueId}`)
  }

  return (
    <>
      <Paper className={classes.paper}>
        <CheckCircleIcon className={classes.icon} />
        <Typography>League {leagueName} successfully created.</Typography>
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

export default CreateLeague
