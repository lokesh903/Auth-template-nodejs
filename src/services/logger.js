const { createLogger, format, transports } = require('winston');

// Custom format to print objects in a readable way
const customFormat = format.printf(({ timestamp, level, message, ...meta }) => {
  let logMessage = `${timestamp} [${level}]: ${message}`;
  if (meta && Object.keys(meta).length > 0) {
    logMessage += ` | Meta: ${JSON.stringify(meta, null, 2)}`; // Pretty-print the meta object
  }
  return logMessage;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      format.splat(),
      customFormat 
    ),
  }));
}

// Example: logger.info('User data', { userId: 123, name: 'John Doe' });
// This will log a structured message with the object details

module.exports = logger;
