import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { createLeague } from '../requests/LeagueRequests'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 400
    }
  }
}))

const CreateLeague = () => {
  const classes = useStyles()
  const [leagueName, setLeagueName] = useState('')
  const [leagueNameError, setLeagueNameError] = useState('')
  const [isCreated, setIsCreated] = useState(false)

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
      const league = await createLeague(leagueName)
      if (league) {
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

const LeagueCreated = ({ leagueName, setLeagueName, setIsCreated }) => {
  const classes = useStyles()

  const reset = () => {
    setLeagueName('')
    setIsCreated(false)
  }

  return (
    <form className={classes.root}>
      <Typography>League {leagueName} successfully created.</Typography>
      <Button variant="contained" color="secondary" onClick={reset}>
        Back
      </Button>
    </form>
  )
}

export default CreateLeague
