import React from 'react'
import styledComponents from 'styled-components'

const FooterWrapper = styledComponents.div`
  font-size: 18px;
  position: absolute;
  bottom: 0;
  height: 8rem;
  background-color: #000;
  color: #00aa4f;
  padding: 10px;
  text-align: center;
  line-height: 0.5;
  width: 100%;
`

const Footer = () => (
  <FooterWrapper>
    <p>Remote Concurrent Scheduler</p>
    <p>Benjamin Stafford and Jonathan Schmitz</p>
    <p>John Nordlie</p>
    <p>University of North Dakota SEECS</p>
  </FooterWrapper>
)

export default Footer
