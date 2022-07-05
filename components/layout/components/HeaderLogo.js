import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <Logo>Crowdfund</Logo>
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 25px;
  margin-left: 21px;
  font-family: 'Arial';
  letter-spacing: 3px;
  cursor: pointer;
`

export default HeaderLogo