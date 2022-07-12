import Layout from '../components/layout/Layout';
import '../style/global.css'
import Metamask from '../components/layout/components/Metamask';
import { useState } from 'react';
import AdminContext, { SignerProvider } from '../context/adminContext';



function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(true)
  return (
    <SignerProvider>
      <Layout>
         {connected &&   <Component {...pageProps} />}
      </Layout>
    </SignerProvider>
 
  )
}

export default MyApp
