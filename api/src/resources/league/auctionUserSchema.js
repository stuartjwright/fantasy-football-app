import mongoose from 'mongoose'

import { squadItemSchema } from './squadItemSchema'
export const auctionUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    squad: [
      {
        type: squadItemSchema
      }
    ]
  },
  { timestamps: true }
)
