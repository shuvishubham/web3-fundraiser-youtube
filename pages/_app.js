import Layout from '../components/layout/Layout';
import '../style/global.css'
import Metamask from '../components/layout/components/Metamask';

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <div><p>Hi Dipesh</p></div>
    <Metamask />
    {/* <Component {...pageProps} /> */}
  </Layout>
  )
}

export default MyApp
