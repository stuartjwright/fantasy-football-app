import React, { Fragment } from 'react'
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
import LoginSignup from './LoginSignup'
import Logout from './Logout'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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

export default ({ auth }) => {
  const classes = useStyles()

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.heading}>
              Fantasy Football League
            </Typography>
            {auth && <Logout />}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem
              component={NavLink}
              to="/"
              exact
              activeClassName={classes.active}
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
                  to="/leagues"
                  activeClassName={classes.active}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Leagues"
                    className={classes.listItem}
                  />
                </ListItem>
                <ListItem
                  component={NavLink}
                  to="/auction"
                  activeClassName={classes.active}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Auction"
                    className={classes.listItem}
                  />
                </ListItem>
              </Fragment>
            )}
          </List>
        </Drawer>
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
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/leagues" exact>
        <Leagues />
      </Route>
      <Route path="/auction" exact>
        <Auction />
      </Route>
    </Switch>
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

const Home = () => <h1>Home</h1>
const Leagues = () => <h1>Leagues</h1>
const Auction = () => <h1>Auction</h1>
