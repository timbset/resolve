import React from 'react'
import { useRouter } from 'next/router'

import App from '../containers/App'
import UserById from '../containers/UserById'

export default () => {
  const router = useRouter()

  return (
    <App>
      <UserById userId={router.query.userId} />
    </App>
  )
}
