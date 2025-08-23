import React, { useState, useEffect, useRef } from "react";
import proj4 from "proj4";
import styled from "styled-components";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../Modal/BottomSheet";

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
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // 내 위치 받아오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          setLatitude(37.5665);
          setLongitude(126.978);
        }
      );
    } else {
      setLatitude(37.5665);
      setLongitude(126.978);
    }
  }, []);

  // 카카오맵 생성 (최초 1회)
  useEffect(() => {
    if (
      window.kakao &&
      window.kakao.maps &&
      mapRef.current &&
      latitude &&
      longitude &&
      !map
    ) {
      const createdMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 4,
      });
      createdMap.setDraggable(true);
      createdMap.setZoomable(true);
      setMap(createdMap);
      placesRef.current = new window.kakao.maps.services.Places();
    }
  }, [latitude, longitude, map]);

  // 검색 → 행정동 폴리곤 표시
  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("검색어를 입력하세요!");
      return;
    }
    if (!map) {
      alert("지도가 준비되지 않았습니다.");
      return;
    }

    placesRef.current.keywordSearch(keyword, async (data, status) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const place = data[0];
        const coords = new window.kakao.maps.LatLng(place.y, place.x);
        map.setCenter(coords);
        new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        try {
          const query = encodeURIComponent(keyword);
          const serviceKey =
            "%2F%2FMfJqQQaQ41AVYKyHWY1OAN7QGjkZHHl03DCC7%2FJOX%2B%2FRNPchYl%2BjaqcqNF36u2LWTlqK0yHsLYHFDAhOd0TA%3D%3D";

          const url = `https://api.odcloud.kr/api/15063424/v1/uddi:257e1510-0eeb-44de-8883-8295c94dadf7?읍면동명=${query}&serviceKey=${serviceKey}`;

          const response = await fetch(url);
          const json = await response.json();

          if (!json.data || json.data.length === 0) {
            alert("공공데이터에서 일치하는 법정동코드를 찾지 못했습니다.");
            return;
          }

          const rawEmdCd = json.data[0].법정동코드.toString();
          const emdCdTrimmed =
            rawEmdCd.length === 10 ? rawEmdCd.slice(0, 8) : rawEmdCd;

          const geoResponse = await fetch("/222.json");
          const geoJson = await geoResponse.json();

          const fullEmdCd = emdCdTrimmed + "00";

          const feature = geoJson.features.find(
            (f) => f.properties.EMD_CD === fullEmdCd
          );

          if (!feature) {
            console.log("geoJSON EMD_CD 목록:", emdCdTrimmed);

            alert("geoJSON 데이터에서 일치하는 폴리곤을 찾지 못했습니다.");
            return;
          }

          const coordinates = feature.geometry.coordinates;
          const polygonPath = [];
          const utmk =
            "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
          const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
          const transformer = proj4(utmk, wgs84);

          coordinates.forEach((coordinateArray) => {
            coordinateArray.forEach((coord) => {
              const [longi, lati] = transformer.forward(coord);
              polygonPath.push(new window.kakao.maps.LatLng(lati, longi));
            });
          });

          new window.kakao.maps.Polygon({
            path: polygonPath,
            strokeColor: "#925CE9",
            fillColor: "#925CE9",
            fillOpacity: 0.7,
          }).setMap(map);
        } catch (error) {
          console.error("법정동코드 조회 또는 폴리곤 그리기 실패:", error);
          alert("분석 중 오류가 발생했습니다.");
        }
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
      {showModal && <BottomSheet onClose={() => setShowModal(false)} />}
    </Container>
  );
}
