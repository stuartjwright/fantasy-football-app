import mongoose from 'mongoose'
import { auctionSchema } from './auctionSchema'

const leagueSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['registering', 'ready', 'auction', 'locked', 'postauction'],
      required: true
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    },
    maxEntrants: {
      type: Number,
      required: true
    },
    leagueName: {
      type: String,
      required: true,
      unique: true
    },
    startBudget: {
      type: Number,
      required: true
    },
    maxPerClub: {
      type: Number,
      required: true
    },
    numGoalkeepers: {
      type: Number,
      required: true
    },
    numDefenders: {
      type: Number,
      required: true
    },
    numMidfielders: {
      type: Number,
      required: true
    },
    numForwards: {
      type: Number,
      required: true
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      }
    ],
    auction: {
      type: auctionSchema
    }
  },
  { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
)

leagueSchema.virtual('numRegistered').get(function() {
  return this.users.length
})

leagueSchema.pre('update', function(next) {
  console.log('hello from league middleware')
  next()
})

export const League = mongoose.model('league', leagueSchema)
