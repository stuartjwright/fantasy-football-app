import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
// import TextField from '@material-ui/core/TextField'
// import Chip from '@material-ui/core/Chip'

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: 500
//     }
//   },
//   paper: {
//     width: 500,
//     height: 500,
//     '& > *': {
//       margin: theme.spacing(1)
//     }
//   }
// }))

const Home = () => {
  // const classes = useStyles()
  // const [message, setMessage] = useState('')
  // const [messages, setMessages] = useState([])

  // const handleMessageChange = event => {
  //   setMessage(event.target.value)
  // }

  // const handleSubmit = event => {
  //   event.preventDefault()
  //   console.log(message)
  // }

  return (
    <div>
      {/* <Paper className={classes.paper}>
        {messages.map((message, idx) => (
          <Fragment key={idx}>
            <Chip color="primary" label={message} />
            <br />
          </Fragment>
        ))}
      </Paper>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="message-box"
          label="Enter message..."
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form> */}
    </div>
  )
}

export default Home
