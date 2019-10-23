import React from 'react'
import { useRouter } from 'next/router'

import App from '../containers/App'
import CommentsByPage from '../containers/CommentsByPage'

export default () => {
  const router = useRouter()

  return (
    <App>
      <CommentsByPage page={router.query.page} />
    </App>
  )
}
