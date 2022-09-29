const info = (...params) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'test') {
    console.info(...params)
  }
}

const error = (...params) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  info,
  error,
}
