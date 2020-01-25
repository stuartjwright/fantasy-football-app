import { jwtSecret, jwtExpires } from './../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: jwtExpires
  })
}

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

export const signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'need username and password' })
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).send({ message: 'could not create account' })
  }
}

export const signin = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'need username and password' })
  }

  const errorMessage = { message: 'login failed' }

  try {
    const user = await User.findOne({ username: req.body.username })
      .select('username password')
      .exec()

    if (!user) {
      return res.status(401).send(errorMessage)
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      return res.status(401).send(errorMessage)
    }

    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).send(errorMessage)
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}
