import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link'


export default function Index({AllData, HealthData, EducationData,AnimalData}) {
  const [filter, setFilter] = useState(AllData);

  return (
    <HomeWrapper className='mwrap'>

      {/* Filter Section */}
      <FilterWrapper>
     
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)} >Health</Category>
        <Category onClick={() => setFilter(EducationData)} >Education</Category>
        <Category onClick={() => setFilter(AnimalData)} >Animal</Category>
      
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper className='wrap'>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
            <Image 
              alt="Crowdfunding dapp"
              layout='fill' 
              src={"https://ipfs.infura.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text><AccountBoxIcon />Owner</Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text ><PaidIcon />Amount</Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData>
            <Text ><EventIcon />Timestamp</Text>
            <Text >{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/' + e.address} ><Button>
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



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
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
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData
    }
  }
}
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  font-family: 'Poppins';
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
  margin-left: 130px;
  margin-top: 25px;
  
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  border: 5px solid white;

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
  height: 130px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Poppins';
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
  font-size: 20px;
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