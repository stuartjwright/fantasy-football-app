import mongoose from 'mongoose'

const bidSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export const Bid = mongoose.model('bid', bidSchema)
