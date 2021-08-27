import React, { useState, useEffect } from 'react'
import { isSameMonth } from 'date-fns'
import { connect } from 'react-redux'
import Filter from './Filter'
import { loadEvents } from '../../actions/event'
import { IEvent } from '../../types'
import Event from './Event'
import MenuModal from './MenuModal'
import { setHeader } from '../../actions/select'
import { Store } from '../../reducers'

interface IProps {
  events: IEvent[]
  building: string
  room: string
  byMonth: boolean
  dates: Array<Date>
  loadEvents: Function
  setHeader: Function
}

const Table = ({ events, byMonth, dates, loadEvents, setHeader }: IProps) => {
  const [displayModal, setDisplayModal]: [boolean, Function] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const start = dates[0]
    const end = dates[dates.length - 1]
    setHeader(
      // Get middle date's month
      dates[Math.floor((dates.length - 1) / 2)].toLocaleString('default', {
        month: 'long'
      })
    )
    loadEvents(start.toISOString(), end.toISOString())
  }, [byMonth, dates])

  const printMonth = (d: Date) => (
    <div
      key={d.toISOString()}
      className={
        isSameMonth(d, dates[Math.floor((dates.length - 1) / 2)])
          ? 'valid'
          : 'invalid'
      }
      onClick={toggleModal}
    >
      {d.getDate()}
    </div>
  )

  const toggleModal = (e: React.MouseEvent) => {
    setDisplayModal(!displayModal)
    // setSelectedDate(e.target.)
  }

  const monthlyView = (
    <div className='month-by-month'>
      <div className='row'>
        {dates.filter((_, index) => index < 7).map((d) => printMonth(d))}
      </div>
      <div className='row'>
        {dates
          .filter((_, index) => index < 14 && index >= 7)
          .map((d) => printMonth(d))}
      </div>
      <div className='row'>
        {dates
          .filter((_, index) => index < 21 && index >= 14)
          .map((d) => printMonth(d))}
      </div>
      <div className='row'>
        {dates
          .filter((_, index) => index < 28 && index >= 21)
          .map((d) => printMonth(d))}
      </div>
      <div className='row'>
        {dates
          .filter((_, index) => index < 35 && index >= 28)
          .map((d) => printMonth(d))}
      </div>
      <div className='row'>
        {dates.filter((_, index) => index >= 35).map((d) => printMonth(d))}
      </div>
      {events.map((e: IEvent) => (
        <Event key={e.id} event={e} />
      ))}
    </div>
  )

  const weeklyView = (
    <div className='week-by-week'>
      <div className='row'>
        {dates
          .filter((_, index) => index < 7)
          .map((d: Date) => (
            <div className='valid' onClick={toggleModal}>
              {d.getDate()}
            </div>
          ))}
      </div>
      {events.map((e: IEvent) => (
        <Event key={e.id} event={e} />
      ))}
    </div>
  )

  return (
    <>
      <MenuModal
        display={displayModal}
        toggle={toggleModal}
        selectedDate={selectedDate}
      />
      <div className='calendar-table'>
        {!byMonth && (
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
        )}
        <div className='main-content'>
          <div className='header'>
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </div>
          {byMonth ? monthlyView : weeklyView}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: Store) => ({
  events: state.event.events,
  building: state.select.building,
  room: state.select.room,
  byMonth: state.select.byMonth,
  dates: state.select.listOfDates
})

const mapDispatchToProps = {
  loadEvents,
  setHeader
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
