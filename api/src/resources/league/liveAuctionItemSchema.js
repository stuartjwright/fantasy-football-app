import mongoose from 'mongoose'
import { bidSchema } from './bidSchema'

export const liveAuctionItemSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'player',
      required: true
    },
    bidHistory: [
      {
        type: bidSchema
      }
    ],
    currentHighBid: {
      type: Number,
      required: true,
      default: 0
    },
    currentHighBidder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
)
