import React from "react";
import styled, { keyframes } from "styled-components";
import Nav from "../Layout/Nav";
import { useNavigate } from "react-router-dom";

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
  width: 100%;
  height: 100%;
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
  height: calc(90% - 60px);
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: ${SheetSlideUp} 0.3s ease forwards;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  padding: 16px;
  overflow-y: auto;
  padding-bottom: 60px;
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

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 10px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CategoryItem = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #3c67ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3458d1;
  }
`;

const AISolution = styled.div`
  padding: 15px;
  border: 3px solid #ffb516;
  border-radius: 8px;
`;

const FixedWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const ViewCommentsButton = styled.button`
  background-color: #ffb516;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  width: 80%;
  padding: 10px 0;
  margin: 0 auto 20px auto;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #e0a511;
  }
`;

export default function BottomSheet({
  onClose,
  region,
  categorizedPlaces,
  onCategoryClick,
}) {
  const navigate = useNavigate();

  // 클릭 시 부모 콜백 실행 (지도에 마커 강조)
  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  // 코멘트 보기 페이지로 이동
  const goToComments = () => {
    navigate("/comment"); // 경로는 필요에 따라 조정하세요
  };

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Title>{region ? `${region} 상권 정보` : "분석 결과"}</Title>
        <Divider />
        <Logo src="/img/Neezy 로고.png" alt="Neezy 로고" />

        <CategoryList>
          {Object.keys(categorizedPlaces).map((category) => (
            <CategoryItem
              key={category}
              onClick={() => handleCategoryClick(category)}
              title={`${category} (${categorizedPlaces[category].length}개)`}
            >
              {category} ({categorizedPlaces[category].length}개)
            </CategoryItem>
          ))}
        </CategoryList>

        <ViewCommentsButton onClick={goToComments}>
          코멘트 보기
        </ViewCommentsButton>

        <AISolution>
          <h3>ai와 함께하는 종합 솔루션 서비스</h3>
        </AISolution>
        <FixedWrapper>
          <Nav />
        </FixedWrapper>
      </Sheet>
    </Overlay>
  );
}
