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
    minWidth: 300,
    maxWidth: 500
  },
  header: {
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 15
  },
  trendUp: {
    backgroundColor: '#C6EFCE',
    color: '#006100'
  },
  trendDown: {
    backgroundColor: '#FFC7CE',
    color: '#9C0006'
  },
  complete: {
    backgroundColor: '#FFEB9C',
    color: '#9C6500',
    fontWeight: 'bold'
  }
}))

const getUsersLookup = users => {
  let usersLookup = {}
  users.forEach(u => (usersLookup[u._id] = u.username))
  return usersLookup
}

const LeaguePlayerPoints = ({ squadUser }) => {
  const classes = useStyles()
  const {
    league: {
      users,
      postAuctionUsers,
      event: { status }
    }
  } = useContext(LeagueStateContext)

  const usersLookup = getUsersLookup(users)
  const squadUsername = usersLookup[squadUser]
  const positionLookup = {
    Goalkeeper: 1,
    Defender: 2,
    Midfielder: 3,
    Forward: 4
  }
  const rows = postAuctionUsers
    .filter(u => u.user === squadUser)[0]
    .squad.sort((a, b) =>
      positionLookup[a.position] > positionLookup[b.position] ? 1 : -1
    )

  return (
    <>
      <Typography className={classes.header} variant="subtitle1">
        Player Points Breakdown
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle2">
        Manager: {squadUsername}
      </Typography>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Club</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row._id} className={classes.tableRow}>
              <TableCell component="th" scope="row">
                {row.displayName}
              </TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.team}</TableCell>
              <TableCell
                align="right"
                className={
                  status === 'live'
                    ? row.trend > 0
                      ? classes.trendUp
                      : row.trend < 0
                      ? classes.trendDown
                      : null
                    : classes.complete
                }
              >
                {row.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default LeaguePlayerPoints
