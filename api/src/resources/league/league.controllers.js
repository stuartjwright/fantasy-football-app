import { League } from './league.model'
import { defaultValues } from './league.config'

export const getOneLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.leagueId)
      .populate({ path: 'creator users', select: 'username' })
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
    // let league = await League.findById(leagueId).exec()
    // if (league.users.length >= league.maxEntrants) {
    //   return res.status(400).end()
    // }
    // league = await League.findByIdAndUpdate(
    //   leagueId,
    //   {
    //     $addToSet: { users: user }
    //   },
    //   { new: true, useFindAndModify: false }
    // )
    // const { numRegistered, maxEntrants } = league
    // if (numRegistered >= maxEntrants) {
    //   league.status = 'ready'
    //   await league.save()
    // }

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

    res.status(202).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const makeOpeningBid = async (req, res) => {
  // TODO add club/position constraints in find portion of query
  try {
    const user = req.user._id
    const { leagueId, playerId } = req.body
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

    if (!league) {
      throw new Error('Could not make opening bid')
    }

    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const makeBid = async (req, res) => {
  // TODO add club/position/budget constraints in find portion of query
  try {
    const user = req.user._id
    const { leagueId, auctionItemId, amount } = req.body
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

    if (!league) {
      throw new Error('Bid unsuccessful')
    }

    startCountdown(leagueId, auctionItemId, amount)

    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const checkBidIsHighest = async (leagueId, auctionItemId, amount) => {
  const league = await League.findOne({
    _id: leagueId,
    status: 'auction',
    'auction.liveAuctionItem._id': auctionItemId,
    'auction.liveAuctionItem.currentHighBid': amount
  }).exec()
  return !!league
}

const startCountdown = (leagueId, auctionItemId, amount) => {
  let count = defaultValues.countdownTimer
  const countdown = setInterval(async () => {
    count -= 1
    if (count <= 0) {
      await lockAuction(leagueId)
      await setAuctionItemComplete(leagueId)
      // TODO update all clients on sale via socket.IO
      return clearInterval(countdown)
    }
    const league = await checkBidIsHighest(leagueId, auctionItemId, amount)
    if (!league) {
      return clearInterval(countdown)
    }
    // TODO: send countdown via socket.IO here
    console.log(amount, count)
  }, 1000)
}

const lockAuction = async leagueId => {
  const league = League.findByIdAndUpdate(
    leagueId,
    {
      status: 'locked'
    },
    { useFindAndModify: false }
  )
  return league
}

const setAuctionItemComplete = async leagueId => {
  // TODO: a lot!!
  // But doesn't have to be atomic because we will keep status = 'locked' until done
  // So no need to use findOneAndUpdate. Just findbyId, do plain JS manipulation, then league.save()
  // - move live auction item to sold auction items
  // - decrease winning user budget
  // - add player to squad of winning bidder
  // - update position/club constraints, not yet added to schema but think I should
  // - choose next user to open bidding
  // - set live auction item to null
  // - finally, remove 'locked' status so bidding can start on next item
}
