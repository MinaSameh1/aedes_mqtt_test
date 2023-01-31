import express from 'express'
import cors from 'cors'
import topicsModel from './model'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, _res, next) => {
  console.log('Recieved Request', req.originalUrl)
  next()
})

app.get('/ping', (_, res) => {
  return res.status(200).json({ message: 'Working' })
})

app.get('/topics', async (_req, res, next) => {
  try {
    const data = await topicsModel.find({}).limit(50).sort({ createdAt: -1 })
    return res.status(200).json({ data })
  } catch (err) {
    next(err)
  }
})

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    console.error(err)
    return res
      .status(500)
      .json({ error: true, message: 'Internal Server Error' })
  }
)

export default app
