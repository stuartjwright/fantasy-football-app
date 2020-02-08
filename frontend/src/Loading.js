import React from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loading = () => (
  <div>
    <CircularProgress color="primary" />
    <Typography>Loading...</Typography>
  </div>
)

export default Loading
