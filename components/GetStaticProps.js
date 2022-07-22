
  import styled from 'styled-components';
  import FilterAltIcon from '@mui/icons-material/FilterAlt';
  import AccountBoxIcon from '@mui/icons-material/AccountBox';
  import Image from 'next/image';
  import { ethers } from 'ethers';
  import CampaignFactory from '../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
  import { useState, useRef, useEffect, useContext } from 'react';
  import Link from 'next/link'
  import Web3Modal from 'web3modal'
  import { providers } from "ethers";
  import { CAMPAIGN_FACTORY_DETAILS } from '../constants/constants';
import AdminContext from '../context/adminContext';
  

 export const GetProps = (props) => {
  const { newSigner, setNewSigner, newAddress, setNewAddress } = useContext(AdminContext)

  const [CampaignData, setCampaignData] = useState()
  const [fetchCampaign, setFetchCampaign] = useState()
  const [haveCampaign, setHaveCampaign] = useState(false)
const [address, setAddress] = useState()
const [title, setTitle] = useState()
const [campaign, setCampaign] = useState(false)
const [owner, setOwner] = useState(false)
const [timeStamp, setTimeStamp] = useState(false)
const [amount, setAmount] = useState(false)
const [addr, setAddr] = useState(false)
const [deadline, setDeadline] = useState()
 
 
    async function campaignProps () {
  
            const camaignFactorycontract = new ethers.Contract(
                CAMPAIGN_FACTORY_DETAILS.address,
                CampaignFactory.abi,
                newSigner
              );
           
              const getAllCampaigns = camaignFactorycontract.filters.campaignCreated();
              const AllCampaigns = await camaignFactorycontract.queryFilter(getAllCampaigns);
              setCampaign(true)
              const AllData = AllCampaigns.map((e) => {
               if (e.address == newAddress) {
                setAddress(e.args.campaignAddress)
                setTitle(e.args.title)
                setOwner(e.args.owner)
                setTimeStamp(e.args.timeStamp)
                setAmount(e.args.amount)
                setAddr(e.args.address)
                setDeadline((e.args.deadline).toString())
               }
            const deadlineToString = (e.args.deadline).toString()
                    return {  
                      title: e.args.title,
                      image: e.args.imgURI,
                      owner: e.args.owner,
                      timeStamp: parseInt(e.args.timestamp),
                      amount: ethers.utils.formatEther(e.args.requiredAmount),
                      address: e.args.campaignAddress,
                      deadline: deadlineToString

                    }
                  });
              setCampaignData(AllData)
              setFetchCampaign(AllData)
              setHaveCampaign(true)   
     
    }
    campaignProps()

    // const renderCampaign = (address, title, owner, timeStamp, amount, addr) => {
    //   if (campaign) {
    //  return(
    //   <>
    //   <p>New Campaign</p>
    //   <p>{address} </p>
    //   <p>{title} </p>
    //   <p>{owner} </p>
    //   <p>{timeStamp} </p>
    //   <p>{amount} </p>
    //   <p>{addr} </p>
    //  </>
    //  )
    //   }
    // }


const sendCampaign = async () => {
   props.getAllData(fetchCampaign)
}
 

useEffect(() => {
sendCampaign()
}, [haveCampaign])


    return (
      <>
      {/* {renderCampaign(address, title, owner, timeStamp, amount, addr)} */}

      {/* <button onClick={() => {
        props.getAllData(fetchCampaign)
      }}>print</button> */}
      {/* {()=> props.getAllData(fetchCampaign)()} */}
      </>
    )
  }

// const campaigns = await camaignFactorycontract.deployedCampaigns();
// console.log(campaigns);
 //   } 
 //   getStaticProps()
    //TODO: this will be an array of address 
  // once you get all the campaigns
  // for each element of the campaign
  // get the boolean value of acceptingDonation
  // if acceptingDonation --> then it should show in the mainpage

//   const getAllCampaigns = contract.filters.campaignCreated();
//   const AllCampaigns = await contract.queryFilter(getAllCampaigns);
//   const AllData = AllCampaigns.map((e) => {
//     return {
//       title: e.args.title,
//       image: e.args.imgURI,
//       owner: e.args.owner,
//       timeStamp: parseInt(e.args.timestamp),
//       amount: ethers.utils.formatEther(e.args.requiredAmount),
//       address: e.args.campaignAddress
//     }
//   });

