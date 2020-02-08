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
import { getMyLeagues } from './LeagueRequests'

const useStyles = makeStyles({
  table: {
    minWidth: 600
  }
})

const MyLeagues = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { leagues } = await getMyLeagues()
      setLeagues(leagues)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <Fragment>
      <Typography variant="h6">My Leagues</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>League Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Players Registered</TableCell>
              <TableCell align="right">Max Players</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leagues.map(league => (
              <TableRow key={league._id}>
                <TableCell component="th" scope="row">
                  {league.leagueName}
                </TableCell>
                <TableCell>{league.creator.username}</TableCell>
                <TableCell>{league.status}</TableCell>
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

export default MyLeagues
