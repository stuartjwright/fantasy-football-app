export const getMoneyFormat = value => {
  if (value === 0) return '£0'
  return value >= 1e6 ? `£${value / 1e6}M` : `£${value / 1e3}K`
}

export const getUsersLookup = users => {
  let usersLookup = {}
  users.forEach(u => (usersLookup[u._id] = u.username))
  return usersLookup
}

const abbreviationLookup = {
  Arsenal: 'ARS',
  'Aston Villa': 'AVL',
  Bournemouth: 'BOU',
  Brighton: 'BHA',
  Burnley: 'BUR',
  Chelsea: 'CHE',
  'Crystal Palace': 'CRY',
  Everton: 'EVE',
  Leicester: 'LEI',
  Liverpool: 'LIV',
  'Man City': 'MCI',
  'Man Utd': 'MUN',
  Newcastle: 'NEW',
  Norwich: 'NOR',
  'Sheffield Utd': 'SHU',
  Southampton: 'SOU',
  Spurs: 'TOT',
  Watford: 'WAT',
  'West Ham': 'WHU',
  Wolves: 'WOL'
}

export const getClubAbbreviation = club => abbreviationLookup[club]
