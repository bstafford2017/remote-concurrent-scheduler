import React from 'react'
import styledComponents from 'styled-components'

const SpinnerWrapper = styledComponents.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;
`

const CenteredSpinner = styledComponents.div`
  top: 30%;
  left: 48%;
  z-index:1000;
  position: absolute;
  width: 5rem;
  height: 5rem;
`

const Spinner = () => {
  return (
    <SpinnerWrapper className='text-center col-12' id='spinner'>
      <CenteredSpinner className='spinner-border text-success' role='status'>
        <span className='sr-only'>loading...</span>
      </CenteredSpinner>
    </SpinnerWrapper>
  )
}

export default Spinner
