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
    ]
  },
  { timestamps: true }
)
