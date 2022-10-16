import React from 'react'
import { Button as BootstrapButton } from 'reactstrap'
import styledComponents from 'styled-components'

const StyledButton = styledComponents(BootstrapButton)`
  color: white;
  background-color: #009a44;
  font-weight: 600;
`

const Button = ({ title, ...props }) => {
  return <StyledButton {...props}>{title}</StyledButton>
}

export default Button
