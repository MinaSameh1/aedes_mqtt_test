import Aedes from 'aedes'
import topicsModel from './model'

const aedesInstance = new Aedes()

aedesInstance.on('clientReady', client => {
  console.log('Client connected >>', client.id)
})

aedesInstance.on('clientDisconnect', client => {
  console.log('Client Disconnected >>', client.id)
})

aedesInstance.on('publish', async (packet, client) => {
  if (client) {
    console.log(
      '%s : topic %s : %s',
      client.id,
      packet.topic,
      packet.payload.toString
    )
    await topicsModel.create({
      topic: packet.topic,
      payload: packet.payload,
      clientId: client?.id
    })
  }
})

export default aedesInstance
