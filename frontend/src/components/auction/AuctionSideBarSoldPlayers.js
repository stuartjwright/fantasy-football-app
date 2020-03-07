import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { PlayersContext } from '../../contexts/PlayersContext'
import { getUsersLookup, getMoneyFormat } from './auctionUtils'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    marginBottom: 10,
    marginTop: 15,
    textAlign: 'center'
  },
  content: {
    maxHeight: 690,
    overflow: 'auto',
    margin: 0,
    padding: 0
  }
}))

const AuctionSideBarSoldPlayers = () => {
  const classes = useStyles()
  const {
    league: {
      users,
      auction: { soldAuctionItems }
    }
  } = useContext(LeagueStateContext)

  const {
    state: { playersLookup }
  } = useContext(PlayersContext)

  const usersLookup = getUsersLookup(users)

  const rows = soldAuctionItems
    .map(item => {
      return {
        player: playersLookup[item.player].displayName,
        buyer: usersLookup[item.winner],
        cost: item.cost
      }
    })
    .reverse()

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Sold Players
      </Typography>
      <div className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell>Buyer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.player}
                </TableCell>
                <TableCell align="right">{getMoneyFormat(row.cost)}</TableCell>
                <TableCell>{row.buyer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default AuctionSideBarSoldPlayers
