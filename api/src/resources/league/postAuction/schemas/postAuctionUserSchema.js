import mongoose from 'mongoose'
import { finalSquadItemSchema } from './finalSquadItemSchema'

export const postAuctionUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    squad: [
      {
        type: finalSquadItemSchema
      }
    ],
    points: {
      type: Number,
      required: true
    },
    rank: {
      type: Number,
      required: true
    },
    trend: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)
