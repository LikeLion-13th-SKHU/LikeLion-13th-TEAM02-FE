import React from "react";
import Header from "../Layout/Header";
import Nav from "../Layout/Nav";

export default function MyPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        내정보 콘텐츠 영역
      </main>
      <Nav />
    </>
  );
}
