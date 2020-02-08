import React from 'react'
import Typography from '@material-ui/core/Typography'
import ErrorIcon from '@material-ui/icons/Error'

const Error = () => (
  <div>
    <ErrorIcon color="secondary" />
    <Typography>Something went wrong!</Typography>
  </div>
)

export default Error
