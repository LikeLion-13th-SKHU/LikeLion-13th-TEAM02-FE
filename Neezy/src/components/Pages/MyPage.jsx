import React, { useState, useEffect } from "react";
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
  background: #f5f5f5;
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
  margin-bottom: 32px;
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
  gap: 8px;
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
  const [memberId, setMemberId] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  useEffect(() => {
    const storedMemberId = localStorage.getItem("memberId");
    if (!storedMemberId) {
      setError("회원 정보를 불러올 수 없습니다. 로그인이 필요합니다.");
      setLoading(false);
      return;
    }
    setMemberId(storedMemberId);
  }, []);

  useEffect(() => {
    if (!memberId) return;

    async function fetchMember() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/members/${memberId}`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`서버 에러: ${response.status} ${text}`);
        }
        const data = await response.json();
        setInfo({
          email: data.email,
          name: data.name,
          age: data.age.toString(),
          gender: data.gender === "MALE" ? "남" : "여",
          role: data.role,
        });
        setEditInfo({
          email: data.email,
          name: data.name,
          age: data.age.toString(),
          gender: data.gender === "MALE" ? "남" : "여",
        });
      } catch (err) {
        setError(err.message || "회원 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [memberId]);

  const handleEditClick = () => {
    setEditInfo(info);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!memberId) {
      alert("회원 정보를 불러올 수 없습니다.");
      return;
    }

    const genderValue = editInfo.gender === "남" ? "MALE" : "FEMALE";

    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editInfo.name,
          age: Number(editInfo.age),
          email: editInfo.email,
          gender: genderValue,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`수정 실패: ${response.status} ${errorText}`);
      }
      setInfo({ ...editInfo });
      setEditMode(false);
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://junyeong.store/api/oauth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`로그아웃 실패: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      alert(data.message || "로그아웃 성공");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMember = async () => {
    if (!window.confirm("정말 회원 탈퇴 하시겠습니까?")) return;

    if (!memberId) {
      alert("회원 정보를 불러올 수 없습니다.");
      return;
    }

    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`탈퇴 실패: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      alert(data.message || "회원 탈퇴 완료");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <Root>
        <div>로딩 중...</div>
      </Root>
    );
  if (error)
    return (
      <Root>
        <div>에러: {error}</div>
      </Root>
    );

  return (
    <Root>
      <Header />
      <Main>
        <ProfileSection>
          <ProfileImg src="/img/기본아이콘.png" alt="프로필" />
          <ProfileName>{info?.name}</ProfileName>
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
                <InfoLabel>이메일: {info?.email}</InfoLabel>
              </InfoItem>
              <InfoItem>
                <InfoLabel>이름: {info?.name}</InfoLabel>
              </InfoItem>
              <InfoItem>
                <InfoLabel>나이: {info?.age}</InfoLabel>
              </InfoItem>
              <InfoItem>
                <InfoLabel>성별: {info?.gender}</InfoLabel>
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
