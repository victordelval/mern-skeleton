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

// Attention! ---------------------------------
// Comment out before building for production!!
import devBundle from './devBundle'
// --------------------------------------------

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

app.get('/', (req, res) => {
  res.status(200).send(Template())
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

export default app
