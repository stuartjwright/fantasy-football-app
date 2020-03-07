import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import { PlayersContext } from '../../contexts/PlayersContext'
import { getClubAbbreviation } from './auctionUtils'
import { FixedSizeGrid as Grid } from 'react-window'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.light,
    marginTop: 15,
    textAlign: 'center',
    marginBottom: 10
  },
  content: {
    maxHeight: 690,
    overflow: 'auto',
    margin: 0,
    padding: 0
  },
  tableCell: {
    color: theme.palette.text.primary
  },
  tableHeader: {
    width: 300
  }
}))

const AuctionSideBarSoldPlayers = () => {
  const classes = useStyles()
  const {
    league: {
      auction: { soldAuctionItems }
    }
  } = useContext(LeagueStateContext)

  const {
    state: { players }
  } = useContext(PlayersContext)

  const soldPlayers = soldAuctionItems.map(i => i.player)
  const availablePlayers = players.filter(p => !soldPlayers.includes(p._id))

  const rows = availablePlayers.map(p => {
    return {
      player: p.displayName,
      position: p.position[0],
      club: getClubAbbreviation(p.team)
    }
  })

  const labels = ['player', 'club', 'position']

  const Cell = ({ columnIndex, rowIndex, style }) => {
    return (
      <div style={style}>
        <Typography variant="body2" className={classes.tableCell}>
          {rows[rowIndex][labels[columnIndex]]}
        </Typography>
      </div>
    )
  }

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Available Players
      </Typography>
      <div className={classes.content}>
        <Table className={classes.tableHeader}>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Club</TableCell>
              <TableCell>Pos</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Grid
          columnCount={3}
          columnWidth={120}
          height={700}
          rowCount={rows.length}
          rowHeight={35}
          width={360}
        >
          {Cell}
        </Grid>
      </div>
    </>
  )
}

export default AuctionSideBarSoldPlayers
