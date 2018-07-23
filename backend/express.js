import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'

import config from './../config/config'

import Template from './../template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// modules for server side rendering ----------
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../frontend/MainRouter'
import { StaticRouter } from 'react-router-dom'

// import { SheetsRegistry } from 'react-jss/lib/jss'
import { JssProvider, SheetsRegistry } from 'react-jss'
// import SheetsRegistry from 'react-jss'
// import JssProvider from 'react-jss'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'
// end ----------------------------------------


// Attention! ---------------------------------
// Comment out before building for production!!
import devBundle from './devBundle'
// end ----------------------------------------


const app = express()


// Attention! ---------------------------------
//comment out before building for production
devBundle.compile(app)
// --------------------------------------------


const CURRENT_WORKING_DIR = process.cwd()

// if (process.env.NODE_ENV !== 'test') {
if (config.env !== 'test') {
  app.use(logger('combined'))
}

// TODO
// import { config } from 'dotenv'
// app.disable('x-powered-by')
// app.set('env', SETTINGS.parsed.ENV)
// app.set('config', SETTINGS.parsed)
// app.locals.env = app.get('env')
// app.locals.config = app.get('config')

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// serve static files (CSS files, images, or the
// bundled client-side JS) from the dist/ folder
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

// app.get('/', (req, res) => {
//   res.status(200).send(Template())
// })

app.get('*', (req, res) => {
  // Preparing Material-UI styles for SSR
  const sheetsRegistry = new SheetsRegistry()
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
    },
  })
  const generateClassName = createGenerateClassName()

  // Generating markup
  const context = {}
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <MainRouter />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  )
  if (context.url) {
    return res.redirect(303, context.url)
  }
  const css = sheetsRegistry.toString()
  res.status(200).send(Template({
    markup: markup,
    css: css
  }))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  }
})

export default app
