import { createStore, applyMiddleware, combineReducers } from 'redux'
import {
  createViewModelsReducer,
  createReadModelsReducer,
  createResolveMiddleware
} from 'resolve-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from '$resolve/reducers'
import middlewares from '$resolve/middlewares'
import setupStore from '$resolve/store'
import viewModels from '$resolve/viewModels'
import readModels from '$resolve/readModels'
import subscribeAdapter from '$resolve/subscribeAdapter'

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
