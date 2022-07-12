import { ethers } from "ethers";
import React, { useContext, useState, useEffect } from "react";
import { CAMPAIGN_FACTORY_DETAILS } from "../constants/constants";
import AdminContext from "../context/adminContext";
import CampaignFactory from '../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
import CampaignAbi from '../artifacts/contracts/Campaign.sol/Campaign.json'
import Image from "next/image";
import { Button } from "@mui/material";
import styled from 'styled-components';
import moment from "moment";
import { Modal, Box, Typography } from '@mui/material';

const Campaign = () => {
  const { newSigner, setNewSigner, newAddress, setNewAddress, allCampaigns, setAllCampaigns } = useContext(AdminContext)
  const [title, setTitle] = useState()
  const [image, setImage] = useState()
  const [owner, setOwner] = useState()
  const [timeStamp, setTimeStamp] = useState()
  const [amount, setAmount] = useState()
  const [story, setStory] = useState()
  const [requiredAmount, setRequiredAmount] = useState()
  const [receivedAmount, setReceivedAmount] = useState()
  const [donationAmount, setDonationAmount] = useState()
  const [imageString, setImageString] = useState('https:ipfs.infura.io/ipfs/QmdikPXpXRZkrhMghXoDjy9cTnj9QNyTUm3fvpLCKKPAVu')
  const [donation, setDonation] = useState()
const [fetchSigner, setFetchSigner] = useState()
const [buttonDisabled, setButtonDisabled] = useState();
const [canDonate, setCanDonate] = useState(true)
const [count, setCount] = useState(0)


 


const createCampaign = () => {
  if (newSigner != undefined || null) {
  //  const  address = "0x8ba1f109551bD432803012645Ac136ddd64DBA72"
  //  const signer = new ethers.VoidSigner(address, new ethers.providers.JsonRpcProvider('https://backend.buildbear.io/node/clever-williams-b356e4'))
  
    const contract = new ethers.Contract(
      newAddress,
       CampaignAbi.abi,
       newSigner
     );
     return contract
    // return null
  } else {
    console.log("Signer Not defined")
    return null;
  }
}



  const contract = createCampaign()

 const handleInput = (e) => {
  const donatevalue = e.target.value;
  setDonation(donatevalue)
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setDonationAmount(donation)
 if (donationAmount !== undefined) {
 try {
 const transaction = await contract.donate({value: ethers.utils.parseEther(donationAmount)})
 await transaction.wait()
  setCount(count + 1)
 } catch (err) {
  setCanDonate(false)
  DonationDisabled()
 }}

 }

const DonationDisabled = () => {
  window.alert('Cannot donate to the Campaign')
}
 const onWithdrawHandler = async () => {
 try {
  await contract.withdraw()
 } catch (err) {
  window.alert('You cannot withdraw this fund. Make sure that you are the owner of this campaign ')
 }
 }
 
 if (amount - requiredAmount == '0') {
  console.log('no donation accepted now')
 }
  useEffect(() => {
    try {
      const Request = async () => {
        const storyData = await contract.story()
        const imageData = await contract.image()
        var receivedAmountData = await contract.receivedAmount()
        const requiredAmountData =(await contract.receivedAmount()).toString()
        const ethValue = ethers.utils.formatEther(requiredAmountData);
  
  
        setStory(storyData)
        setImage(imageData)
        setReceivedAmount(ethValue)
        setRequiredAmount(requiredAmountData)
  
        const imageUrl = `https://ipfs.infura.io/ipfs/${imageData}`
        // console.log(imageUrl, 'imageurl')
        setImageString(imageUrl)
  
        if (allCampaigns) {
        (allCampaigns.map((e) => {
        if(e.address == newAddress) {
        setTitle(e.title)
        setOwner(e.owner)
        // setTimeStamp(e.timeStamp)
        const date = new Date(e.timeStamp * 1000).toLocaleString()
        setTimeStamp(moment(date).fromNow())
        setAmount(e.amount)
      }
     
    }))
  }

  
  const storyUrlString = `https://ipfs.infura.io/ipfs/${storyData}`
        // console.log(contract, "contract")
        console.log(await contract.story(), "story")
       const storyIPFS = (fetch(storyUrlString).
        then(res => res.text())
        .then(data => setStory(data)))
      }
      Request();
     
    } catch (err) {
      console.log(err)
    }
  }
 
, [count])
    return (
        <>
       {newSigner !== undefined ? <>
        <div className="campaign-container">
           <div className="campaign-title">
             <div className="card">
               <div className="campaign-value campaign-name" style={{marginBottom: '0px'}}>
                 <Text> {title}</Text>
               </div>
            </div>
          </div>
          <div className="campaign-title">
             <div className="card">
               <div className="campaign-value" style={{fontSize: '15px', marginBottom: '60px'}}>
                 <i> {story}</i>
               </div>
            </div>
          </div>

           {/* <div className="campaign-title">
              <div className="card">
                <div className="campaign-value" style={{marginBottom: '40px', fontSize: '20px'}}>
                <u>Created <span style={{fontSize: '20px'}}>{timeStamp}</span></u>
                </div>
             </div>
           </div> */}

           <div style={{display: 'flex', justifyContent: 'space-around', maxWidth: '900px', margin: 'auto'}}>
           <div className="campaign-title">
              <div className="card">
                <div className="campaign-key">
                <span style={{marginRight: '10px'}}>Required Fund</span>
                </div>
                <div className="campaign-value">
                  <Value> {amount} BB ETH</Value>
                </div>
             </div>
           </div>

           <div className="campaign-title">
              <div className="card">
                <div className="campaign-key">
                <span style={{marginRight: '10px'}}> Received Fund </span>
                </div>
                <div className="campaign-value">
                  <Value>{receivedAmount} BB ETH</Value>
                </div>
             </div>
           </div>

           </div>
        

          <form action="" onSubmit={handleSubmit}>
           <div style={{marginTop: '100px'}}>
            
             <input type="text" name="donation" placeholder="Enter donation amount" style={{padding: '15px 50px', fontSize: '15px', border: 'none', backgroundColor: '#e7e7e7', outline: 'none'}} id="donation" value={donation} onChange={handleInput} />

             <button type="submit" style={{padding: '15px', backgroundColor: '#08AEEA', border: 'none', cursor: 'pointer'}} buttonDisabled><b>Donate</b></button>
           </div>
          </form>

          <p style={{marginTop: '30px'}}>OR</p>


          <button style={{padding: '11px 20px', backgroundColor: '#08AEEA', border: 'none', marginTop: '30px', borderRadius: '8px', fontSize: '20px'}} onClick={onWithdrawHandler}>Withdraw</button>


         </div>
       </>: <><p>No signer found</p></>}
        </>
    )
}

export default Campaign

const Text = styled.p`

  background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };
  padding: 7px 16px;
  border-radius: 10px;
  font-size: 28px;

`
const Value = styled.p`

  background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };
  padding: 7px 16px;
  border-radius: 10px;
  margin-top: -10px;
`