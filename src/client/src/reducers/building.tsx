import {
  LOADED_BUILDINGS,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING
} from '../actions'
import { IAction, IBuilding } from '../types'

export interface BuildingState {
  buildings: Array<IBuilding>
}

const initialState = {
  buildings: []
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOADED_BUILDINGS:
      return { ...state, buildings: action.payload }
    case CREATE_BUILDING:
      return { ...state, buildings: [...state.buildings, action.payload] }
    case UPDATE_BUILDING:
      return {
        ...state,
        buildings: [
          ...state.buildings.filter((e) => e !== action.payload),
          action.payload
        ]
      }
    case DELETE_BUILDING:
      return {
        ...state,
        buildings: [...state.buildings.filter((e) => e !== action.payload)]
      }
    default:
      return { ...state }
  }
}

export default reducer
