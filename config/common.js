/**
 * Common configuration items between front and backend
 */

// eslint-disable-next-line no-undef
const inProduction = process.env.NODE_ENV === 'production'

module.exports = {
  inProduction,
}
