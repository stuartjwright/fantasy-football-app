import { League } from './league.model'
import { defaultValues } from './league.config'
import { createAuction } from '../auction/auction.controllers'
import { generateAuctionUsers } from '../auctionUser/auctionUser.controllers'
import { generateAuctionItems } from '../auctionItem/auctionItem.controllers'

export const getOneLeague = async (req, res) => {
  try {
    const league = await League.findById(req.params.leagueId)
      .populate({ path: 'creator users', select: 'username' })
      .populate({
        path: 'auction',
        populate: [
          {
            path: 'auctionUsers',
            model: 'auctionUser'
          },
          {
            path: 'liveItem',
            model: 'auctionItem'
          },
          {
            path: 'nextUser',
            model: 'auctionUser'
          }
        ]
      })
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

export const setLeagueToStartAuction = async (req, res) => {
  const user = req.user._id
  try {
    const { leagueId } = req.body
    let league = await League.findById(leagueId).exec()
    if (user.toString() !== league.creator.toString()) {
      throw new Error('Only creator can start auction')
    }
    if (league.status.toString() !== 'ready') {
      throw new Error('Only a league in ready state can be started')
    }
    const budget = defaultValues.startBudget
    const auctionUsers = await generateAuctionUsers(league, budget)
    const auctionItems = await generateAuctionItems()
    const auction = await createAuction(auctionItems, auctionUsers)
    const auctionId = auction._id
    league.auction = auctionId
    league.status = 'auction'
    await league.save()
    res.status(202).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
