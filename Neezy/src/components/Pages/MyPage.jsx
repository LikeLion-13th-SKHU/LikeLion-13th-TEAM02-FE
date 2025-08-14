import React from "react";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import styled from "styled-components";

export default function MyPage() {
  return (
    <>
      <Header />
        <Container>
          <ProfileSection>
            <img src="/img/profile.png" alt="프로필" />
            <ProfileName>
              김멋사
            </ProfileName>
            <img src="/img/editpencil.png" alt="수정" />
          </ProfileSection>

          <InfoTitle>
            내 정보
            <img src="/img/editpencil.png" alt="수정" />
          </InfoTitle>

          <InfoBox>
            <InfoItem>
              <span>이메일</span> likelionkim@gamil.com
            </InfoItem><br />
            <InfoItem>
              <span>전화 번호</span> 010-1234-5678
            </InfoItem><br />
            <InfoItem>
              <span>나이</span> 24
            </InfoItem><br />
            <InfoItem>
              <span>성별</span> 남자 / 여자
            </InfoItem>
          </InfoBox>

          <ButtonWrap>
            <Logout>로그아웃</Logout>
            <DeleteAccount>탈퇴</DeleteAccount>
          </ButtonWrap>
        </Container>
      <Nav />
    </>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const ProfileSection = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 60px;
  gap: 10px;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;

`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  margin-top: 60px;
  margin-bottom: 30px;
  font-weight: 500;


`;

const InfoBox = styled.div`
  border: 1px solid #f97316;
  border-radius: 8px;
  padding: 20px;
  font-size: 14px;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
  span {
    display: inline-block;
    width:  70px;
    color: gray;
    font-weight: 500;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Logout = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
`;

const DeleteAccount = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
`;


