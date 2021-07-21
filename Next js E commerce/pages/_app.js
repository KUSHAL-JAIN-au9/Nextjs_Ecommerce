import '../styles/globals.css'
import Layout from '../components/Layout'
import { DataProvider } from '../store/GlobalState'
import { Provider } from 'react-redux'

import store from "../redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Provider store={store} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </Provider>
    </DataProvider>
  )
}

export default MyApp
