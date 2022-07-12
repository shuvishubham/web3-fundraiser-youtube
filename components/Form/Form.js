import styled from 'styled-components';
import FormLeftWrapper from './Components/FormLeftWrapper'
import FormRightWrapper from './Components/FormRightWrapper'
import { createContext, useState } from 'react';
import {TailSpin} from 'react-loader-spinner';
import {ethers} from 'ethers';
import {toast} from 'react-toastify';
import CampaignFactory from '../../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json'
import CrowdfundImg from '../../assets/crowdfund-image.jpg'
import { CAMPAIGN_FACTORY_DETAILS } from '../../constants/constants';
import Link from 'next/link';
const FormState = createContext();

const Form = () => {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education",
    });

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const [storyUrl, setStoryUrl] = useState();
    const [imageUrl, setImageUrl] = useState();

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const [image, setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    }
    

    const startCampaign = async (e) => {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        if(form.campaignTitle === "") {
          toast.warn("Title Field Is Empty");
        } else if(form.story === "" ) {
          toast.warn("Story Field Is Empty");
        } else if(form.requiredAmount === "") {
          toast.warn("Required Amount Field Is Empty");
        } 
        else {        
          setLoading(true);  
    
          const contract = new ethers.Contract(
            CAMPAIGN_FACTORY_DETAILS.address,
            CampaignFactory.abi,
            signer
          );
       if (form.uploaded === undefined) {
        setImage({
          name: {CrowdfundImg},
          
        })
       }
            
          const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);
    
          const campaignData = await contract.createCampaign(
            form.campaignTitle,
            CampaignAmount,
            imageUrl,
            form.category,
            storyUrl
          );
    console.log(campaignData, 'data')
          await campaignData.wait();   
    
          setAddress(campaignData.to);
        }
    }

  return (
      <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, startCampaign, setUploaded}} >
    <FormWrapper>
        <FormMain>
            {loading == true ?
                address == "" ?
                    <Spinner>
                        <TailSpin height={60} />
                    </Spinner> :
                <Address>
                    <h1 style={{fontFamily: 'Poppins'}}>Campaign Started Sucessfully!</h1>
                    <h1 style={{fontFamily: 'Poppins'}}>{address}</h1>
                    <Button style={{fontFamily: 'Poppins'}}>
                       <Link href="/campaign" style={{textDecoration: 'none', fontFamily: 'Poppins'}}> Go To Campaign</Link>
                    </Button>
                </Address>
                :
                    <FormInputsWrapper>
                        <FormLeftWrapper />
                        <FormRightWrapper />
                    </FormInputsWrapper>               
            }
        </FormMain>
    </FormWrapper>
    </FormState.Provider>
  )
}

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;

  border:none;
  background-color: #08AEEA;
background-color:#08AEEA;

  border-radius:20px;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`

export default Form;
export {FormState};