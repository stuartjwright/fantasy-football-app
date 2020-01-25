import mongoose from 'mongoose'
import { mongoURI } from './../config'

export const connect = () => {
  const con = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  console.log(`Connected to MongoDB at ${mongoURI}.`)
  return con
}
