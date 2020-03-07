import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { getClubAbbreviation } from './auctionUtils'

const generateEmptyRow = position => ({
  position,
  displayName: '',
  team: ''
})

const generateTableData = (squad, positions) => {
  const goalkeepers = squad
    .filter(p => p.position === 'Goalkeeper')
    .map(p => ({ ...p, position: 'G' }))
  const defenders = squad
    .filter(p => p.position === 'Defender')
    .map(p => ({ ...p, position: 'D' }))
  const midfielders = squad
    .filter(p => p.position === 'Midfielder')
    .map(p => ({ ...p, position: 'M' }))
  const forwards = squad
    .filter(p => p.position === 'Forward')
    .map(p => ({ ...p, position: 'F' }))

  return [
    ...goalkeepers,
    ...Array(positions.numGoalkeepers - goalkeepers.length).fill(
      generateEmptyRow('G')
    ),
    ...defenders,
    ...Array(positions.numDefenders - defenders.length).fill(
      generateEmptyRow('D')
    ),
    ...midfielders,
    ...Array(positions.numMidfielders - midfielders.length).fill(
      generateEmptyRow('M')
    ),
    ...forwards,
    ...Array(positions.numForwards - forwards.length).fill(
      generateEmptyRow('F')
    )
  ]
}

export default ({ squad, positions }) => {
  const rows = generateTableData(squad, positions)

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Pos</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Club</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {row.position}
            </TableCell>
            <TableCell>{row.displayName}</TableCell>
            <TableCell>{getClubAbbreviation(row.team)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
