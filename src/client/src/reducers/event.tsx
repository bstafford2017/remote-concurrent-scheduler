import {
  LOADED_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from '../actions'
import { IAction, IEvent } from '../types'

export interface EventState {
  events: Array<IEvent>
  dates: Array<Date>
}

const initialState = {
  events: [],
  dates: []
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOADED_EVENTS:
      return { ...state, events: action.payload }
    case CREATE_EVENT:
      return { ...state, events: [...state.events, action.payload] }
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((e) => e !== action.payload),
          action.payload
        ]
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((e) => e !== action.payload)]
      }
    default:
      return { ...state }
  }
}

export default reducer
