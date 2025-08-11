// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Main from "./components/Pages/Main";
import ChatBot from "./components/Pages/ChatBot";
import MyPage from "./components/Pages/MyPage";
import Login from "./components/Pages/Login";
import KakaoCallback from "./components/Pages/KakaoCallback";

export default function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("5de85e47fb0dab85bca11aa59571e396");
      console.log("Kakao SDK 초기화 완료");
    }
  }), [];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </Router>
  );
}
