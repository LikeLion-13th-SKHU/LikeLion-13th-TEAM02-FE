import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../Modal/BottomSheet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
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
  z-index: 1100;
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

export default function Main() {
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const [map, setMap] = useState(null);
  const [region, setRegion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 마커 상태 관리
  const markersRef = useRef([]);

  // 내 위치 기본: 서울시청 좌표
  const defaultPosition = { lat: 37.5665, lng: 126.978 };

  // 카카오맵 생성 (최초 1회)
  useEffect(() => {
    if (window.kakao && mapRef.current && !map) {
      const createdMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(
          defaultPosition.lat,
          defaultPosition.lng
        ),
        level: 4,
      });
      setMap(createdMap);
      placesRef.current = new window.kakao.maps.services.Places();
    }
  }, [mapRef, map]);

  // 마커 삭제 함수
  const removeMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  // 주변장소 검색 및 마커 표시
  const searchPlaces = () => {
    if (!region.trim()) {
      alert("검색어를 입력하세요!");
      return;
    }
    if (!map) {
      alert("지도가 준비되지 않았습니다.");
      return;
    }

    // 검색어를 로컬스토리지에 저장 (덮어쓰기)
    localStorage.setItem("region", region);

    // 기존 마커 제거
    removeMarkers();

    // 키워드로 장소 검색
    placesRef.current.keywordSearch(region, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();

        data.forEach((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
          });

          let isOpen = false;

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (isOpen) {
              infowindow.close();
              isOpen = false;
            } else {
              infowindow.open(map, marker);
              isOpen = true;
            }
          });

          markersRef.current.push(marker);
          bounds.extend(position);
        });

        map.setBounds(bounds);
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
            value={region}
            onChange={(e) => setRegion(e.target.value)}
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
        <BottomSheet onClose={() => setShowModal(false)} keyword={region} />
      )}
    </Container>
  );
}
