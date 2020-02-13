import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

playerSchema.index({ displayName: 1, team: 1 })

export const Player = mongoose.model('player', playerSchema)
