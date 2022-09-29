/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transformIgnorePatterns: [
    'node_modules/(?!(p-retry)/)',
    'client/components/Blog.test.js',
  ],
}

module.exports = config
