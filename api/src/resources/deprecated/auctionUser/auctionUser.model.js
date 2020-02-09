import mongoose from 'mongoose'

const auctionUserSchema = new mongoose.Schema(
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'auctionItem'
      }
    ]
  },
  { timestamps: true }
)

export const AuctionUser = mongoose.model('auctionUser', auctionUserSchema)
