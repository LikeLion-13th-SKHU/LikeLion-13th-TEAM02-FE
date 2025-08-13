import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative; /* 모달 절대 위치 기준 */
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchBox = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  z-index: 1100; /* 버튼들 위 */
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  width: 180px;
`;

const SearchButton = styled.button`
  margin-left: 8px;
  padding: 6px 20px;
  border: none;
  background-color: #3c67ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
  writing-mode: horizontal-tb;

  &:hover {
    background-color: #3458d1;
  }
`;

const Button = styled.button`
  position: absolute;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: #3c67ff;
  color: white;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  z-index: 1000;

  &:hover {
    background-color: #3458d1;
  }
`;

const AnalyzeButton = styled(Button)`
  bottom: 20px;
  left: 80px;
`;

const NeedButton = styled(Button)`
  bottom: 20px;
  right: 80px;
`;

// BottomSheet 모달 컴포넌트
const OverlayFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SheetSlideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Container (375px) 전체 */
  height: 100%; /* Container (800px) 전체 */
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${OverlayFadeIn} 0.3s ease forwards;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 2000;
  border-radius: inherit;
`;

const Sheet = styled.div`
  position: relative;
  width: 100%;
  max-width: 375px;
  height: calc(90% - 60px); /* 모바일 높이 90%에서 Nav(60px) 빼기 */
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: ${SheetSlideUp} 0.3s ease forwards;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  padding: 16px;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
`;

// BottomSheet 컴포넌트 함수형
function BottomSheet({ onClose, children }) {
  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {children}
      </Sheet>
    </Overlay>
  );
}

export default function Main() {
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapRef.current && !map) {
      const createdMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 4,
      });
      createdMap.setDraggable(true);
      createdMap.setZoomable(true);
      setMap(createdMap);
      placesRef.current = new window.kakao.maps.services.Places();
    }
  }, [map]);

  // 장소 검색
  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("검색어를 입력하세요!");
      return;
    }
    placesRef.current.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0];
        const coords = new window.kakao.maps.LatLng(place.y, place.x);
        map.setCenter(coords);
        new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  return (
    <Container>
      <Header />
      <ContentArea>
        <MapWrapper ref={mapRef} />
        <SearchBox>
          <Input
            type="text"
            placeholder="장소를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") searchPlaces();
            }}
          />
          <SearchButton onClick={searchPlaces}>검색</SearchButton>
        </SearchBox>
        <AnalyzeButton onClick={() => setShowModal(true)}>
          분석하기
        </AnalyzeButton>
        <NeedButton onClick={() => navigate("/chatbot")}>필요해요</NeedButton>
      </ContentArea>
      <Nav />
      {showModal && (
        <BottomSheet onClose={() => setShowModal(false)}>
          <h2>분석 결과</h2>
          <p>여기에 분석 내용이나 UI 구성을 넣으시면 됩니다.</p>
        </BottomSheet>
      )}
    </Container>
  );
}
