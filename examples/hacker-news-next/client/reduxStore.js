import { createStore } from 'redux'

import optimisticReducer from './reducers/optimistic'

export default createStore(optimisticReducer)
