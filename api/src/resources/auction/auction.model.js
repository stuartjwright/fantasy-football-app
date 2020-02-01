import mongoose from 'mongoose'

const auctionSchema = new mongoose.Schema(
  {
    auctionUsers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'auctionUser',
        default: []
      }
    ],
    auctionItems: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'auctionUser',
        default: []
      }
    ]
  },
  { timestamps: true }
)

export const Auction = mongoose.model('auction', auctionSchema)
