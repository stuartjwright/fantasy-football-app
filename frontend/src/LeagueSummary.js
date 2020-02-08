import React from 'react'
import Typography from '@material-ui/core/Typography'

const LeagueSummary = ({ league }) => {
  return (
    <div>
      <Typography variant="h6">{league.leagueName}</Typography>
      <Typography>Some general info about league goes here.</Typography>
    </div>
  )
}

export default LeagueSummary
