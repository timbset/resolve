import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import Link from 'next/link'

import reduxStore from '../reduxStore'
import Splitter from '../components/Splitter'
import Header from './Header'
import LoginInfo from './LoginInfo'
import Image from './Image'
import Search from './Search'

const ContentRoot = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 8px auto;
  color: #000;
  background-color: #f5f5f5;
  font-size: 10pt;
  font-family: Verdana, Geneva, sans-serif;

  @media only screen and (max-width: 750px) and (min-width: 300px) {
    width: 100%;
    margin: 0px auto;
  }
`

const PageHeader = styled.div`
  color: #fff;
  background-color: #3949ab;
  padding: 6px;
  line-height: 18px;
  vertical-align: middle;
  position: relative;
`

const StyledA = styled.a`
  color: white;

  &.active {
    font-weight: bold;
    text-decoration: underline;
  }
`

const PageTitle = styled.div`
  display: inline-block;
  font-weight: bold;
  color: #fff;
  margin-left: 0.25em;
  margin-right: 0.75em;

  @media only screen and (max-width: 750px) and (min-width: 300px) {
    display: none;
  }
`

const Content = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding: 1em;
`

const Footer = styled.div`
  margin-top: 1em;
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 6px 0;
`

const FooterLink = styled.a`
  color: #333;
  text-decoration: underline;
`

const App = ({ children }) => (
  <Provider store={reduxStore}>
    <div>
      <Header
        title="reSolve Hacker News"
        favicon="/favicon.ico"
        css={['/style.css']}
      />
      <ContentRoot>
        <PageHeader>
          <Link href="/">
            <StyledA to="/">
              <Image src="/reSolve-logo.svg" width="18" height="18" alt="" />
            </StyledA>
          </Link>
          <Link href="/newest">
            <StyledA>
              <PageTitle>reSolve HN</PageTitle>
            </StyledA>
          </Link>
          {' '}
          <Link href="/newest">
            <StyledA>new</StyledA>
          </Link>
          <Splitter color="white" />
          <Link href="/comments">
            <StyledA>comments</StyledA>
          </Link>
          <Splitter color="white" />
          <Link href="/show">
            <StyledA>show</StyledA>
          </Link>
          <Splitter color="white" />
          <Link href="/ask">
            <StyledA>ask</StyledA>
          </Link>
          <Splitter color="white" />
          <Link href="/submit">
            <a>submit</a>
          </Link>
          <LoginInfo />
          <Search />
        </PageHeader>
        <Content>{children}</Content>

        <Footer>
          <FooterLink href="https://github.com/reimagined/resolve">
            reimagined/resolve
          </FooterLink>
        </Footer>
      </ContentRoot>
    </div>
  </Provider>
)

export default App
