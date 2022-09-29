const { inProduction } = require('./config/common')
//const http = require("http")
const config = require('./server/utils/config')
const app = require('./server/app')
const express = require('express')
const path = require('path')

const logger = require('./server/utils/logger')

if (!inProduction) {
  /* eslint-disable */
  const webpack = require('webpack')
  const middleware = require('webpack-dev-middleware')
  const hotMiddleware = require('webpack-hot-middleware')
  const webpackConf = require('./webpack.config')
  /* eslint-enable */
  const compiler = webpack(webpackConf('development', { mode: 'development' }))

  const devMiddleware = middleware(compiler)
  app.use(devMiddleware)
  app.use(hotMiddleware(compiler))
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err)
        res.set('content-type', 'text/html')
        res.send(result)
        return res.end()
      })
    })
  })
  console.log('App is in development mode.')
  // eslint-disable-next-line no-undef
  console.log(`NODE_ENV is ${process.env.NODE_ENV}`)
} else {
  console.log('App is in production mode.')
  // eslint-disable-next-line no-undef
  const DIST_PATH = path.resolve(__dirname, './dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')
  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
