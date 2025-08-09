// src/components/Layout/Header.jsx
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 50px; /* 로고 높이 조절 */
  margin-top: 10px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0 0 0 10px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo src="/img/Neezy 로고.png" alt="Neezy Logo" />
    </HeaderContainer>
  );
}
