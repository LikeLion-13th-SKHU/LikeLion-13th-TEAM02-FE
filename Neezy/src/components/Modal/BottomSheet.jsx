import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Nav from "../Layout/Nav";

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
  width: 100%; /* 부모 너비 전체 */
  height: 100%; /* 부모 높이 전체 */
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${OverlayFadeIn} 0.3s ease forwards;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 하단에서 시트 올라오게 */
  z-index: 2000;
  border-radius: inherit;
`;

const Sheet = styled.div`
  position: relative;
  width: 100%;
  max-width: 375px;
  height: calc(90% - 60px); /* Nav 높이(60px) 고려 */
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

const Logo = styled.img`
  width: 120px;
  margin-bottom: 10px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  font-weight: 700;
`;

const StatBox = styled.div`
  text-align: center;
`;

const CommentButton = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #3c67ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 40px;
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

export default function BottomSheet({ onClose }) {
  const [region, setRegion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedRegion = localStorage.getItem("region") || "";
    setRegion(storedRegion);
  }, []);

  const gotoComment = () => {
    navigate("/comment");
  };

  const CommentButtonStyled = styled.button`
    width: 80%;
    padding: 6px 0;
    background-color: #ffb516;
    color: white;
    border: none;
    border-radius: 16px;
    font-weight: 600;
    font-size: 18px;
    margin: 0 auto 20px auto;
    display: block;
    text-align: center;
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

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <Title>{region ? `${region} 상권 정보` : "분석 결과"}</Title>
        <Divider />
        <Logo src="/img/Neezy 로고.png" alt="Neezy 로고" />
        <Stats>
          <StatBox>
            <div>
              음식점
              <br /> 4개
            </div>
          </StatBox>
          <StatBox>
            <div>
              편의점
              <br /> 5개
            </div>
          </StatBox>
          <StatBox>
            <div>
              카페
              <br /> 3개
            </div>
          </StatBox>
          <StatBox>
            <div>
              병원
              <br /> 2개
            </div>
          </StatBox>
        </Stats>
        <CommentButtonStyled onClick={gotoComment}>코멘트</CommentButtonStyled>
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
