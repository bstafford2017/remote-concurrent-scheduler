import React from 'react'
import { Input, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import styledComponents from 'styled-components'

const HeaderWrapper = styledComponents.div`
  background-color: #000;
  color: #fff;
  padding-bottom: 20px;
`

const CenterHeaderWrapper = styledComponents.div`
  text-align: center;
`

const StyledList = styledComponents.div`
  margin: 0;
  padding: 0;
  listStyleType: none;
`

const ArrowWrapper = styledComponents.div`
  font-size 35px;
`

const LeftArrowWrapper = styledComponents.div`
  display: inline;
  padding: 10px;
  color: white;
  &:hover {
    color: #f36f21;
  }
`

const RightArrowWrapper = styledComponents.div`
  display: inline;
  padding: 10px;
  color: white;
  &:hover {
    color: #f36f21;
  }
`

const Arrow = styledComponents.div`
  display: inline;
  cursor: pointer;
`

const TitleWrapper = styledComponents.div`
  display: inline-block;
  width: 35%
`

const Title = styledComponents.div`
  display: inline;
`

const Header = ({ header, previous, next }) => {
  const handleByWeek = (e) => {
    setByMonth(false)
  }

  const handleByMonth = (e) => {
    setByMonth(true)
  }

  return (
    <>
      <HeaderWrapper>
        <CenterHeaderWrapper>
          <StyledList>
            <ArrowWrapper>
              <LeftArrowWrapper>
                <Arrow onClick={() => previous()}>&#10094;</Arrow>
              </LeftArrowWrapper>
              <TitleWrapper>
                <Title>{header}</Title>
              </TitleWrapper>
              <RightArrowWrapper>
                <Arrow onClick={() => next()}>&#10095;</Arrow>
              </RightArrowWrapper>
            </ArrowWrapper>
          </StyledList>
        </CenterHeaderWrapper>
      </HeaderWrapper>
    </>
  )
}

export default React.memo(Header)
