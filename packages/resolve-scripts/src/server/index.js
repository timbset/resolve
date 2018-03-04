import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' // eslint-disable-line
import createHistory from 'history/createMemoryHistory'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import Routes from '../client/Routes'
import createStore from '../client/create_store'

const routes = require($resolve.routes) // eslint-disable-line
const rootPath = $resolve.rootPath // eslint-disable-line
const staticDir = $resolve.staticDir // eslint-disable-line
const distDir = $resolve.distDir // eslint-disable-line

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(rootPath, express.static(staticDir))
app.use(rootPath, express.static(`${distDir}/client`))

app.get([rootPath, `${rootPath}*`], (req, res) => {
  const url = req.params[0] || ''

  const history = createHistory()

  history.push(url)

  const store = createStore({}, history)

  const markup = ReactDOM.renderToStaticMarkup(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes routes={routes} />
      </ConnectedRouter>
    </Provider>
  )

  res.send(markup)
})

app.listen(3000)
