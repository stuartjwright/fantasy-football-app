import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../../contexts/LeagueContext'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 250,
    maxWidth: 350
  },
  header: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: 15
  },
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      cursor: 'pointer'
    }
  }
}))

const getUsersLookup = users => {
  let usersLookup = {}
  users.forEach(u => (usersLookup[u._id] = u.username))
  return usersLookup
}

const LeagueStandings = ({ setSquadUser }) => {
  const classes = useStyles()
  const {
    league: { users, postAuctionUsers }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)

  const handleUserSelect = user => _ => setSquadUser(user)

  const rows = postAuctionUsers
    .map(u => {
      return {
        rank: u.rank,
        username: usersLookup[u.user],
        points: u.points,
        user: u.user
      }
    })
    .sort((a, b) => (a.rank > b.rank ? 1 : -1))

  return (
    <>
      <Typography className={classes.header} variant="subtitle1">
        Current Standings
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Rank</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.username}
              className={classes.tableRow}
              onClick={handleUserSelect(row.user)}
            >
              <TableCell component="th" scope="row" align="right">
                {row.rank}
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default LeagueStandings
