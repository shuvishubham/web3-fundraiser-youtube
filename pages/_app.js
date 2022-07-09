import Layout from '../components/layout/Layout';
import '../style/global.css'
import Metamask from '../components/layout/components/Metamask';
import { useState } from 'react';



function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(true)
  return (
  <Layout>
    {/* <Metamask /> */}
    {connected &&   <Component {...pageProps} />}
  
  </Layout>
  )
}

export default MyApp
