import { createStore, applyMiddleware, combineReducers } from 'redux'
import {
  createViewModelsReducer,
  createReadModelsReducer,
  createResolveMiddleware
} from 'resolve-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = require($resolve.redux.reducers) // eslint-disable-line
const middlewares = require($resolve.redux.middlewares) // eslint-disable-line
const setupStore = require($resolve.redux.store) // eslint-disable-line
const viewModels = require($resolve.viewModels) // eslint-disable-line
const readModels = require($resolve.readModels) // eslint-disable-line
const subscribeAdapter = require($resolve.subscribe.adapter) // eslint-disable-line

export default (initialState, history) => {
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
      viewModels: createViewModelsReducer(),
      readModels: createReadModelsReducer()
    }),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        createResolveMiddleware({ viewModels, readModels, subscribeAdapter }),
        ...middlewares
      )
    )
  )

  const isClient = typeof window === 'object'

  setupStore(store, middlewares, isClient)

  return store
}
