import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import AuthRoute from './Auth'
import Footer from './components/Footer'
import Settings from './Settings'
import Search from './Search'
import Home from './Home'
import ManageRooms from './Rooms/ManageRooms'
import ManageUsers from './Users/ManageUsers'
import NotFound from './components/NotFound'
import Navigation from './Navigation'
import {
  LOGIN_URL,
  HOME_URL,
  SEARCH_URL,
  SETTINGS_URL,
  ROOMS_URL,
  USERS_URL
} from './Routes'
import styledComponents from 'styled-components'
import { authStatus } from './Http'
import Spinner from './components/Spinner'

const AppWrapper = styledComponents.div`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: white;
`

const PageWrapper = styledComponents.div`
  padding-bottom: 8rem;
`

const App = () => {
  const [user, setUser] = useState({})
  const [logOutAlert, setLogOutAlert] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoadingAuth(true)
      try {
        const response = await authStatus()
        const { data } = response
        const { user } = data
        setIsLoadingAuth(false)
        setUser(user)
      } catch (e) {
        setIsLoadingAuth(false)
      }
    })()
  }, [])

  const logOut = () => {
    setLogOutAlert(true)
    setUser({})
  }

  const dismissLogOutAlert = () => {
    setLogOutAlert(false)
  }

  return (
    <AppWrapper>
      <Router>
        <PageWrapper>
          <Navigation user={user} logOut={logOut} />
          {isLoadingAuth && <Spinner />}
          <Switch>
            <Route
              exact
              path={LOGIN_URL}
              component={() => (
                <>
                  <Login
                    user={user}
                    logOutAlert={logOutAlert}
                    dismissLogOutAlert={dismissLogOutAlert}
                  />
                </>
              )}
            />
            <AuthRoute path={HOME_URL} user={user} component={Home} />
            <AuthRoute path={SEARCH_URL} user={user} component={Search} />
            <AuthRoute path={SETTINGS_URL} user={user} component={Settings} />
            <AuthRoute path={ROOMS_URL} user={user} component={ManageRooms} />
            <AuthRoute path={USERS_URL} user={user} component={ManageUsers} />
            <Route path='*' component={NotFound} />
          </Switch>
        </PageWrapper>
      </Router>
      <Footer />
    </AppWrapper>
  )
}

export default App
