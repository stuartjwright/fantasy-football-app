import React from 'react'
import GavelIcon from '@material-ui/icons/Gavel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
  gavel: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    width: 300,
    height: 300,
    borderRadius: '15%',
    marginTop: 50
  }
}))

const AuctionItemSold = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h3">Gone!</Typography>
      <GavelIcon className={classes.gavel} />
    </div>
  )
}

export default AuctionItemSold
