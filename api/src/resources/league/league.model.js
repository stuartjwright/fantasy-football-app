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

const squadItemSchema = new mongoose.Schema({
  cost: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  positions: {
    type: String,
    required: true
  }
})

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
        type: squadItemSchema
      }
    ]
  },
  { timestamps: true }
)

const soldAuctionItemSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'player',
      required: true
    },
    winner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

const liveAuctionItemSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'player',
      required: true
    },
    bidHistory: [
      {
        type: bidSchema
      }
    ],
    currentHighBid: {
      type: Number,
      required: true,
      default: 0
    },
    currentHighBidder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
)

const auctionSchema = new mongoose.Schema(
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

const leagueSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['registering', 'ready', 'auction', 'postauction'],
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

export const League = mongoose.model('league', leagueSchema)
