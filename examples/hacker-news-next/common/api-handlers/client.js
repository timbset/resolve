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

  // const assetPrefix = process.env.RESOLVE_CLOUD_STATIC_URL || '/static'
  // nextApp.setAssetPrefix('https://static.resolve.sh/z0aev2swzy1e8z3e23y8xpt4sl')

  await preparePromise

  const parsedUrl = parse(`https://z0aev2swzy1e8z3e23y8xpt4sl.resolve.sh/${req.matchedParams.page}`, true)

  const request = {
    ...req,
    url: req.matchedParams.page,
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

  Object.defineProperty(response, 'statusCode', {
    set: function(value) {
      this._statusCode = value
      this.status(value)
    },
    get: function() {
      return this._statusCode
    }
  })

  await handler(request, response, parsedUrl)
  // await nextApp.render(req, response, pagePath, {})
}
