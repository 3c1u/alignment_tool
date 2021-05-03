import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import createStore from './store'

const root = document.getElementById('root')
const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
)
