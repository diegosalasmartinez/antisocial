import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import appTheme from './theme/appTheme'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './services/redux/store'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      <Provider store={store}>
        <PersistGate loaging={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
