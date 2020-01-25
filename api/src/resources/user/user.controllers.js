export const getUser = (req, res) => {
  res.status(200).json({ data: req.user })
}
