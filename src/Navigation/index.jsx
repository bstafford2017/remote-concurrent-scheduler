import React, { useState, useEffect } from 'react'
import {
  ROOMS_URL,
  USERS_URL,
  SETTINGS_URL,
  SEARCH_URL,
  HOME_URL,
  LOGIN_URL
} from '../Routes'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import Banner from '../components/Banner'
import NavigationItem from './NavigationItem'
import styledComponents from 'styled-components'

const NavigationBar = styledComponents(Navbar)`
  background-color: #000;
  color: #009a44;
  border-bottom: #f36f21 2px
`

const Navigation = ({ user, logOut }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const { admin = false } = user
    setIsAdmin(admin)
    setIsAuthenticated(Object.keys(user).length > 0)
  }, [user])

  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <>
      <div style={{ backgroundColor: '#000' }}>
        <Banner />
      </div>
      {isAuthenticated ? (
        <NavigationBar expand='md' dark>
          <NavbarToggler onClick={toggleNavbar} className='mr-2' />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className='mr-auto' navbar>
              <NavigationItem to={HOME_URL} text='Home' />
              <NavigationItem to={SEARCH_URL} text='Search' />
              <NavigationItem to={SETTINGS_URL} text='Settings' />
              {isAdmin ? (
                <>
                  <NavigationItem to={ROOMS_URL} text='Manage Rooms' />
                  <NavigationItem to={USERS_URL} text='Manage Users' />
                </>
              ) : null}
            </Nav>
            <Nav className='ml-auto'>
              <NavigationItem
                to={LOGIN_URL}
                text='Log Out'
                onClick={() => logOut()}
              />
            </Nav>
          </Collapse>
        </NavigationBar>
      ) : (
        <NavigationBar expand='md' dark>
          <NavbarToggler onClick={toggleNavbar} className='mr-2' />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className='mr-auto' navbar>
              <NavigationItem to={LOGIN_URL} text='Home'></NavigationItem>
            </Nav>
          </Collapse>
        </NavigationBar>
      )}
    </>
  )
}

export default Navigation
