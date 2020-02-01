import mongoose from 'mongoose'

const leagueSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['registering', 'ready', 'auction', 'complete'],
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'auction'
    }
  },
  { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
)

leagueSchema.pre('findOneAndUpdate', async function() {
  const league = await this.model.findOne(this.getQuery())
  const { users, numRegistered, maxEntrants, status } = league
  const user = this._update.$push.users
  if (
    users.includes(user) ||
    numRegistered >= maxEntrants ||
    status !== 'registering'
  ) {
    throw new Error('cannot join league')
  }
})

leagueSchema.virtual('numRegistered').get(function() {
  return this.users.length
})

export const League = mongoose.model('league', leagueSchema)
