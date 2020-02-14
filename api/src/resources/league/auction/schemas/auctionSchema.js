import mongoose from 'mongoose'
import { auctionUserSchema } from './auctionUserSchema'
import { soldAuctionItemSchema } from './soldAuctionItemSchema'
import { liveAuctionItemSchema } from './liveAuctionItemSchema'

export const auctionSchema = new mongoose.Schema(
  {
    auctionUsers: [
      {
        type: auctionUserSchema
      }
    ],
    soldAuctionItems: [
      {
        type: soldAuctionItemSchema
      }
    ],
    liveAuctionItem: {
      type: liveAuctionItemSchema
    },
    nextUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)
