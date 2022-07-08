import styled from "styled-components";
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json'
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Withdraw = async () => {
   try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Data.address, Campaign.abi, signer);
    const withdrawTx = await contract.withdraw({value: ethers.utils.parseEther()});
    await withdrawTx.wait();
   } catch (err) {
    console.log(err)
   }
    return (
        <div>

        </div>
    )
}

export default Withdraw