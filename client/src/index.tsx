import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core'
import { Authentication } from './components'

if (process.env.REACT_APP_MOCK) {
    const { worker } = require('./mocks/browser')
    worker.start()
}

ReactDOM.render(
    <Authentication>
        <Provider store={store}>
            <StylesProvider injectFirst>
                    <App />
            </StylesProvider>
        </Provider>
    </Authentication>,
    document.getElementById('root')
)
