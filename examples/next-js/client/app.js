import next from 'next'
import conf from './next.config'
import staticPath from '$resolve.staticPath'

export default next({
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname,
  conf: {
    ...conf,
    assetPrefix: staticPath
  }
})
