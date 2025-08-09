// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Pages/Main";
import ChatBot from "./components/Pages/ChatBot";
import MyPage from "./components/Pages/MyPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}
