import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <Logo><div style={{marginRight: '160px'}}></div></Logo>
    
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 25px;
  margin-left: 21px;
  margin-top: 21px;

  letter-spacing: 3px;
  cursor: pointer;
 
`

export default HeaderLogo