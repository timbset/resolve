import React from 'react'
import { useRouter } from 'next/router'

import App from '../containers/App'
import NewestByPage from '../containers/NewestByPage'

export default () => {
  const router = useRouter()

  return (
    <App>
      <NewestByPage page={router.query.page} />
    </App>
  )
}
