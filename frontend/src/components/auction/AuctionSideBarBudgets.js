import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { getMoneyFormat, getUsersLookup } from './auctionUtils'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    marginBottom: 10,
    marginTop: 15,
    textAlign: 'center'
  }
}))

const AuctionSideBarBudgets = () => {
  const classes = useStyles()
  const {
    league: {
      auction: { auctionUsers },
      users
    }
  } = useContext(LeagueStateContext)
  const usersLookup = getUsersLookup(users)

  const rows = auctionUsers.map(a => {
    return {
      username: usersLookup[a.user],
      budget: a.budget,
      players: a.squad.length
    }
  })

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Budget Summary
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Players</TableCell>
            <TableCell align="right">Budget</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.username}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.players}</TableCell>
              <TableCell align="right">{getMoneyFormat(row.budget)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AuctionSideBarBudgets
