import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AuctionSideBarBudgets from './AuctionSideBarBudgets'
import AuctionSideBarSquads from './AuctionSideBarSquads'
import AuctionSideBarAvailablePlayers from './AuctionSideBarAvailablePlayers'
import AuctionSideBarSoldPlayers from './AuctionSideBarSoldPlayers'
import AuctionSideBarRules from './AuctionSideBarRules'

const AuctionSideBar = () => {
  const [currentItem, setCurrentItem] = useState(null)
  const [currentView, setCurrentView] = useState('budgets')

  const handleClick = event => {
    setCurrentItem(event.currentTarget)
  }

  const handleClose = val => () => {
    setCurrentItem(null)
    setCurrentView(val)
  }

  return (
    <>
      <Button
        aria-controls="view-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        color="primary"
      >
        Change View
      </Button>
      <Menu
        id="view-menu"
        anchorEl={currentItem}
        keepMounted
        open={Boolean(currentItem)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose('budgets')}>Budgets</MenuItem>
        <MenuItem onClick={handleClose('squads')}>Squads</MenuItem>
        <MenuItem onClick={handleClose('available')}>
          Available Players
        </MenuItem>
        <MenuItem onClick={handleClose('sold')}>Sold Players</MenuItem>
        <MenuItem onClick={handleClose('rules')}>League Rules</MenuItem>
      </Menu>
      {currentView === 'budgets' && <AuctionSideBarBudgets />}
      {currentView === 'squads' && <AuctionSideBarSquads />}
      {currentView === 'available' && <AuctionSideBarAvailablePlayers />}
      {currentView === 'sold' && <AuctionSideBarSoldPlayers />}
      {currentView === 'rules' && <AuctionSideBarRules />}
    </>
  )
}

export default AuctionSideBar
