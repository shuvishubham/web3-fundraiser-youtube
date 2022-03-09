import styled from 'styled-components';
import FormLeftWrapper from './Components/FormLeftWrapper'
import FormRightWrapper from './Components/FormRightWrapper'
import { createContext, useState } from 'react';

const FormState = createContext();

const Form = () => {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education",
    });

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
    }

  return (
      <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl}} >
    <FormWrapper>
        <FormMain>
            <FormInputsWrapper>
                <FormLeftWrapper />
                <FormRightWrapper />
            </FormInputsWrapper>
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

export default Form;
export {FormState};