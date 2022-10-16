export function formatDate(date) {
  const unformatted = date.split('T')[0].split('-')
  return unformatted[1] + '-' + unformatted[2] + '-' + unformatted[0]
}

export function timeConversion(time) {
  const splitTime = time.split(':')
  const hours = splitTime[0]
  const minutes = splitTime[1]
  const AmOrPm = hours >= 12 ? 'pm' : 'am'
  const convertedHours = (hours % 12) + 1
  return convertedHours + ':' + minutes + AmOrPm
}

export function weekdaysToString(weekdays) {
  return weekdays.split('').reduce((total, next, index) => {
    return (total += getWeekDayString(index))
  })
}

function getWeekDayString(index) {
  switch (index) {
    case 0:
      return 'Sun '
    case 1:
      return 'Mon '
    case 2:
      return 'Tues '
    case 3:
      return 'Wed '
    case 4:
      return 'Thur '
    case 5:
      return 'Fri '
    case 6:
      return 'Sat '
    default:
      return ''
  }
}
