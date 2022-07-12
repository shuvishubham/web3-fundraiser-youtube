import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { CAMPAIGN_FACTORY_DETAILS } from '../constants/constants';
import AdminContext from './adminContext';

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);


  const { newSigner, setNewSigner } = useContext(AdminContext)
  
 
  console.log(newSigner, "signer")

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

    //   const provider = new ethers.providers.JsonRpcProvider(
    //     process.env.NEXT_PUBLIC_RPC_URL
    //   );
  
      const contract = new ethers.Contract(
        CAMPAIGN_FACTORY_DETAILS.address,
        CampaignFactory.abi,
        signer
      );
      
  
      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
      const AllCampaigns = await contract.queryFilter(getAllCampaigns);
      const AllData = AllCampaigns.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaignAddress
      }
      })  
      setCampaignsData(AllData)
    }
    Request();
  }, [])

  return (
 
    <HomeWrapper>

      {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
    
      {campaignsData.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
            <Image 
              alt="crowdfunding dapp"
              layout='fill' 
              src={"https://ipfs.infura.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text>Owner</Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text>Amount</Text> 
            <Text>{e.amount} BB ETH</Text>
          </CardData>
         
          <Link passHref href={'/dash'}><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
   
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>

  )
}



const HomeWrapper = styled.div`
  display: flex;
  overflow-X: hidden;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: nowrap
  align-items: center;
 
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
  background-color: ${(props) => props.theme.bgDiv};

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
  border-radius: "30px";
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
  border: none;
  cursor: pointer;
  letter-spacing:2px;
  font-family: 'Poppins';
  font-size: 18px;
  background-color: ${(props) => props.theme.bgSubDiv};
  font-weight: bold;
`