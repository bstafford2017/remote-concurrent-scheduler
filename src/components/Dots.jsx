import React from 'react'
import { Spinner } from 'reactstrap'
import styledComponents from 'styled-components'

const SpinnerWrapper = styledComponents.div`
  margin-left: 46%;
`

const Dots = ({ display = false }) => {
  if (!display) {
    return null
  }

  return (
    <SpinnerWrapper>
      <Spinner color='success' type='grow' />
      <Spinner color='success' type='grow' />
      <Spinner color='success' type='grow' />
    </SpinnerWrapper>
  )
}

export default Dots
