import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers from './reducers'
const loggerMiddleware = createLogger({ collapsed: true })
const rootReducer = combineReducers(reducers)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    )
  )

  window.store = store
  Object.defineProperty(window, 'state', {
    get() { return store.getState() }
  })

  return store
}
