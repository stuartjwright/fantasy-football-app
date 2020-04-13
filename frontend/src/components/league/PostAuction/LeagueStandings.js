import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../../contexts/LeagueContext'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import NoChangeIcon from '@material-ui/icons/Remove'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import WinnerIcon from '@material-ui/icons/EmojiEventsRounded'

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
  },
  downIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#C6EFCE',
    color: '#006100',
    borderRadius: 50
  },
  upIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFC7CE',
    color: '#9C0006',
    borderRadius: 50
  },
  neutralIcon: {
    width: 20,
    height: 20,
    color: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[200],
    borderRadius: 50
  },
  winnerIcon: {
    width: 30,
    height: 30,
    color: 'gold'
  },
  silver: {
    width: 30,
    height: 30,
    color: 'silver'
  },
  bronze: {
    width: 30,
    height: 30,
    color: 'tan'
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
    league: {
      users,
      postAuctionUsers,
      event: { status }
    }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)

  const handleUserSelect = user => _ => setSquadUser(user)

  const rows = postAuctionUsers
    .map(u => {
      return {
        rank: u.rank,
        username: usersLookup[u.user],
        points: u.points,
        user: u.user,
        trend: u.trend
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
            <TableCell></TableCell>
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
              <TableCell align="center">
                {status != 'complete' ? (
                  row.trend > 0 ? (
                    <ArrowDownwardIcon className={classes.upIcon} />
                  ) : row.trend < 0 ? (
                    <ArrowUpwardIcon className={classes.downIcon} />
                  ) : (
                    <NoChangeIcon className={classes.neutralIcon} />
                  )
                ) : row.rank === 1 ? (
                  <WinnerIcon className={classes.winnerIcon} />
                ) : row.rank === 2 ? (
                  <WinnerIcon className={classes.silver} />
                ) : row.rank === 3 ? (
                  <WinnerIcon className={classes.bronze} />
                ) : null}
              </TableCell>
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
