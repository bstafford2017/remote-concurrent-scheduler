import React from 'react'
import { formatDate, timeConversion, weekdaysToString } from '../utils'

const Result = ({ event }) => {
  const {
    id,
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    room,
    building,
    recur
  } = event

  return (
    <tr id={id}>
      <td>{title}</td>
      <td>{formatDate(startDate)}</td>
      <td>{timeConversion(startTime)}</td>
      <td>{timeConversion(endTime)}</td>
      <td>{building}</td>
      <td>{room}</td>
      {/* <td>{recur ? weekdaysToString(recur) : '-'}</td>
      <td>{recur ? formatDate(recurEnd) : '-'}</td> */}
      <td>-</td>
      <td>-</td>
      <td>-</td>
      {/* <td>{username}</td> */}
    </tr>
  )
}

export default Result
