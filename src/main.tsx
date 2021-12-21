import React from 'react'
import ReactDOM from 'react-dom'

// MUI
import CssBaseLine from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'

import App from './App'
import globalStyles from './assets/styles/globalStyles'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseLine />
    <GlobalStyles styles={globalStyles} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
