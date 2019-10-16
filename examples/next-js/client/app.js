import next from 'next'
import conf from './next.config'

export default next({
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname,
  conf
})
