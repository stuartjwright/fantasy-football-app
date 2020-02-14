import mongoose from 'mongoose'

export const soldAuctionItemSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'player',
      required: true
    },
    winner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)
