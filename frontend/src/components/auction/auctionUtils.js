export const getMoneyFormat = value => {
  if (value === 0) return '£0'
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

export const getUsersLookup = users => {
  let usersLookup = {}
  users.forEach(u => (usersLookup[u._id] = u.username))
  return usersLookup
}
