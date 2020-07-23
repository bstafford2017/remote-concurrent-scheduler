import React, { useState, useEffect, useCallback } from 'react'
import { isAfter, isBefore, isSameDay, isSameMonth } from 'date-fns'
import { useHistory } from 'react-router'
import Event from './Event'
import styledComponents from 'styled-components'
import { getEvents } from '../../Http'
import Spinner from '../../components/Spinner'
import { Alert } from 'reactstrap'
import EditModal from '../EditModal'

/*
 * TODO: clean this up later.
 */
const tableRowStyle = {
  display: 'flex',
  margin: 0
}

const tableRowItemStyle = {
  flex: 1,
  height: '150px',
  padding: '5px',
  color: '#666'
}

const validTableRowItemStyle = {
  ...tableRowItemStyle,
  backgroundColor: '#eee'
}

const invalidTableRowItemStyle = {
  ...tableRowItemStyle,
  backgroundColor: '#ccc'
}

/**
 * TODO: Implement active date
 */
const activeTableRowItemStyle = {
  ...tableRowItemStyle,
  color: '#000',
  backgroundColor: '#009a431e',
  border: 'solid 1px #009a44',
  fontWeight: 'bold'
}

const TableRow = styledComponents.div`
  display: flex;
  margin: 0;
`

const WeeklyViewWrapper = styledComponents.div`
  height: 750px;
  font-size: 20px;
`

const WeekdayWrapper = styledComponents.div`
  flex: 1;
  background-color: #f3f3f3;
`

const Calendar = ({ dates }) => {
  const [displayModal, setDisplayModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(new Date())
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getEvents()
        const { data } = response
        const { events = [] } = data
        setIsLoading(false)
        setEvents(events)
      } catch (e) {
        setErrors('Failed to load events')
        setIsLoading(false)
      }
    })()
  }, [])

  const closeModal = useCallback(() => {
    setDisplayModal(false)
  }, [])

  const openModal = useCallback(() => {
    setDisplayModal(true)
  }, [])

  return (
    <>
      {isLoading && <Spinner />}
      <Alert color='danger' isOpen={!!errors} toggle={() => setErrors('')}>
        {errors}
      </Alert>
      {displayModal && (
        <EditModal close={closeModal} selectedEvent={selectedEvent} />
      )}
      <div className='calendar-table'>
        <div className='scale'>
          <div>6a</div>
          <div>7a</div>
          <div>8a</div>
          <div>9a</div>
          <div>10a</div>
          <div>11a</div>
          <div>12p</div>
          <div>1p</div>
          <div>2p</div>
          <div>3p</div>
          <div>4p</div>
          <div>5p</div>
          <div>6p</div>
          <div>7p</div>
        </div>
        <WeekdayWrapper>
          <div className='header'>
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </div>
          <WeeklyViewWrapper>
            <TableRow>
              {dates
                .filter((_, index) => index < 7)
                .map((d) => (
                  <div
                    key={d.getDate()}
                    className='valid'
                    style={{ ...validTableRowItemStyle, height: '794px' }}
                    // onClick={triggerModal}
                  >
                    {d.getDate()}
                    {events.map((e) =>
                      isSameDay(d, new Date(e.startDate)) ? (
                        <Event
                          key={e.id}
                          event={e}
                          displayModal={displayModal}
                          openModal={openModal}
                          setSelectedEvent={setSelectedEvent}
                        />
                      ) : null
                    )}
                  </div>
                ))}
            </TableRow>
          </WeeklyViewWrapper>
        </WeekdayWrapper>
      </div>
    </>
  )
}

export default Calendar
