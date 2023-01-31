import 'dotenv/config'
import http from 'http'
import mongoose from 'mongoose'
import net from 'net'
import ws from 'websocket-stream'
import aedesInstance from './aedes'
import app from './server'

const setup = async () => {
  const httpServer = http.createServer(app)
  const PORT = process.env.PORT || 7000

  await mongoose.connect(process.env.DBURI ?? '')

  net
    .createServer(aedesInstance.handle as unknown as () => void)
    .listen(Number(PORT) + 1, () => {
      console.log('Aedes Started')
    })

  ws.createServer(
    { server: httpServer },
    aedesInstance.handle as unknown as () => void
  )

  httpServer.listen(PORT, () => {
    console.log(`Listenning  on ${PORT}`)
  })
}

setup()
