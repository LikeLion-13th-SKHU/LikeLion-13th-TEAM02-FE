// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Pages/Main";
import ChatBot from "./components/Pages/ChatBot";
import MyPage from "./components/Pages/MyPage";
import Login from "./components/Pages/Login";
import KakaoCallback from "./components/Pages/KakaoCallback";
import RedirectPage from "./components/Pages/Redirect";
import RoleSelect from "./components/Pages/RoleSelect";

export default function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("5de85e47fb0dab85bca11aa59571e396");
      console.log("Kakao SDK 초기화 완료");
    }
  }, []); // ← 괄호 닫는 위치 수정 (원래 코드에서 여기가 잘못됨)

  return (
    <Router>
      <Routes>
        {/* / → RedirectPage → /login */}
        <Route path="/" element={<RedirectPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/roleselect" element={<RoleSelect />} />
      </Routes>
    </Router>
  );
}
