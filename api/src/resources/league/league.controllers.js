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
  const user = req.user._id
  try {
    const leagues = await League.find({ users: user }).exec()
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
    const league = await League.findByIdAndUpdate(
      leagueId,
      {
        $push: { users: user }
      },
      { new: true, useFindAndModify: false }
    )

    res.status(202).json({ league })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
