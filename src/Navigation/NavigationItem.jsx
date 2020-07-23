import React, { useState, useEffect } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { NavLink as RRNavLink, useHistory } from 'react-router-dom'
import useReactPath from '../Hooks/useReactPath'

const NavigationItem = ({ to, text }) => {
  const history = useHistory()
  const [path] = useReactPath()

  const [isHover, setIsHover] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  useEffect(() => {
    setIsActive(path === to)
  }, [to, path])

  return (
    <NavItem>
      <NavLink
        style={{
          color: '#009a44',
          textDecoration: isHover || isActive ? 'overline #f36f21 2px' : 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          history.push(to)
          // Manually trigger popstate event since history does not
          let popStateEvent = new PopStateEvent('popstate', { state: {} })
          dispatchEvent(popStateEvent)
        }}
      >
        {text}
      </NavLink>
    </NavItem>
  )
}

export default NavigationItem
