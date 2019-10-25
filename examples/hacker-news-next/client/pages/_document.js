import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static storedCss = null

  static storedInnerHtml = null

  static getInnerHtml(css) {
    if (this.storedCss !== css) {
      this.storedInnerHtml = {
        __html: css
      }

      this.storedCss = css
    }

    return this.storedInnerHtml
  }

  static getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    let pageContext

    const page = ctx.renderPage((Component) => {
      const WrappedComponent = (props) => {
        pageContext = props.pageContext
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...props} />
      }

      sheet.collectStyles(WrappedComponent)
      return WrappedComponent
    })

    let css

    if (pageContext) {
      css = pageContext.sheetsRegistry.toString()
    }

    return {
      ...page,
      pageContext,
      styles: (
        <>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={MyDocument.getInnerHtml(css)}
          />
          {sheet.getStyleElement()}
        </>
      ),
    }
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/static/favicons.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
