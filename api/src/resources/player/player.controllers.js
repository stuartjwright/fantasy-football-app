import { Player } from './player.model'

export const getOnePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId)
      .lean()
      .exec()

    if (!player) {
      return res.status(400).end()
    }

    res.status(200).json({ player })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find()
      .lean()
      .exec()

    if (!players) {
      return res.status(400).end()
    }

    res.status(200).json({ players })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
