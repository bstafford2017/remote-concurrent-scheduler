import React from 'react'
import { connect } from 'react-redux'
import { IEvent } from '../../types'
import { Store } from '../../reducers'

interface IProps {
  event: IEvent
}

const Event = ({ event }: IProps) => {
  return !event ? null : <div className='month-event'>{event.title}</div>
}

const mapStateToProps = (state: Store) => ({
  byMonth: state.select.byMonth
})

export default connect(mapStateToProps, null)(Event)
