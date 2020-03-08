import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['not started', 'live', 'complete'],
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    playerPoints: [
      {
        player: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'player',
          required: true
        },
        points: {
          type: Number,
          required: true,
          default: 0
        }
      }
    ]
  },
  { timestamps: true }
)

export const Event = mongoose.model('event', eventSchema)
