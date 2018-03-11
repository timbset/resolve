import { Server } from 'http'
import createSocketServer from 'socket.io'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' // eslint-disable-line

import serverSideRendering from './server_side_rendering'
import getRootableUrl from './get_rootable_url'
import startServer from './start_server'
import commandHandler from './command_handler'
import queryHandler from './query_handler'
import socketHandler from './socket_handler'

const staticDir = $resolve.staticDir
const distDir = $resolve.distDir
const jwt = $resolve.jwt

const app = express()
const server = new Server(app)

const socketIO = createSocketServer(server, {
  path: getRootableUrl('/socket/'),
  serveClient: false
})

socketIO.on('connection', socketHandler)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use((req, res, next) => {
  req.jwtToken =
    req.cookies && req.cookies[jwt.name] ? req.cookies[jwt.name] : null

  next()
})

app.use(getRootableUrl('/api/commands'), commandHandler)
app.use(getRootableUrl('/api/query/:modelName'), queryHandler)

app.use(getRootableUrl('/'), express.static(`${distDir}/client`))
app.use(getRootableUrl('/'), express.static(staticDir))

app.get([getRootableUrl('/'), getRootableUrl('/*')], serverSideRendering)

startServer(server)
