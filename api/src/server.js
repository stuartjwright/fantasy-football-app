import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import http from 'http'
import socketIo from 'socket.io'
import { connect } from './utils/db'
import { port } from './config'
import { signup, signin, protect } from './utils/auth'
import userRouter from './resources/user/user.router'
import playerRouter from './resources/player/player.router'
import leagueRouter from './resources/league/league.router'
import eventRouter from './resources/event/event.router'
import path from 'path'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

export const nsp = io.of('/leagues')
nsp.on('connection', socket => {
  const { leagueId } = socket.request._query
  socket.join(leagueId)
})

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/player', playerRouter)
app.use('/api/league', leagueRouter)
app.use('/api/event', eventRouter)

const root = path.join(__dirname, 'public')
app.use(express.static(root))
app.get('/*', function(req, res) {
  res.sendFile('index.html', { root }, function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

export const start = async () => {
  try {
    await connect()
    server.listen(port, () => {
      console.log(
        `Express API with socket.IO server listening on port ${port}.`
      )
    })
  } catch (e) {
    console.error(e)
  }
}
