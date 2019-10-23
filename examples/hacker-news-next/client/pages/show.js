import React from 'react'
import { useRouter } from 'next/router'

import App from '../containers/App'
import ShowByPage from '../containers/ShowByPage'

export default () => {
  const router = useRouter()

  return (
    <App>
      <ShowByPage page={router.query.page} />
    </App>
  )
}
