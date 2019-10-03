const buildStatic = (req, path) => {
  const fullPath = `${req.resolve.staticPath}${path}`
  return /^https?:/.test(req.resolve.staticPath) ? fullPath : `/${fullPath}`
};

const controller = async (req, res) => {
  const html = [
    '<html>',
    '<head>',
    '<title>ReSolve Vanilla JS example</title>',
    `<link rel="shortcut icon" href="${buildStatic(req, '/favicon.ico')}">`,
    `<link rel="stylesheet" type="text/css" href="${buildStatic(req, '/bootstrap.min.css')}">`,
    `<link rel="stylesheet" type="text/css" href="${buildStatic(req, '/client.css')}">`,
    '</head>',
    '<body>',
    '<button id="button" class="btn btn-success">Change color</button>',
    `<script src="${buildStatic(req, '/client.js')}"></script>`,
    '</body>',
    '</html>'
  ].join('')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(html)
}

export default controller
