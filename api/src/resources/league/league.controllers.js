import { League } from './league.model'
import { Auction } from './../auction/auction.model'
import { defaultValues } from './league.config'

export const getOneLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.leagueId)
      .populate({ path: 'creator users', select: 'username' })
      .populate('auction')
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
  const user = req.user._id
  try {
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
  const user = req.user._id
  try {
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
  const creator = req.user._id
  try {
    const auction = await Auction.create({})
    const auctionId = auction._id
    const league = await League.create({
      ...defaultValues,
      ...req.body,
      creator,
      users: [creator],
      auction: auctionId
    })
    res.status(201).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const joinLeague = async (req, res) => {
  const user = req.user._id
  try {
    const { leagueId } = req.body
    let league = await League.findById(leagueId).exec()
    if (league.users.length >= league.maxEntrants) {
      return res.status(400).end()
    }
    league = await League.findByIdAndUpdate(
      leagueId,
      {
        $addToSet: { users: user }
      },
      { new: true, useFindAndModify: false }
    )
    const { numRegistered, maxEntrants } = league
    if (numRegistered >= maxEntrants) {
      league.status = 'ready'
      await league.save()
    }
    res.status(202).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
