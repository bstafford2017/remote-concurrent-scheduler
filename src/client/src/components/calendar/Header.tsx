import React from 'react'
import { connect } from 'react-redux'
import Banner from '../common/Banner'
import { Link, useLocation } from 'react-router-dom'
import {
  selectByMonth,
  setHeader,
  prevDates,
  nextDates
} from '../../actions/select'
import Filter from '../calendar/Filter'
import { Store } from '../../reducers'

interface IProps {
  selectByMonth: Function
  month: string
  byMonth: boolean
  prevDates: Function
  nextDates: Function
}

const Header = ({
  selectByMonth,
  month,
  byMonth,
  prevDates,
  nextDates
}: IProps) => {
  const location: any = useLocation()

  const handleByWeek = (e: React.FormEvent<HTMLInputElement>) => {
    selectByMonth(false)
  }

  const handleByMonth = (e: React.FormEvent<HTMLInputElement>) => {
    selectByMonth(true)
  }

  const previous = (e: React.MouseEvent) => {
    prevDates()
  }

  const next = (e: React.MouseEvent) => {
    nextDates()
  }

  return location.pathname === '/home' ? (
    <>
      <div className='navbar-header'>
        <Banner absolute />
        <div className='month'>
          <ul>
            <li id='month'>{month}</li>
            <li id='prev' className='change'>
              <Link to='#' onClick={previous}>
                &#10094;
              </Link>
            </li>
            <li style={{ fontSize: '17px' }}>
              <input
                id='by-week'
                type='radio'
                name='selector'
                value='week'
                checked={!byMonth}
                onClick={handleByWeek}
              />
              <label htmlFor='by-week'> By Week</label>
              <input
                id='by-month'
                type='radio'
                name='selector'
                value='month'
                checked={byMonth}
                onClick={handleByMonth}
              />
              <label htmlFor='by-month'> By Month</label>
            </li>
            <li id='next' className='change'>
              <Link to='#' onClick={next}>
                &#10095;
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {!byMonth && <Filter />}
    </>
  ) : (
    <div className='navbar-header'>
      <Banner />
    </div>
  )
}

const mapStateToProps = (state: Store) => ({
  month: state.select.month,
  byMonth: state.select.byMonth
})

const mapDispatchToProps = {
  selectByMonth,
  setHeader,
  prevDates,
  nextDates
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
