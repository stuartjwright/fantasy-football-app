import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db'
import { port } from './config'
import { signup, signin, protect } from './utils/auth'
import userRouter from './resources/user/user.router'
import playerRouter from './resources/player/player.router'

export const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/player', playerRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log(`Express API listening on port ${port}.`)
    })
  } catch (e) {
    console.error(e)
  }
}
