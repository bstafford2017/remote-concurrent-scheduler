import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { LOGIN_URL } from '../Routes'

const Auth = ({ component: Component, user, ...rest }) => {
  return Object.keys(user).length === 0 ? (
    <Redirect to={LOGIN_URL} />
  ) : (
    <Route {...rest} render={(props) => <Component user={user} {...props} />} />
  )
}

export default Auth
