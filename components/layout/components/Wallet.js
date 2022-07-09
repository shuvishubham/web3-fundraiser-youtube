import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";


const networks = {
  buildbear: {
    chainId: `0x${Number(8301).toString(16)}`,
    chainName: "BuildBear Bold Bohr 2aa906",
    nativeCurrency: {
      name: "BB ETH",
      symbol: "BB ETH",
      decimals: 18,
    },
    rpcUrls: ["https://backend.buildbear.io/node/bold-bohr-2aa906"],
    blockExplorerUrls: ["https://explorer.buildbear.io/"],
  },
};



const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");


  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["buildbear"],
          },
        ],
      });
    } 
    
 
      const account = provider.getSigner();
      console.log(account, 'acc')
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    
  };

  return (
    <ConnectWalletWrapper onClick={connectWallet}>
      {balance == '' ? <Balance></Balance> : <Balance>{balance.slice(0,4)} BB ETH</Balance> }
      {address == '' ? "" : <Address>{address.slice(0,6)}...{address.slice(39)}</Address>}
    </ConnectWalletWrapper>
  );
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