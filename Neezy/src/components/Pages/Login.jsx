import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(null);

  // 카카오 로그인 URL 받아서 이동
  const handleKakaoLogin = async () => {
    setError(null);
    setLoadingMessage("카카오 로그인 페이지로 이동 중입니다...");
    try {
      const response = await fetch(
        "https://junyeong.store/login/oauth2/login-url/kakao"
      );
      if (!response.ok) throw new Error("로그인 URL 요청 실패");
      const data = await response.json();
      if (!data.url) throw new Error("로그인 URL이 응답에 없습니다.");
      window.location.href = data.url;
    } catch (err) {
      setLoadingMessage(null);
      setError("카카오 로그인 URL을 가져오는 데 실패했습니다.");
      console.error(err);
    }
  };

  // 구글 로그인 예시(구현 방법 동일)
  const handleGoogleLogin = async () => {
    setError(null);
    setLoadingMessage("구글 로그인 페이지로 이동 중입니다...");
    try {
      const response = await fetch(
        "https://junyeong.store/login/oauth2/login-url/google"
      );
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

  // 자동 로그인: 카카오 인가코드 있으면 토큰 요청
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) return;

    setError(null);
    setLoadingMessage("로그인 처리 중입니다...");

    const getTokenFromBackend = async () => {
      try {
        const response = await fetch(
          `https://junyeong.store/login/oauth2/code/kakao?code=${code}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage =
            errorData?.message || `로그인 실패: ${response.statusText}`;
          setError(errorMessage);
          setLoadingMessage(null);
          return;
        }
        const data = await response.json();
        console.log("Received data:", data);
        if (data.accessToken && data.memberId) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("memberId", data.memberId);
        } else {
          setError("서버 응답에 토큰 정보가 없습니다.");
        }

        alert("환영합니다!");
        navigate("/main", { replace: true });
      } catch (err) {
        setError("서버 요청 중 오류가 발생했습니다.");
        setLoadingMessage(null);
        console.error(err);
      }
    };

    getTokenFromBackend();
  }, [location.search, navigate]);

  // 토큰 있으면 즉시 /main으로
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

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
