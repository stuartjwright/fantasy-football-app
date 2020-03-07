import React, { useContext } from 'react'
import { LeagueStateContext } from '../../contexts/LeagueContext'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { getMoneyFormat } from './auctionUtils'

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
  },
  rowName: {
    fontWeight: 500
  }
}))

const AuctionSideBarRules = () => {
  const classes = useStyles()
  const {
    league: {
      leagueName,
      maxEntrants,
      startBudget,
      maxPerClub,
      numGoalkeepers,
      numDefenders,
      numMidfielders,
      numForwards
    }
  } = useContext(LeagueStateContext)

  const rows = [
    { name: 'League Name', value: leagueName },
    { name: 'Num Managers', value: maxEntrants },
    { name: 'Start Budget', value: getMoneyFormat(startBudget) },
    { name: 'Max Per Club', value: maxPerClub },
    {
      name: 'Squad Size',
      value: numGoalkeepers + numDefenders + numMidfielders + numForwards
    },
    { name: 'Num Goalkeepers', value: numGoalkeepers },
    { name: 'Num Defenders', value: numDefenders },
    { name: 'Num Midfielders', value: numMidfielders },
    { name: 'Num Forwards', value: numForwards }
  ]

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        League Rules
      </Typography>
      <div className={classes.content}>
        <Table>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.rowName}
                >
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default AuctionSideBarRules
