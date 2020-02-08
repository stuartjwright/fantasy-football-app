import mongoose from 'mongoose'

const auctionSchema = new mongoose.Schema(
  {
    auctionUsers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'auctionUser'
      }
    ],
    auctionItems: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'auctionItem'
      }
    ],
    nextUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'auctionUser'
    },
    liveItem: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'auctionItem'
    }
  },
  { timestamps: true }
)

export const Auction = mongoose.model('auction', auctionSchema)
