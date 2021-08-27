import { LOADED_ROOMS, CREATE_ROOM, UPDATE_ROOM, DELETE_ROOM } from '../actions'
import { IAction, IRoom } from '../types'

export interface RoomState {
  rooms: Array<IRoom>
}

const initialState = {
  rooms: []
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOADED_ROOMS:
      return { ...state, rooms: action.payload }
    case CREATE_ROOM:
      return { ...state, rooms: [...state.rooms, action.payload] }
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: [
          ...state.rooms.filter((e) => e !== action.payload),
          action.payload
        ]
      }
    case DELETE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms.filter((e) => e !== action.payload)]
      }
    default:
      return { ...state }
  }
}

export default reducer
