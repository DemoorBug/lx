import App from 'next/app'
import Layout from '../components/Layout.js'
import { Provider } from 'react-redux'
import withHoc from '../lib/with-redux.js'

function MyApp(ctx) {
  const { Component, pageProps, reduxStore } = ctx
  return (
      <Layout>
        <Provider store={reduxStore }>
          <Component {...pageProps} />
        </Provider>
      </Layout>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (ctx) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const { Component } = ctx
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps =  await Component.getInitialProps(ctx);
  }
  // const appProps = await App.getInitialProps(appContext);

  // return { ...appProps }
  return {
    pageProps
  }
}

export default withHoc(MyApp)
