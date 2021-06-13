import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { StylesProvider } from '@material-ui/core'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Authentication } from './components'

const persistor = persistStore(store)

if (process.env.REACT_APP_MOCK) {
    const { worker } = require('./mocks/browser')
    worker.start()
}

ReactDOM.render(
    <Authentication>
        <Provider store={store}>
            <StylesProvider injectFirst>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </StylesProvider>
        </Provider>
    </Authentication>,
    document.getElementById('root')
)
