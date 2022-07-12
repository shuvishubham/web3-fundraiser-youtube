import { ethers } from "ethers";
import React, { useContext, useState, useEffect } from "react";
import { CAMPAIGN_FACTORY_DETAILS } from "../constants/constants";
import AdminContext from "./adminContext";
import CampaignFactory from '../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
import CampaignAbi from '../artifacts/contracts/Campaign.sol/Campaign.json'
import Image from "next/image";
import { Button } from "@mui/material";



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
  const [imageString, setImageString] = useState('https://ipfs.infura.io/ipfs/QmdikPXpXRZkrhMghXoDjy9cTnj9QNyTUm3fvpLCKKPAVu')
  const [donation, setDonation] = useState()



   const contract = new ethers.Contract(
       newAddress,
        CampaignAbi.abi,
        newSigner
      );

 const handleInput = (e) => {
  const donatevalue = e.target.value;
  setDonation(donatevalue)
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setDonationAmount(donation)
 if (donationAmount !== undefined) {
  await contract.donate({value: ethers.utils.parseEther(donationAmount)})
 }
 
 }

 const onWithdrawHandler = async () => {
 console.log(await contract.withdraw(), withdraw)
 }
 
  useEffect(() => {
    const Request = async () => {
      const storyData = await contract.story()
      const imageData = await contract.image()
      var receivedAmountData = await contract.receivedAmount()
      const requiredAmountData =(await contract.receivedAmount()).toString()
      console.log((await contract.receivedAmount()).toString(), "received amt")
      const ethValue = ethers.utils.formatEther(requiredAmountData);


      setStory(storyData)
      setImage(imageData)
      setReceivedAmount(ethValue)
      setRequiredAmount(requiredAmountData)

      const imageUrl = `https://ipfs.infura.io/ipfs/${imageData}`
      console.log(imageUrl, 'imageurl')
      setImageString(imageUrl)

      if (allCampaigns) {
      (allCampaigns.map((e) => {
      if(e.address == newAddress) {
      setTitle(e.title)
      setOwner(e.owner)
      // setTimeStamp(e.timeStamp)
      setTimeStamp(new Date(e.timeStamp * 1000).toLocaleString(), 'date')
      setAmount(e.amount)
    }
   
  }))
}
const storyUrlString = `https://ipfs.infura.io/ipfs/${storyData}`
      console.log(contract, "contract")
      console.log(await contract.story(), "story")
     const storyIPFS = (fetch(storyUrlString).
      then(res => res.text())
      .then(data => setStory(data)))


     

      // console.log('IPFS', story)
      // console.log((await contract.requiredAmount()).toString(), "req amt")
      // console.log((await contract.donate({value: ethers.utils.parseEther("1")})), 'donate')

    //   const getAllCampaigns = contract.filters.campaignCreated(null, null, newAddress);
    //   const AllCampaigns = await contract.queryFilter(getAllCampaigns);
    //   const AllData = AllCampaigns.map((e) => {
    //   return {
    //     title: e.args.title,
    //     image: e.args.imgURI,
    //     owner: e.args.owner,
    //     timeStamp: parseInt(e.args.timestamp),
    //     amount: ethers.utils.formatEther(e.args.requiredAmount),
    //     address: e.args.campaignAddress
    //   }
    //   })  
    //   setCampaignsData(AllData)
    //   console.log('dashboard', campaignsData)
    }
    Request();
    }
 
, [])
    return (
        <>
        <div className="campaign-container">
          <div className="campaign-title">
            <div className="card">
              <div className="campaign-key">
                 Title
              </div>
              <div className="campaign-value">
                 {title}
              </div>
           </div>
         </div>
         <div className="campaign-title">
            <div className="card">
              <div className="campaign-key">
                 Description
              </div>
              <div className="campaign-value">
                 {story}
              </div>
           </div>
         </div>

         <div className="campaign-title">
            <div className="card">
              {/* <div className="campaign-key">
                 Description
              </div> */}
              <div className="campaign-value">
              <Image
                src={imageString}
                alt="crowdfunding dapp"
                layout="fill"
                className="campaign-image"
          />
              </div>
           </div>
         </div>

         <div className="campaign-title">
            <div className="card">
              <div className="campaign-key">
                 Created on
              </div>
              <div className="campaign-value">
                 {timeStamp}
              </div>
           </div>
         </div>

         <div className="campaign-title">
            <div className="card">
              <div className="campaign-key">
                 Required Amount 
              </div>
              <div className="campaign-value">
                 {amount} BB ETH
              </div>
           </div>
         </div>

         <div className="campaign-title">
            <div className="card">
              <div className="campaign-key">
                 Received Amount 
              </div>
              <div className="campaign-value">
                 {receivedAmount} BB ETH
              </div>
           </div>
         </div>

        

         <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="donatevalue">Donate</label>
            <input type="text" name="donation" id="donation" value={donation} onChange={handleInput} />

            <button type="submit">Donate</button>
          </div>
         </form>


         <button onClick={onWithdrawHandler}>Withdraw</button>


        </div>
        </>
    )
}

export default Campaign