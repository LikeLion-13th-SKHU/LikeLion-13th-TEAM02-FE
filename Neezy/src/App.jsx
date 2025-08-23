// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Pages/Main";
import ChatBot from "./components/Pages/ChatBot";
import MyPage from "./components/Pages/MyPage";
import Login from "./components/Pages/Login";

import RoleSelect from "./components/Pages/RoleSelect";
import GoogleCallback from "./components/Pages/GoogleCallback";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* / → RedirectPage → /login */}
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roleselect" element={<RoleSelect />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
}
