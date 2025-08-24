import React, { useState } from "react";

const kakaoBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FEE500",
  color: "#000000",
  width: "300px",
  padding: "8px 0",
  borderRadius: 6,
  fontWeight: "bold",
  marginTop: 20,
  cursor: "pointer",
  border: "none",
};

const googleBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  width: "300px",
  padding: "8px 0",
  borderRadius: 6,
  fontWeight: "bold",
  marginTop: 20,
  cursor: "pointer",
  borderColor: "#00A3EF",
};

export default function Login() {
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(null);

  const handleKakaoLogin = async () => {
    setError(null);
    setLoadingMessage("카카오 로그인 페이지로 이동 중입니다...");
    try {
      const response = await fetch("/api1/login/oauth2/login-url/kakao");
      if (!response.ok) throw new Error("로그인 URL 요청 실패");
      const data = await response.json();
      if (!data.url) throw new Error("로그인 URL이 응답에 없습니다.");
      window.location.href = data.url; // 카카오 인증 페이지로 이동
    } catch (err) {
      setLoadingMessage(null);
      setError("카카오 로그인 URL 로드 실패");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoadingMessage("구글 로그인 페이지로 이동 중입니다...");
    try {
      const response = await fetch("/api1/login/oauth2/login-url/google");
      if (!response.ok) throw new Error("구글 로그인 URL 요청 실패");
      const data = await response.json();
      if (!data.url) throw new Error("구글 로그인 URL이 응답에 없습니다.");
      window.location.href = data.url;
    } catch (err) {
      setLoadingMessage(null);
      setError("구글 로그인 URL을 가져오는 데 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <img
        src="/img/Neezy 로고2.png"
        alt="Neezy 로고"
        style={{ width: 180, marginBottom: 30 }}
      />
      <h2>회원 로그인</h2>
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loadingMessage && <p>{loadingMessage}</p>}

      <button style={kakaoBtnStyle} onClick={handleKakaoLogin}>
        <img
          src="/img/kakao.png"
          alt="카카오 로고"
          style={{ width: 20, marginRight: 32 }}
        />
        카카오 로그인
      </button>

      <button style={googleBtnStyle} onClick={handleGoogleLogin}>
        <img
          src="/img/google.png"
          alt="구글 로고"
          style={{ width: 23, marginRight: 32 }}
        />
        구글 로그인
      </button>
    </div>
  );
}
