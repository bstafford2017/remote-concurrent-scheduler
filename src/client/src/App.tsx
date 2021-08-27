import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { loadUser } from './actions/user'

import { connect } from 'react-redux'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles/calendar/items.css'
import './styles/calendar/modal.css'
import './styles/calendar/table.css'
import './styles/header.css'
import './styles/navbar.css'
import './styles/common.css'

import Login from './components/common/Login'
import Header from './components/calendar/Header'
import AuthRoute from './components/common/AuthRoute'
import Footer from './components/common/Footer'
import Settings from './components/common/Settings'
import Search from './components/search/Search'
import Home from './components/calendar/Home'
import ManageBuildings from './components/buildings/ManageBuildings'
import ManageRooms from './components/rooms/ManageRooms'
import ManageUsers from './components/users/ManageUsers'
import NotFound from './components/common/NotFound'
import Spinner from './components/common/Spinner'
import Navigation from './components/common/Navigation'
import Live from './components/calendar/Live'

import {
  LOGIN_URL,
  HOME_URL,
  SEARCH_URL,
  SETTINGS_URL,
  BUILDINGS_URL,
  ROOMS_URL,
  USERS_URL,
  LIVE_URL
} from './components/routes'
import { Store } from './reducers'

interface IProps {
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
}

const App = ({ isAuthenticated, isAdmin, isLoading }: IProps) => {
  // useEffect(() => {
  //   loadUser()
  // }, [])

  return (
    <div className='content'>
      <Router>
        <div className='content-wrap'>
          <Route
            path={LOGIN_URL}
            component={() => (
              <>
                <Header />
                <Navigation />
              </>
            )}
          />
          <Switch>
            <Route exact path={LOGIN_URL} component={Login} />
            <Route path={LIVE_URL} component={Live} />
            <AuthRoute path={HOME_URL} component={Home} />
            <AuthRoute path={SEARCH_URL} component={Search} />
            <AuthRoute path={SETTINGS_URL} component={Settings} />
            <AuthRoute path={BUILDINGS_URL} component={ManageBuildings} />
            <AuthRoute path={ROOMS_URL} component={ManageRooms} />
            <AuthRoute path={USERS_URL} component={ManageUsers} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
      {isLoading && <Spinner />}
      <Footer />
    </div>
  )
}

const mapStateToProps = (state: Store) => ({
  isAuthenticated: state.user.isAuthenticated,
  isAdmin: state.user.isAdmin,
  isLoading: state.common.isLoading
})

const mapDispatchToProps = {
  // loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
