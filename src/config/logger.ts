import { createLogger, format, transports } from 'winston'

export default createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'rcs-graphql' }
}).add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple())
  })
)
