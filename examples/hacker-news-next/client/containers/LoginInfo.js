import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Link from 'next/link'

import Splitter from '../components/Splitter'
import * as optimisticActions from '../actions/optimistic-actions'
import Form from './Form'

const StyledA = styled.a`
  color: white;
  pointer: cursor;

  &.active {
    font-weight: bold;
    text-decoration: underline;
  }
`

const PageAuth = styled.div`
  float: right;
`

const LoginInfo = ({ me }) => {
  const onLogout = useCallback(() => {
    document.getElementById('hidden-form-for-logout').submit()
  }, [])

  return (
    <PageAuth>
      {me && me.id ? (
        <div>
          <Link href={`/user/${me.id}`}>
            <StyledA>{me.name}</StyledA>
          </Link>
          <Splitter color="white"/>
          <Link href="/newest">
            <StyledA
              to="/newest"
              onClick={onLogout}
            >
              logout
            </StyledA>
          </Link>
          <Form method="post" id="hidden-form-for-logout" action="/api/logout">
            <input type="hidden" name="username" value="null"/>
            <input type="hidden"/>
          </Form>
        </div>
      ) : (
        <Link href="/login">
          <StyledA>login</StyledA>
        </Link>
      )}
    </PageAuth>
  )
}

export const mapStateToProps = state => ({
  me: state.jwt
})

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: optimisticActions.logout
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInfo)
