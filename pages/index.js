import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
import { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link'
import Web3Modal, { local } from 'web3modal'
import { providers } from "ethers";
import { CAMPAIGN_FACTORY_DETAILS } from '../constants/constants';
import { GetProps } from '../components/GetStaticProps';
import AdminContext from '../context/adminContext';


export default function Index({CampaignData, HealthData, EducationData,AnimalData}) {

  const { newSigner, setNewSigner, newAddress, setNewAddress, allCampaigns, setAllCampaigns, connectAccount, setConnectAccount,  fetchChainId, setFetchChainId  } = useContext(AdminContext)
  const [filter, setFilter] = useState();
  const [campaign, setCampaign] = useState(false)
 
  // console.log(filter, "data")
  const [address, setAddress] = useState({})
  const [signer, setSigner] = useState()

  const getAllData = async (campaign) => {
    setFilter(campaign)
  
        }


  let chainId;
  let networkId;
  let networkName;
    const [connectToWallet, setConnectedWallet] = useState(false)
    const [getChainId, setChainId] = useState(null);

  
 
  
    const Web3ModalRef = useRef();
    const getSignerorProvider = async (needSigner = true) => {
        const provider = await Web3ModalRef.current.connect();
        const Web3Provider = new providers.Web3Provider(provider);
        chainId = await Web3Provider.getNetwork();
        
        var fetchChainId = chainId
        // if (chainId !== 8301) {
        //     alert('Use BuildBear Network')
        //     throw new Error('Change network to BuildBear');
        // }

    
        if (needSigner) {
            const signer = Web3Provider.getSigner();
            setNewSigner(()=>signer)
            let address = await signer.getAddress();
            setAddress(address);
            setSigner(signer)
           
            return signer;
        }
        return provider;
    }
    // console.log(allCampaigns, 'all')
    const connectWallet = async () => {
       try {
        await getSignerorProvider();
        setConnectedWallet(true);
        const walletconnect = true
        setConnectAccount(()=>walletconnect)
        setChainId(chainId);
        setFetchChainId(()=>chainId)
       
        console.log(chainId)
       } catch (err) {
        console.log(err)
       }
    }
    console.log(connectAccount, 'wallet')

    for (let [key, value] of Object.entries(CAMPAIGN_FACTORY_DETAILS)) {
      if (fetchChainId === null && console.log('connect to metamamsk'));
      if(fetchChainId != null){
        if (key == fetchChainId.chainId) {
          console.log("connected to build bear");
          networkId = fetchChainId.chainId;
        }
        else if (key != fetchChainId.chainId) {
        // console.log(fetchChainId.name)
        networkName = fetchChainId.name;
        networkId = fetchChainId.chainId;
        }
      }
    }

    const stateChanger = (fetchAddress) => {
      setNewAddress(() => fetchAddress)
    }
   
    useEffect(() => {
        Web3ModalRef.current = new Web3Modal({        
        })
        ethereum.on('chainChanged', (_chainId) => window.location.reload());
        getAllData()
       
    }, [connectAccount])

    if (filter !== undefined) {
      setAllCampaigns(()=>filter)
    }

  return (
    <> 
    <div>
      {(connectToWallet && networkId != 8337) && <p style={{fontFamily: 'Poppins', margin: '200px 40% -15% 40%', fontSize: '20px'}}>Connected to {networkName}. Please switch to <b>BuildBear</b></p>}
  
      {(connectAccount && networkId == 8337) ?
     <>
    <HomeWrapper className='mwrap'>

      {/* Cards Container */}
      <CardsWrapper className='wrap'>
      {/* Card */}
      {filter === undefined && <p>No campaign is created yet! Create one with Build Bear!</p>}

      {filter !== undefined && filter.map((e) => {
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
            <Text>Owner</Text> 
            <Text>{e.owner.slice(0,9)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            <Text >Amount</Text> 
            <Text>{e.amount} BB ETH</Text>
          </CardData>
         
         
         <Link href="/campaign">
         <Button onClick={() => stateChanger(e.address)}>
           Go to Campaign
          </Button>
         </Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
   <GetProps signer={signer} getAllData={getAllData} />
   {/* <Detail /> */}

   
   
  </>
    : <button style={{alignItems: 'center', justifyContent: 'center', marginLeft: '44%', marginTop: '20%', border: 'none', backgroundColor: '#d0d0d0', padding: '16px 27px' , borderRadius: '10px', fontSize: '25px', cursor: 'pointer'}} onClick={connectWallet}>Connect to Wallet</button>}
    </div>
 
    </>
  )

}



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