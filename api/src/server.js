import express from 'express'

export const app = express()

app.get('/', (req, res) => {
  res.status(200).send({ message: 'hello' })
})

export const start = async () => {
  try {
    app.listen(5000, () => {
      console.log('REST API on http://localhost:/5000')
    })
  } catch (e) {
    console.error(e)
  }
}
