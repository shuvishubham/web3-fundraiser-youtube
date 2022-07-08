import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'
import Web3Modal from 'web3modal'
import { providers } from "ethers";
import { FACTORY_ADDRESS } from '../constants/constants';

export default function Index({AllData, HealthData, EducationData,AnimalData}) {
  const [filter, setFilter] = useState(AllData);
  const [connected, setConnected] = useState(false)
  const [connectToWallet, setConnectedWallet] = useState(false)

  const providerOptions= {
    walletconnect: {
        options: {
            rpc: {
                8301: 'https://backend.buildbear.io/node/bold-bohr-2aa906'
            },
            chainId: 8301
        }
    }
}
// const Web3ModalRef = useRef();
// const getSignerorProvider = async (needSigner = false) => {
//     const provider = await Web3ModalRef.current.connect();
//     const Web3Provider = new providers.Web3Provider(provider);
//     const {chainId} = await Web3Provider.getNetwork();
//     if (chainId !== 8301) {
//         alert('Use BuildBear Network')
//         throw new Error('Change network to BuildBear');
//     }
//     if (needSigner) {
//         const signer = Web3Provider.getSigner();
//         console.log(signer, 'signer')
//         return signer;
//     }
//     return provider;
// }

const connectWallet = async () => {
   try {
    await getSignerorProvider();
    
    setConnectedWallet(true)
    setConnected(true)
   } catch (err) {
    console.log(err)
   }
}

// useEffect(() => {
//     Web3ModalRef.current = new Web3Modal({
//         network: 'buildbear',
//         providerOptions,
        
//     })

// }, [])

  return (
    <div></div>
    // <div>
    //   {connected?
    // <HomeWrapper className='mwrap'>

    //   {/* Filter Section */}
    

    //   {/* Cards Container */}
    //   <CardsWrapper className='wrap'>

    //   {/* Card */}
    //   {filter === undefined && <p>No campaign is created yet! Create one with Build Bear!</p>}

    //   {filter !== undefined && filter.map((e) => {
    //     return (
    //       <Card key={e.title}>
    //       <CardImg>
    //         <Image 
    //           alt="Crowdfunding dapp"
    //           layout='fill' 
    //           src={"https://ipfs.infura.io/ipfs/" + e.image} 
    //         />
    //       </CardImg>
    //       <Title>
    //         {e.title}
    //       </Title>
    //       <CardData>
    //         <Text>Owner</Text> 
    //         <Text>{e.owner.slice(0,9)}...{e.owner.slice(39)}</Text>
    //       </CardData>
    //       <CardData>
    //         <Text >Amount</Text> 
    //         <Text>{e.amount} BB ETH</Text>
    //       </CardData>
         
    //       <Link passHref href={'/' + e.address} ><Button>
    //         Go to Campaign
    //       </Button></Link>
    //     </Card>
    //     )
    //   })}
    //     {/* Card */}

    //   </CardsWrapper>
    // </HomeWrapper> : <button style={{alignItems: 'center', justifyContent: 'center', marginLeft: '44%', marginTop: '20%', border: 'none', backgroundColor: '#d0d0d0', padding: '16px 27px' , borderRadius: '10px', fontSize: '25px', cursor: 'pointer'}} onClick={connectWallet}>Connect to Wallet</button>}
    // </div>
  )
}



// export async function getStaticProps() {
//   const provider = new ethers.providers.JsonRpcProvider(
//     process.env.NEXT_PUBLIC_RPC_URL
//   );

//   const contract = new ethers.Contract(
//     FACTORY_ADDRESS,
//     CampaignFactory.abi,
//     provider
//   );

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
const HomeWrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: nowrap;
  align-items: center;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
  margin-left:480px;

`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  border-radius:10px;
  margin: 0px 15px;
  font-family: 'Roboto';
  font-size:20px;
  letter-spacing:2px;
  cursor: pointer;
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin:30px;
  width: 100%;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 50px;
  border-radius: 16px;
`
const Card = styled.div`
  width: 25%;
  max-width: 400px;
  margin-top: 60px;
  border: 10px solid #f0f0f0;
  border-radius: '25px';
  background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  border-radius:"30px";
  height: 180px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  letter-spacing:2px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  text-align:center;
  font-weight: bold;
`
const CardData = styled.div`

  display: flex;
  justify-content: space-between;
  margin: 2px 10px;
  font-family: 'Poppins'
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;

  `
const Text = styled.p`
  display: flex;
  font-family: 'Poppins';
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 15px;
  height: 60px;
  background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };

`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  border:none;
  cursor: pointer;
  letter-spacing:2px;
  font-family: 'Poppins';
  font-size: 18px;
  background-color: ${(props) => props.theme.bgSubDiv};
  font-weight: bold;
  
`