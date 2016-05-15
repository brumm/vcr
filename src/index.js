import 'css/global'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

const ipcRenderer = window.require('electron').ipcRenderer

import App from 'components/App'
import configureStore from './redux/configureStore'
import { setWindowState } from 'redux/actions'

const store = configureStore()

ipcRenderer.on('window-blur', () => store.dispatch(
  setWindowState({ isFocused: false })
))
ipcRenderer.on('window-focus', () => store.dispatch(
  setWindowState({ isFocused: true })
))

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#app'))
