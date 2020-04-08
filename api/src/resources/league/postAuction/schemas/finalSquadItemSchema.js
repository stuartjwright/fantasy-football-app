import mongoose from 'mongoose'

export const finalSquadItemSchema = new mongoose.Schema({
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
  },
  points: {
    type: Number,
    required: true
  },
  playerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'player',
    required: true
  }
})