//   const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
//   const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
//   const HealthData = HealthCampaigns.map((e) => {
//     return {
//       title: e.args.title,
//       image: e.args.imgURI,
//       owner: e.args.owner,
//       timeStamp: parseInt(e.args.timestamp),
//       amount: ethers.utils.formatEther(e.args.requiredAmount),
//       address: e.args.campaignAddress
//     }
//   });

//   const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
//   const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
//   const EducationData = EducationCampaigns.map((e) => {
//     return {
//       title: e.args.title,
//       image: e.args.imgURI,
//       owner: e.args.owner,
//       timeStamp: parseInt(e.args.timestamp),
//       amount: ethers.utils.formatEther(e.args.requiredAmount),
//       address: e.args.campaignAddress
//     }
//   });

//   const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
//   const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
//   const AnimalData = AnimalCampaigns.map((e) => {
//     return {
//       title: e.args.title,
//       image: e.args.imgURI,
//       owner: e.args.owner,
//       timeStamp: parseInt(e.args.timestamp),
//       amount: ethers.utils.formatEther(e.args.requiredAmount),
//       address: e.args.campaignAddress
//     }
//   });

//   return {
//     props: {
//       AllData,
//       HealthData,
//       EducationData,
//       AnimalData
//     }
//   }
// }
// const HomeWrapper = styled.div`
//   display: flex;
//   overflow-x: hidden;
//   flex-direction: row;
//   justify-content: space-around;
//   flex-flow: nowrap;
//   align-items: center;
// `
// const FilterWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   width: 80%;
//   margin-top: 15px;
//   margin-left:480px;

// `
// const Category = styled.div`
//   padding: 10px 15px;
//   background-color: ${(props) => props.theme.bgDiv};
//   border-radius:10px;
//   margin: 0px 15px;
//   font-family: 'Roboto';
//   font-size:20px;
//   letter-spacing:2px;
//   cursor: pointer;
//   &:hover{
//     transform: translateY(-10px);
//     transition: transform 0.5s;
//   }
  
//   &:not(:hover){
//     transition: transform 0.5s;
//   }
// `
// const CardsWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   margin:30px;
//   width: 100%;
//   margin-left: 100px;
//   margin-right: 100px;
//   margin-top: 50px;
//   border-radius: 16px;
// `
// const Card = styled.div`
//   width: 25%;
//   max-width: 400px;
//   margin-top: 60px;
//   border: 10px solid #f0f0f0;
//   border-radius: '25px';
//   background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };

//   &:hover{
//     transform: translateY(-10px);
//     transition: transform 0.5s;
//   }
  
//   &:not(:hover){
//     transition: transform 0.5s;
//   }
// `
// const CardImg = styled.div`
//   position: relative;
//   border-radius:"30px";
//   height: 180px;
//   width: 100%;
// `
// const Title = styled.h2`
//   font-family: 'Roboto';
//   font-size: 18px;
//   letter-spacing:2px;
//   margin: 2px 0px;
//   background-color: ${(props) => props.theme.bgSubDiv};
//   padding: 5px;
//   cursor: pointer;
//   text-align:center;
//   font-weight: bold;
// `
// const CardData = styled.div`

//   display: flex;
//   justify-content: space-between;
//   margin: 2px 10px;
//   font-family: 'Poppins'
//   background-color: ${(props) => props.theme.bgSubDiv};
//   padding: 5px;
//   cursor: pointer;

//   `
// const Text = styled.p`
//   display: flex;
//   font-family: 'Poppins';
//   align-items: center;
//   margin: 0;
//   padding: 0;
//   font-size: 15px;
//   height: 60px;
//   background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };

// `
// const Button = styled.button`
//   padding: 8px;
//   text-align: center;
//   width: 100%;
//   border:none;
//   cursor: pointer;
//   letter-spacing:2px;
//   font-family: 'Poppins';
//   font-size: 18px;
//   background-color: ${(props) => props.theme.bgSubDiv};
//   font-weight: bold;
  
// `