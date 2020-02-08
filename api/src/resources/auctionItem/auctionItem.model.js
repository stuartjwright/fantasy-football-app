import mongoose from 'mongoose'

const auctionItemSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['available', 'live', 'sold'],
      default: 'available',
      required: true
    },
    player: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'player',
      required: true
    },
    bidHistory: {
      type: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'bid'
        }
      ],
      default: [],
      required: true
    },
    highBid: {
      type: Number,
      default: 0,
      required: true
    }
  },
  { timestamps: true }
)

export const AuctionItem = mongoose.model('auctionItem', auctionItemSchema)
