import { useContext } from 'react';
import Form from '../components/Form/Form';
import AdminContext from '../context/adminContext';




const Createcampaign = () => {
  const { newSigner, setNewSigner, newAddress, setNewAddress, allCampaigns, setAllCampaigns, connectAccount, setConnectAccount,  fetchChainId, setFetchChainId  } = useContext(AdminContext)
  return (
    <>
    {(connectAccount && fetchChainId.chainId == 8337) ?<Form /> : <p style={{fontFamily: 'Poppins', textAlign: 'center', paddingTop: '50px'}}>Please make sure that you are connected to wallet</p>}
    </>
  )
}

export default Createcampaign