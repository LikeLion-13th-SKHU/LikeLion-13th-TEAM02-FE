// BottomSheet.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

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
  margin-bottom: 20px;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
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
  margin-bottom: 20px;

  &:hover {
    background-color: #3458d1;
  }
`;

const AISolution = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

// BottomSheet 내부에서 모달 작업 상태를 관리하고 컨텐츠도 동적으로 작성 가능
export default function BottomSheet({ onClose }) {
  // 내부 상태 예시: 분석 결과 텍스트

  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <h2>분석 결과</h2>
        <Logo src="/img/Neezy로고.png" alt="Neezy 로고" />
        <Stats>
          <StatBox>
            <div>음식점 10개</div>
          </StatBox>
          <StatBox>
            <div>편의점 5개</div>
          </StatBox>
          <StatBox>
            <div>병원 개</div>
          </StatBox>
        </Stats>
        <button onClick={gotoComment}>코멘트 보기</button>
        <p>하이</p>
      </Sheet>
    </Overlay>
  );
}
