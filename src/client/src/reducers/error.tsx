import { GET_ERRORS, CLEAR_ERRORS } from '../actions'
import { IAction } from '../types'

export interface ErrorState {
  msg: string | null
}

const initialState = {
  msg: null
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, msg: action.payload }
    case CLEAR_ERRORS:
      return {
        msg: null
      }
    default:
      return { ...state }
  }
}

export default reducer
