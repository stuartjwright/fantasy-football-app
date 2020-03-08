import React, { Fragment, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import LoginSignup from './account/LoginSignup'
import Logout from './account/Logout'
import Home from './Home'
import MyLeagues from './MyLeagues'
import CreateLeague from './CreateLeague'
import JoinLeagues from './JoinLeagues'
import LeagueContainer from './league/LeagueContainer'
import AuctionContainer from './auction/AuctionContainer'
import { PlayersProvider } from '../contexts/PlayersContext'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  active: {
    backgroundColor: theme.palette.grey[200]
  },
  listItem: {
    color: theme.palette.text.primary
  },
  heading: {
    flex: 1
  }
}))

const MainNavigation = ({ auth }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          component={NavLink}
          to="/"
          exact
          activeClassName={classes.active}
          onClick={handleDrawerClose}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" className={classes.listItem} />
        </ListItem>
        {auth && (
          <Fragment>
            <ListItem
              component={NavLink}
              to="/myleagues"
              activeClassName={classes.active}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <PlaylistAddCheckIcon />
              </ListItemIcon>
              <ListItemText primary="My Leagues" className={classes.listItem} />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/createleague"
              activeClassName={classes.active}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText
                primary="Create League"
                className={classes.listItem}
              />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/joinleagues"
              activeClassName={classes.active}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText
                primary="Join a League"
                className={classes.listItem}
              />
            </ListItem>
          </Fragment>
        )}
      </List>
    </div>
  )

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.heading}>
              Fantasy Football League
            </Typography>
            {auth && <Logout />}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden lgUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {auth ? <LoggedInRoutes /> : <LoggedOutRoutes />}
        </main>
      </div>
    </Router>
  )
}

const LoggedInRoutes = () => {
  return (
    <PlayersProvider>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/myleagues" exact>
          <MyLeagues />
        </Route>
        <Route path="/createleague" exact>
          <CreateLeague />
        </Route>
        <Route path="/joinleagues" exact>
          <JoinLeagues />
        </Route>
        <Route path="/myleagues/:leagueId" exact component={LeagueContainer} />
        <Route
          path="/myleagues/:leagueId/auction"
          exact
          component={AuctionContainer}
        />
      </Switch>
    </PlayersProvider>
  )
}

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LoginSignup />
      </Route>
    </Switch>
  )
}

export default MainNavigation
