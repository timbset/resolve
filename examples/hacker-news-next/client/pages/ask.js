import React from 'react'
import { useRouter } from 'next/router'

import App from '../containers/App'
import AskByPage from '../containers/AskByPage'

export default () => {
  const router = useRouter()

  return (
    <App>
      <AskByPage page={router.query.page} />
    </App>
  )
}
