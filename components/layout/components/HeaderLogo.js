import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <Logo><img height={80} width={120} style={{ marginTop:"30px"}} src='https://i.im.ge/2022/07/06/uytr6X.md.png'></img></Logo>
    
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