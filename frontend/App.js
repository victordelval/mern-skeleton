import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import MainRouter from './MainRouter'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#2196f3',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
    openTitle: indigo['400'],
    protectedTitle: pink['400'],
    type: 'light'
  }
})

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </BrowserRouter>
)


export default hot(module)(App)
