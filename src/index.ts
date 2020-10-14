import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const main = async () => {
  const app = express()
  const PORT = process.env.PORT || 4000

  app.use(cors())

  app.use(bodyParser.json())

  app.use('/metric', require('./api/metric'))

  app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`)
  })
}

main().catch((err) => {
  throw err
})
