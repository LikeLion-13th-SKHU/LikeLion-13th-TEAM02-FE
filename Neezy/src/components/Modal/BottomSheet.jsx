import React from "react";
import styled, { keyframes } from "styled-components";

export default function BottomSheet({ onClose, children }) {
  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {children}
      </Sheet>
    </Overlay>
  );
}

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
  width: 100%; /* #root와 동일 너비 (375px) */
  height: 100%; /* #root와 동일 높이 (800px) */
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${OverlayFadeIn} 0.3s ease forwards;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 하단에서 시트 올라오게 */
  z-index: 2000;
  border-radius: inherit; /* #root 모양 그대로 */
`;

const Sheet = styled.div`
  position: relative;
  width: 100%;
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
