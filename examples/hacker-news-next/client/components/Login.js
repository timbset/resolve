import React from 'react'
import { useRouter } from 'next/router'
import querystring from 'querystring'

import AuthForm from './AuthForm'

const Login = () => {
  const router = useRouter()

  return (
    <div>
      <AuthForm
        buttonText="login"
        action={`/api/login?${querystring.stringify(router.query)}`}
        title="Login"
      />
      <AuthForm
        buttonText="create account"
        action="/api/register"
        title="Create account"
      />
    </div>
  )
}

export default Login
