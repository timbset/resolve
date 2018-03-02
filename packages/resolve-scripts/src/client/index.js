import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import routes from '$resolve.routes'
import reducers from '$resolve.reducers'
import middlewares from '$resolve.middlewares'
import Routes from './Routes'
import createStore from './create_store'

const history = cre
const store = createStore(window.__INITIAL_STATE__, )

render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.ROOT_PATH}>
      <Routes routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
