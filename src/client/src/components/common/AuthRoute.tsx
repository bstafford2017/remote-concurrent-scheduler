import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LOGIN_URL } from '../routes'
// import { loadUser } from '../../actions/user'
import { hasToken } from '../../utils'
import { Store } from '../../reducers'

interface IProps {
  loadUser: Function
  isLoading: boolean
  isAuthenticated: boolean
  component: any
}

const AuthRoute = ({
  loadUser,
  isLoading,
  isAuthenticated,
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? null : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={LOGIN_URL} />
        )
      }
    />
  )
}

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  // loadUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state: Store) => ({
  isLoading: state.common.isLoading,
  isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = {
  // loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
