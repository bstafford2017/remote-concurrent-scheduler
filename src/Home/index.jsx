import React, { useCallback, useState } from 'react'
import Header from './Calendar/Header'
import Calendar from './Calendar'
import {
  format,
  eachDayOfInterval,
  addDays,
  subDays,
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  lastDayOfMonth,
  isSameMonth
} from 'date-fns'

const initialDates = () => {
  const today = new Date()
  return eachDayOfInterval({
    start: startOfWeek(today),
    end: lastDayOfWeek(today)
  })
}

const initialHeader = () => {
  return format(new Date(), 'MMMM') + ' ' + format(new Date(), 'yyyy')
}

const Home = () => {
  const [dates, setDates] = useState(initialDates())
  const [header, setHeader] = useState(initialHeader())

  const previousDays = useCallback(() => {
    const previousMinusOne = subDays(dates[0], 1)
    const previousMinusEight = subDays(dates[0], 7)
    const range = eachDayOfInterval({
      start: previousMinusEight,
      end: previousMinusOne
    })
    updateHeader(range)
    setDates(range)
  }, [dates])

  const nextDays = useCallback(() => {
    const nextPlusOne = addDays(dates[dates.length - 1], 1)
    const nextPlusEight = addDays(dates[dates.length - 1], 7)
    const range = eachDayOfInterval({
      start: nextPlusOne,
      end: nextPlusEight
    })
    updateHeader(range)
    setDates(range)
  }, [dates])

  const updateHeader = (range) => {
    const start = range[0]
    const end = range[range.length - 1]
    if (isSameMonth(start, end)) {
      setHeader(format(start, 'MMMM') + ' ' + format(start, 'yyyy'))
    } else {
      setHeader(
        format(start, 'MMMM') +
          '/' +
          format(end, 'MMMM') +
          ' ' +
          format(start, 'yyyy')
      )
    }
  }

  return (
    <>
      <Header header={header} previous={previousDays} next={nextDays} />
      <Calendar dates={dates} />
    </>
  )
}

export default Home
