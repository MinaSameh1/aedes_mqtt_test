import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    payload: {
      type: String
    },
    topic: {
      type: String
    },
    clientId: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
)

const topicsModel = mongoose.model('topics', schema)

export default topicsModel
