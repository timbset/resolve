import express from 'express'
import createHistory from 'history/createMemoryHistory'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import Routes from '../client/Routes'
import createStore from '../client/create_store'

const routes = require($resolve.routes) // eslint-disable-line
const rootPath = $resolve.rootPath // eslint-disable-line

const app = express()

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
