import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';

const Container = styled.div`
 position: relative;
 height: 100vh;
`;

const StyledHeader = styled(Header)`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
`;

const CenterContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 40px 0 20px 0;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const RoleButton = styled.button`
  width: 150px;
  height: 150px;
  padding: 15px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #FF871D;
  color: white;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }

  p.role-name {
    font-size: 1rem;
    font-weight: bold;
    margin: 5px 0;
  }

  p.role-desc {
    font-size: 0.8rem;
    margin: 2px 0;
    text-align: center;
  }
`;

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    console.log('선택한 역할:', role);
    navigate('/', { state: {role} });
  };

  return (
    <Container>
      <StyledHeader />
        <CenterContent>
          <Title>역할 선택</Title>
        <ButtonWrapper>
          <RoleButton onClick={() => handleRoleSelect('고객')}>
          <img src="/img/customer-icon.png" alt="고객 아이콘" />
          <p className='role-name'>고객</p>
          <p className='role-desc'>우리 지역에 이런 가게가<br /> 생겼으면 좋겠어요</p>
          </RoleButton>
          <RoleButton onClick={() => handleRoleSelect('창업자')}>
            <img src="/img/owner-icon.png" alt="창업자 아이콘" />
            <p className='role-name'>창업자</p>
            <p className='role-desc'>우리 지역 사람들은 무엇을<br /> 원하는지 궁금해요</p>
          </RoleButton>
        </ButtonWrapper>
        </CenterContent>
    </Container>
  );
}