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
  color: white;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  z-index: 1000;
`;

const AnalyzeButton = styled(Button)`
  bottom: 20px;
  left: 80px;
  background-color: ${(props) => (props.disabled ? "#9e9e9e" : "#3c67ff")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#9e9e9e" : "#3458d1")};
  }
`;

const NeedButton = styled(Button)`
  bottom: 20px;
  right: 80px;
  background-color: #3c67ff;

  &:hover {
    background-color: #3458d1;
  }
`;

const BackToModalButton = styled(Button)`
  bottom: 80px;
  left: 20px;
  padding: 10px 16px;
  z-index: 1001;
  background-color: #3c67ff;

  &:hover {
    background-color: #3458d1;
  }
`;

export default function Main() {
  const mapRef = useRef(null);
  const placesRef = useRef(null);
  const [map, setMap] = useState(null);
  const [region, setRegion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showMapOnly, setShowMapOnly] = useState(false);
  const [categorizedPlaces, setCategorizedPlaces] = useState({});
  const [markersByCategory, setMarkersByCategory] = useState({});
  const [infoWindow, setInfoWindow] = useState(null);

  const navigate = useNavigate();

  const defaultPosition = { lat: 37.5665, lng: 126.978 };

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

      const iw = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      setInfoWindow(iw);
    }
  }, [mapRef, map]);

  // 모든 마커 제거
  const removeMarkers = () => {
    Object.values(markersByCategory).forEach((markerArray) => {
      markerArray.forEach((marker) => marker.setMap(null));
    });
    setMarkersByCategory({});
    if (infoWindow) infoWindow.close();
  };

  const searchPlaces = () => {
    if (!region.trim()) {
      alert("검색어를 입력하세요!");
      return;
    }
    if (!map) {
      alert("지도가 준비되지 않았습니다.");
      return;
    }
    localStorage.setItem("region", region);
    removeMarkers();

    placesRef.current.keywordSearch(region, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        const categoryMap = {};
        const markerMap = {};

        data.forEach((place) => {
          const category = place.category_group_name || "기타";

          if (!categoryMap[category]) categoryMap[category] = [];
          categoryMap[category].push(place);

          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({ position, map });

          window.kakao.maps.event.addListener(marker, "click", () => {
            const content = `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`;
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
          });

          if (!markerMap[category]) markerMap[category] = [];
          markerMap[category].push(marker);

          bounds.extend(position);
        });

        setCategorizedPlaces(categoryMap);
        setMarkersByCategory(markerMap);
        map.setBounds(bounds);

        // 마커가 활성화되었으므로 분석하기 버튼 활성화
        setAnalyzeEnabled(true);
      } else {
        alert("검색 결과가 없습니다.");
        setCategorizedPlaces({});
        removeMarkers();

        // 마커가 없으므로 분석하기 버튼 비활성화
        setAnalyzeEnabled(false);
      }
    });
  };

  // 분석하기 버튼 활성화 상태 관리
  const [analyzeEnabled, setAnalyzeEnabled] = useState(false);

  // 카테고리 클릭 시 모달 닫고 지도 뷰만 노출
  const handleCategoryClick = (category) => {
    setShowModal(false);
    setShowMapOnly(true);

    Object.values(markersByCategory).forEach((markerArray) =>
      markerArray.forEach((marker) => marker.setMap(null))
    );

    if (markersByCategory[category]) {
      markersByCategory[category].forEach((marker) => marker.setMap(map));
    }

    if (infoWindow) infoWindow.close();
  };

  // 지도에 있는 '모달로 돌아가기' 버튼 클릭시 모달 재오픈
  const backToModal = () => {
    setShowMapOnly(false);
    setShowModal(true);

    Object.values(markersByCategory).forEach((markerArray) =>
      markerArray.forEach((marker) => marker.setMap(map))
    );
  };

  return (
    <Container>
      <Header />
      <ContentArea>
        <MapWrapper ref={mapRef} />
        {!showMapOnly && (
          <>
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
            <AnalyzeButton
              disabled={!analyzeEnabled}
              onClick={() => analyzeEnabled && setShowModal(true)}
            >
              분석하기
            </AnalyzeButton>
            <NeedButton onClick={() => navigate("/chatbot")}>
              필요해요
            </NeedButton>
          </>
        )}

        {showMapOnly && (
          <BackToModalButton onClick={backToModal}>
            모달로 돌아가기
          </BackToModalButton>
        )}
      </ContentArea>

      <Nav />

      {showModal && (
        <BottomSheet
          onClose={() => setShowModal(false)}
          region={region}
          categorizedPlaces={categorizedPlaces}
          onCategoryClick={handleCategoryClick}
        />
      )}
    </Container>
  );
}
