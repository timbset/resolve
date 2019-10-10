import { parse } from 'url'

import nextApp from '../../client/app'

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

  const parsedUrl = parse(req.rootBasedPath, true)

  const request = {
    ...req,
    url: req.rootBasedPath,
    headers: {
      origin: 'localhost'
    },
    socket: {
      setKeepAlive() {}
    }
  }

  const response = {
    ...res,
    _implicitHeader() {},
    setHeader(key, value) {
      // TODO: fix it in resolve
      res.setHeader(key, value.toString())
    },
    writeHead(code, headers) {
      this.status(code)

      for (const key in headers) {
        this.setHeader(key, headers[key])
      }
    },
    write() {

    }
  }

  await handler(request, response, parsedUrl)
  // await nextApp.render(req, response, pagePath, {})
}
