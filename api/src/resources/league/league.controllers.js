import { League } from './league.model'
import { defaultValues } from './league.config'
import { Player } from '../player/player.model'

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

    if (!league) {
      throw new Error('Could not make opening bid')
    }

    startCountdown(leagueId, league.auction.liveAuctionItem._id, 0)

    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const checkConstraintsOpening = async (user, leagueId, playerId) => {
  const league = await League.findById(leagueId)
  const player = await Player.findById(playerId)
  const { position, team } = player
  const auctionUser = league.auction.auctionUsers.filter(
    u => u.user.toString() === user.toString()
  )[0]
  const { positionConstraints, clubConstraints } = auctionUser
  return (
    positionConstraints.includes(position) || clubConstraints.includes(team)
  )
}

const checkConstraints = async (user, leagueId, amount) => {
  const league = await League.findById(leagueId)
  const playerId = league.auction.liveAuctionItem.player._id
  const player = await Player.findById(playerId)
  const { position, team } = player
  const auctionUser = league.auction.auctionUsers.filter(
    u => u.user.toString() === user.toString()
  )[0]
  const { budget, positionConstraints, clubConstraints } = auctionUser
  return (
    amount > budget ||
    positionConstraints.includes(position) ||
    clubConstraints.includes(team)
  )
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
  // TODO: Refactor this a bit. I think it all works, but is a pretty massive function.
  try {
    let league = await League.findById(leagueId).exec()
    const winningBidderId = league.auction.liveAuctionItem.currentHighBidder
    const winningBid = league.auction.liveAuctionItem.currentHighBid
    const playerIdSold = league.auction.liveAuctionItem.player
    const player = await Player.findById(playerIdSold)
      .select('-_id')
      .lean()
      .exec()

    const {
      maxPerClub,
      numGoalkeepers,
      numDefenders,
      numMidfielders,
      numForwards
    } = league
    const positionConstraints = {
      Goalkeeper: numGoalkeepers,
      Defender: numDefenders,
      Midfielder: numMidfielders,
      Forward: numForwards
    }
    const maxSquad = Object.values(positionConstraints).reduce((a, b) => a + b)

    const soldItem = {
      player: playerIdSold,
      winner: winningBidderId,
      cost: winningBid
    }

    let auctionUsers = league.auction.auctionUsers
    auctionUsers.forEach((auctionUser, i) => {
      if (auctionUser.user.toString() === winningBidderId.toString()) {
        auctionUsers[i].budget -= winningBid
        auctionUsers[i].squad.push({
          ...player,
          cost: winningBid
        })

        const { team } = player
        if (
          auctionUsers[i].squad.filter(s => s.team === team).length >=
          maxPerClub
        ) {
          auctionUsers[i].clubConstraints.push(team)
        }

        for (let [position, maximum] of Object.entries(positionConstraints)) {
          if (
            position === player.position &&
            auctionUsers[i].squad.filter(s => s.position === position).length >=
              maximum
          ) {
            auctionUsers[i].positionConstraints.push(position)
          }
        }
      }
    })

    const { nextUser } = league.auction
    const candidates = auctionUsers
      .filter(
        u =>
          u.squad.length < maxSquad || u.user.toString() === nextUser.toString()
      )
      .map(u => u.user)
    const idx = candidates.indexOf(nextUser)
    const newIdx = (idx + 1) % candidates.length
    const newNextUser = candidates[newIdx]

    let status = 'auction'
    if (auctionUsers.every(u => u.squad.length >= maxSquad)) {
      status = 'postauction'
    }

    league.auction.soldAuctionItems.push(soldItem)
    league.auction.auctionUsers = auctionUsers
    league.auction.liveAuctionItem = null
    league.auction.nextUser = newNextUser
    league.status = status

    await league.save()

    console.log('Player successfully sold.')
  } catch (e) {
    console.error(e)
    await League.findByIdAndUpdate(
      leagueId,
      { status: 'auction' },
      { useFindAndModify: false }
    )
  }
}
