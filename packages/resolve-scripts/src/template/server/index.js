import { Server } from 'http'
import createSocketServer from 'socket.io'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' // eslint-disable-line

import serverSideRendering from './server_side_rendering'
import getRootableUrl from './get_rootable_url'
import eventStore from './event_store'

const rootPath = $resolve.rootPath // eslint-disable-line
const staticDir = $resolve.staticDir // eslint-disable-line
const distDir = $resolve.distDir // eslint-disable-line

const port = $resolve.port // eslint-disable-line
const host = $resolve.host // eslint-disable-line

console.log(`${rootPath}socket`)

const app = express()
const server = new Server(app)

app.socketIO = createSocketServer(server, {
  path: getRootableUrl('/socket/'),
  serveClient: false
})

app.socketIO.on('connection', function(socket) {
  console.log('connection')
})

server.listen(port, host, () => {
  console.log(port, host)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(getRootableUrl('/'), express.static(`${distDir}/client`))
app.use(getRootableUrl('/'), express.static(staticDir))

app.get([getRootableUrl('/'), getRootableUrl('/*')], serverSideRendering)
