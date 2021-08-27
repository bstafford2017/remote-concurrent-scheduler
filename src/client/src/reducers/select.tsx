import {
  SELECT_BUILDING,
  SELECT_ROOM,
  SELECT_BY_MONTH,
  SET_HEADER,
  NEXT_DATES,
  PREV_DATES
} from '../actions'
import { IAction } from '../types'
import {
  eachDayOfInterval,
  startOfMonth,
  lastDayOfMonth,
  startOfWeek,
  lastDayOfWeek,
  endOfWeek
} from 'date-fns'

export const generateDates = (state: any, next?: boolean) => {
  const listOfDates = state.listOfDates
  let today: Date =
    listOfDates.length === 0
      ? new Date()
      : next
      ? listOfDates[listOfDates.length - 1]
      : listOfDates[0]
  if (state.byMonth) {
    const start = startOfWeek(startOfMonth(today))
    const end = lastDayOfWeek(lastDayOfMonth(today))
    return eachDayOfInterval({
      start,
      end
    })
  } else {
    const start = startOfWeek(today)
    const end = endOfWeek(today)
    return eachDayOfInterval({
      start,
      end
    })
  }
}

export interface SelectState {
  building: string
  room: string
  byMonth: boolean
  month: string
  listOfDates: Array<Date>
}

const initialState = {
  building: '',
  room: '',
  byMonth: true,
  month: new Date().toLocaleString('default', { month: 'long' }),
  listOfDates: generateDates({
    byMonth: true,
    listOfDates: []
  })
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SELECT_BUILDING:
      return { ...state, building: action.payload }
    case SELECT_ROOM:
      return { ...state, room: action.payload }
    case SELECT_BY_MONTH:
      return { ...state, byMonth: action.payload }
    case SET_HEADER:
      return { ...state, month: action.payload }
    case NEXT_DATES:
      return { ...state, listOfDates: generateDates(state, true) }
    case PREV_DATES:
      return { ...state, listOfDates: generateDates(state, false) }
    default:
      return { ...state }
  }
}

export default reducer
