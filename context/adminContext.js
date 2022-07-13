import { useState, createContext, useContext } from "react";

const AdminContext = createContext();

export const SignerProvider = (props) => {
  //this will be the Admin object that will store all data
  const [newSigner, setNewSigner] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [connectAccount, setConnectAccount] = useState(false)
  const [fetchChainId, setFetchChainId] = useState(null)

  return (
    <AdminContext.Provider value={{ newSigner, setNewSigner , newAddress, setNewAddress, allCampaigns, setAllCampaigns, connectAccount, setConnectAccount, fetchChainId, setFetchChainId }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;