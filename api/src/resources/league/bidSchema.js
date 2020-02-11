import mongoose from 'mongoose'

export const bidSchema = new mongoose.Schema(
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

bidSchema.pre('validate', function(next) {
  console.log('hello from bid middleware')
  next()
})
