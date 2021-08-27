import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  BUILDINGS_URL,
  ROOMS_URL,
  USERS_URL,
  SETTINGS_URL,
  SEARCH_URL,
  HOME_URL,
  LOGIN_URL
} from '../routes'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import { logout } from '../../actions/user'
import { Store } from '../../reducers'

interface IProps {
  isAuthenticated: boolean
  isAdmin: boolean
  logout: Function
}

const Navigation = ({ isAuthenticated, isAdmin, logout }: IProps) => {
  const [collapsed, setCollapsed]: [boolean, Function] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)
  const signOut = () => logout()
  return (
    <>
      {isAuthenticated ? (
        <Navbar expand='md' dark>
          <NavbarToggler onClick={toggleNavbar} className='mr-2' />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink to={HOME_URL} tag={RRNavLink}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={SEARCH_URL} tag={RRNavLink}>
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={SETTINGS_URL} tag={RRNavLink}>
                  Settings
                </NavLink>
              </NavItem>
              {isAdmin ? (
                <>
                  <NavItem>
                    <NavLink to={BUILDINGS_URL} tag={RRNavLink}>
                      Manage Buildings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={ROOMS_URL} tag={RRNavLink}>
                      Manage Rooms
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to={USERS_URL} tag={RRNavLink}>
                      Manage Users
                    </NavLink>
                  </NavItem>
                </>
              ) : null}
            </Nav>
            <Nav className='ml-auto'>
              <NavItem>
                <NavLink to={LOGIN_URL} onClick={signOut} tag={RRNavLink}>
                  Sign Out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <Navbar expand='md' dark>
          <NavbarToggler onClick={toggleNavbar} className='mr-2' />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink to={LOGIN_URL} tag={RRNavLink}>
                  Home
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </>
  )
}

const mapStateToProps = (state: Store) => ({
  isAuthenticated: state.user.isAuthenticated,
  isAdmin: state.user.user?.admin
})

const mapDispatchToPros = {
  logout
}

export default connect(mapStateToProps, mapDispatchToPros)(Navigation)
