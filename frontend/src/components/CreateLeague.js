import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { createLeague } from '../requests/LeagueRequests'
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
  }
}))

const CreateLeague = () => {
  const classes = useStyles()
  const [leagueName, setLeagueName] = useState('')
  const [leagueNameError, setLeagueNameError] = useState('')
  const [isCreated, setIsCreated] = useState(false)
  const [leagueId, setLeagueId] = useState(null)

  const handleLeagueNameChange = event => {
    setLeagueName(event.target.value)
  }

  const isValidLeagueName = () =>
    leagueName.length >= 4 && leagueName.length <= 24

  const handleSubmit = async event => {
    event.preventDefault()
    setLeagueNameError('')
    setIsCreated(false)
    if (!isValidLeagueName()) {
      setLeagueNameError('Must be 4-24 characters')
    } else {
      const data = await createLeague(leagueName)
      if (data.league) {
        setLeagueId(data.league._id)
        setIsCreated(true)
      } else {
        setLeagueNameError('Could not create league. Duplicate name.')
      }
    }
  }

  console.log(leagueId)

  return isCreated ? (
    <LeagueCreated
      leagueName={leagueName}
      setLeagueName={setLeagueName}
      setIsCreated={setIsCreated}
      leagueId={leagueId}
      setLeagueId={setLeagueId}
    />
  ) : (
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
      <Button variant="contained" color="primary" type="submit">
        Create League
      </Button>
    </form>
  )
}

const LeagueCreated = ({
  leagueName,
  setLeagueName,
  setIsCreated,
  leagueId,
  setLeagueId
}) => {
  const classes = useStyles()
  const history = useHistory()

  const reset = () => {
    setLeagueName('')
    setIsCreated(false)
    setLeagueId(null)
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
