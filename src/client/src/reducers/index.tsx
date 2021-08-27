import { combineReducers } from 'redux'
import building, { BuildingState } from './building'
import room, { RoomState } from './room'
import user, { UserState } from './user'
import event, { EventState } from './event'
import search from './search'
import select, { SelectState } from './select'
import common, { CommonState } from './common'
import error, { ErrorState } from './error'

export interface Store {
  building: BuildingState
  room: RoomState
  user: UserState
  event: EventState
  search: any
  select: SelectState
  common: CommonState
  error: ErrorState
}

export default combineReducers({
  building,
  room,
  user,
  event,
  search,
  select,
  common,
  error
})
