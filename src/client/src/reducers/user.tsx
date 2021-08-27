import {
  LOADED_USER,
  LOADED_USERS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../actions'
import { IAction, IUser } from '../types'

export interface UserState {
  isAuthenticated: boolean
  isAdmin: boolean
  user: IUser
  users: Array<IUser>
}

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  users: []
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOADED_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAdmin: action.payload.user
      }
    case LOADED_USERS:
      return {
        ...state,
        users: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return { ...state }
  }
}
export default reducer
