import { Server } from 'http'
import createSocketServer from 'socket.io'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' // eslint-disable-line

import serverSideRendering from './server_side_rendering'
import getRootableUrl from './get_rootable_url'
import startServer from './start_server'
import println from './println'

const staticDir = $resolve.staticDir
const distDir = $resolve.distDir

const app = express()
const server = new Server(app)

app.socketIO = createSocketServer(server, {
  path: getRootableUrl('/socket/'),
  serveClient: false
})

app.socketIO.on('connection', function(socket) {
  println('connection')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(getRootableUrl('/'), express.static(`${distDir}/client`))
app.use(getRootableUrl('/'), express.static(staticDir))

app.get([getRootableUrl('/'), getRootableUrl('/*')], serverSideRendering)

startServer(server)
