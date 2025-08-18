import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";

const Root = styled.div`
  width: 375px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: white;

  @media (max-width: 400px) {
    width: 320px;
    height: 568px;
  }
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; /* 네브바 높이만큼 패딩 추가 */
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 18px;
  margin-top: 18px;
  object-fit: cover;
`;

const ProfileName = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const InfoBox = styled.section`
  width: 90%;
  max-width: 360px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-top: 15px;
  margin-bottom: 152px;
  border: #ff9639 solid;
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const BoxTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const EditBtn = styled.button`
  font-size: 14px;
  background: none;
  border: none;
  color: #007aff;
  cursor: pointer;
`;

const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  color: #222;
  font-size: 15px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ActionBtnGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const SaveBtn = styled.button`
  background: #007aff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
`;

const CancelBtn = styled.button`
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
`;

const LogoutSec = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  margin-bottom: 10px; /* 네브바 위 공간 약간 확보 */
`;

const GrayBtn = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 15px;
  cursor: pointer;
`;

export default function MyPage() {
  const initialData = {
    email: "minwoo@example.com",
    name: "김민우",
    age: "25",
    gender: "남",
  };

  const [info, setInfo] = useState(initialData);
  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState(initialData);

  const handleEditClick = () => {
    setEditInfo(info);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setInfo(editInfo);
    setEditMode(false);
    alert("임시 데이터로 수정 완료 (서버 연동 없음)");
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleLogout = () => {
    alert("임시 로그아웃 처리 (서버 없음)");
  };

  const handleDeleteMember = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      alert("임시 탈퇴 완료 (서버 없음)");
    }
  };

  return (
    <Root>
      <Header />
      <Main>
        <ProfileSection>
          <ProfileImg src="/img/기본아이콘.png" alt="프로필" />
          <ProfileName>{info.name}</ProfileName>
        </ProfileSection>

        <InfoBox>
          <InfoHeader>
            <BoxTitle>내정보</BoxTitle>
            <EditBtn onClick={handleEditClick}>수정</EditBtn>
          </InfoHeader>
          {editMode ? (
            <InfoForm onSubmit={handleSave}>
              <label>
                이메일
                <Input
                  name="email"
                  type="email"
                  value={editInfo.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                이름
                <Input
                  name="name"
                  type="text"
                  value={editInfo.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                나이
                <Input
                  name="age"
                  type="number"
                  value={editInfo.age}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                성별
                <Select
                  name="gender"
                  value={editInfo.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="남">남</option>
                  <option value="여">여</option>
                </Select>
              </label>
              <ActionBtnGroup>
                <SaveBtn type="submit">저장</SaveBtn>
                <CancelBtn type="button" onClick={handleCancel}>
                  취소
                </CancelBtn>
              </ActionBtnGroup>
            </InfoForm>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <InfoItem>
                <InfoLabel>이메일: {info.email}</InfoLabel>
              </InfoItem>
              <InfoItem>
                <InfoLabel>이름: {info.name}</InfoLabel>
              </InfoItem>
              <InfoItem>
                <InfoLabel>나이: {info.age}</InfoLabel>
              </InfoItem>
              <InfoItem>
                <InfoLabel>성별: {info.gender}</InfoLabel>
              </InfoItem>
            </div>
          )}
        </InfoBox>

        <LogoutSec>
          <GrayBtn onClick={handleLogout}>로그아웃</GrayBtn>
          <GrayBtn onClick={handleDeleteMember}>탈퇴</GrayBtn>
        </LogoutSec>
      </Main>
      <Nav />
    </Root>
  );
}
