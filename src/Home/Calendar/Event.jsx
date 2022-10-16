import React, { useState } from 'react'
import { Tooltip } from 'reactstrap'
import styledComponents from 'styled-components'
import Button from '../../components/Button'

const ONE_HOUR_SPACING = 50

const StyledButtonWrapper = styledComponents.div`
  padding: 10px;
`

const ToolTipContainer = styledComponents.div`
  text-align: left;
  line-height: 0.25;
`

const ToolTipTitle = styledComponents.h3`
  padding-bottom: 5px;
`

const ToolTipText = styledComponents.p`
  padding-left: 3px;
`

const EventWrapper = styledComponents.div`
    font-size: 13px;
    background-color: ${(props) => (props.isActive ? '#126209' : '#009a44')};
    color: white;
    margin: 8px;
    padding: 5px;
    text-align: center;
    font-weight: 550;
    border-radius: 10px;
    height: ${(props) => ONE_HOUR_SPACING * props.timeDifference}px;
    margin-top: ${(props) => ONE_HOUR_SPACING * props.topDifference}px

    &:hover {
      border-color: #009a44;
    }
  `

const Event = ({ event, displayModal, openModal, setSelectedEvent }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleMouseEnter = () => {
    setTooltipOpen(true)
    setIsActive(true)
  }

  const handleMouseLeave = () => {
    setTooltipOpen(false)
    setIsActive(false)
  }

  const onEdit = () => {
    setSelectedEvent(event)
    openModal()
  }

  const {
    id,
    title,
    startTime,
    endTime,
    startDate,
    endDate,
    building,
    room,
    user
  } = event

  const timeDifference = endTime.split(':')[0] - startTime.split(':')[0]
  // Since we start at 6am
  const topDifference = startTime.split(':')[0] - 6

  const showToolTip = tooltipOpen && !displayModal

  return (
    <span>
      <div id={'Tooltip-' + id}>
        <EventWrapper
          isActive={isActive}
          timeDifference={timeDifference}
          topDifference={topDifference}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title}
          {isActive && (
            <StyledButtonWrapper>
              <Button onClick={onEdit} title='Edit' />
            </StyledButtonWrapper>
          )}
        </EventWrapper>
      </div>
      <Tooltip isOpen={showToolTip} placement='right' target={'Tooltip-' + id}>
        <ToolTipContainer>
          <ToolTipTitle>{title}</ToolTipTitle>
          <ToolTipText>Event Id: {id}</ToolTipText>
          <ToolTipText>Start time: {startTime}</ToolTipText>
          <ToolTipText>End time: {endTime}</ToolTipText>
          <ToolTipText>Start date: {startDate}</ToolTipText>
          <ToolTipText>End date: {endDate}</ToolTipText>
          <ToolTipText>Building: {building}</ToolTipText>
          <ToolTipText>Room: {room}</ToolTipText>
          <ToolTipText>Created by: {user}</ToolTipText>
        </ToolTipContainer>
      </Tooltip>
    </span>
  )
}

export default Event
