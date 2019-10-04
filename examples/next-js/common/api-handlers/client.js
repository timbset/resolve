import path from 'path'
import fs from 'fs'

import nextApp from '../../client/app'

const nextStaticPath = path.join(__dirname, '../../client/.next')

let preparePromise = null
let handler = null

export default async (req, res) => {
  if (!preparePromise) {
    preparePromise = nextApp.prepare()
  }

  if (!handler) {
    handler = nextApp.getRequestHandler()
  }

  await preparePromise

  // console.log(req)
  // const parsedUrl = parse(req.url, true)

  // await handler(req, res, parsedUrl)

  let pagePath = req.rootBasedPath

  if (pagePath.indexOf('/_next') >= 0) {
    const staticFilePath = path.join(nextStaticPath, pagePath.replace('/_next', ''))
    fs.readFileSync(staticFilePath)
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
    res.end(fs.readFileSync(staticFilePath))
    return
  }

  if (pagePath === '/') {
    pagePath = '/index'
  }

  console.log('pagePath', pagePath, req)

  await nextApp.render(req, res, pagePath, {})
}
