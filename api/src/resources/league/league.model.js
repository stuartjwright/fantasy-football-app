import mongoose from 'mongoose'
import { auctionSchema } from './auction/schemas/auctionSchema'
import { postAuctionUserSchema } from './postAuction/schemas/postAuctionUserSchema'
import { Event } from '../event/event.model'

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
    event: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'event',
      required: true
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
    },
    postAuctionUsers: [
      {
        type: postAuctionUserSchema
      }
    ]
  },
  { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
)

const getDefaultEvent = async () => {
  const event = await Event.findOne({ status: 'not started' }).exec()
  return event._id
}

leagueSchema.pre('validate', async function() {
  if (!this.event) {
    const event = await getDefaultEvent()
    this.event = event
  }
})

leagueSchema.virtual('numRegistered').get(function() {
  return this.users.length
})

export const League = mongoose.model('league', leagueSchema)
