import { League } from './league.model'
import { defaultValues } from './league.config'
import {
  checkConstraintsOpening,
  checkConstraints
} from './auction/utils/constraints'
import { startCountdown } from './auction/utils/auction'
import { nsp as socketIO } from '../../server'

export const getOneLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.leagueId)
      .populate({ path: 'creator users', select: 'username' })
      .populate('auction.liveAuctionItem.player')
      .populate('users', 'username')
      .exec()

    if (!league) {
      return res.status(400).end()
    }

    res.status(200).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getAllLeagues = async (req, res) => {
  try {
    const leagues = await League.find()
      .lean()
      .exec()

    res.status(200).json({ leagues })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMyLeagues = async (req, res) => {
  try {
    const user = req.user._id
    const leagues = await League.find({ users: user })
      .populate({ path: 'creator', select: 'username' })
      .exec()
    res.status(200).json({ leagues })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getRegisteringLeagues = async (req, res) => {
  try {
    const user = req.user._id
    const leagues = await League.find({
      status: 'registering',
      users: { $ne: user }
    })
      .populate({ path: 'creator', select: 'username' })
      .exec()
    res.status(200).json({ leagues })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createLeague = async (req, res) => {
  try {
    const creator = req.user._id
    const league = await League.create({
      ...defaultValues,
      ...req.body,
      creator,
      users: [creator]
    })
    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const joinLeague = async (req, res) => {
  try {
    const user = req.user._id
    const { leagueId } = req.body

    let league = await League.findOneAndUpdate(
      {
        _id: leagueId,
        users: { $ne: user },
        status: 'registering',
        $expr: {
          $lt: ['$numRegistered', '$maxEntrants']
        }
      },
      { $push: { users: user } },
      { new: true, useFindAndModify: false }
    )

    if (!league) {
      throw new Error('could not join league')
    }

    if (league.numRegistered >= league.maxEntrants) {
      // not strictly atomic, fix if possible but not that important here
      league.status = 'ready'
      await league.save()
    }

    res.status(202).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const setLeagueToStartAuction = async (req, res) => {
  try {
    const user = req.user._id
    const { leagueId } = req.body
    let league = await League.findOne({
      _id: leagueId,
      creator: user,
      status: 'ready'
    })

    if (!league) {
      throw new Error('could not start auction')
    }

    const auctionUsers = league.users.map(u => {
      return { user: u, squad: [], budget: defaultValues.startBudget }
    })
    league.status = 'auction'
    league.auction = {
      auctionUsers,
      soldAuctionItems: [],
      liveAuctionItem: null,
      nextUser: user
    }
    // not strictly atomic, fix if possible but not that important here
    await league.save()
    league = await League.findById(leagueId)
      .populate('users', 'username')
      .exec()

    socketIO.to(leagueId).emit('auction start', league)

    res.status(202).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const makeOpeningBid = async (req, res) => {
  try {
    const user = req.user._id
    const { leagueId, playerId } = req.body

    const constraintsExist = await checkConstraintsOpening(
      user,
      leagueId,
      playerId
    )
    if (constraintsExist) {
      throw new Error('Bid unsuccessful (club or position)')
    }

    const league = await League.findOneAndUpdate(
      {
        _id: leagueId,
        status: 'auction',
        'auction.nextUser': user,
        'auction.liveAuctionItem': null,
        'auction.soldAuctionItems': {
          $not: { $elemMatch: { player: playerId } }
        }
      },
      {
        'auction.liveAuctionItem': {
          player: playerId,
          bidHistory: [{ user: user }],
          currentHighBidder: user
        }
      },
      { new: true, useFindAndModify: false }
    )
      .populate('auction.liveAuctionItem.player')
      .populate('users', 'username')

    if (!league) {
      throw new Error('Could not make opening bid')
    }

    startCountdown(leagueId, league.auction.liveAuctionItem._id, 0)
    socketIO.to(leagueId).emit('opening bid', league)

    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const makeBid = async (req, res) => {
  try {
    const user = req.user._id
    const { leagueId, auctionItemId, amount } = req.body

    const constraintsExist = await checkConstraints(
      user,
      leagueId,
      auctionItemId,
      amount
    )
    if (constraintsExist) {
      throw new Error('Bid unsuccessful (club, position or budget')
    }

    const league = await League.findOneAndUpdate(
      {
        _id: leagueId,
        status: 'auction',
        users: { $eq: user },
        'auction.liveAuctionItem._id': auctionItemId,
        'auction.liveAuctionItem.currentHighBidder': { $ne: user },
        'auction.liveAuctionItem.currentHighBid': { $lt: amount }
      },
      {
        'auction.liveAuctionItem.currentHighBid': amount,
        'auction.liveAuctionItem.currentHighBidder': user,
        $push: { 'auction.liveAuctionItem.bidHistory': { user, amount } }
      },
      { new: true, useFindAndModify: false }
    )
      .populate('auction.liveAuctionItem.player')
      .populate('users', 'username')

    if (!league) {
      throw new Error('Bid unsuccessful')
    }

    startCountdown(leagueId, auctionItemId, amount)
    socketIO.to(leagueId).emit('counter bid', league)

    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
