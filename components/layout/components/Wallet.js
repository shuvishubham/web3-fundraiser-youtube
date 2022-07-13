import styled from "styled-components";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import AdminContext from "../../../context/adminContext";



const Wallet = () => {
 
  const { connectAccount, setConnectAccount, newSigner, setNewSigner  } = useContext(AdminContext);
    
 return (
  <>
  {/* {connectAccount && <>
    <ConnectWalletWrapper>
  <Balance>{balance.slice(0,4)} BB ETH</Balance> }
   <Address>{address.slice(0,6)}...{address.slice(39)}</Address>
</ConnectWalletWrapper>
  </>} */}
  </>
 )

  
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Poppins';
  font-weight: normal;
  font-size: 10px;
  cursor: pointer;
`;

const Address = styled.h2`
    background-color: ${(props) => props.theme.bgSubDiv};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
`

const Balance = styled.h2`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`

export default Wallet;