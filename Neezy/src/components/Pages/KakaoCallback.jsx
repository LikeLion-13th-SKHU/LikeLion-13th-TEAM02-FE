import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function KakaoCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) {
      setError("인가 코드가 없습니다.");
      return;
    }

    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const getToken = async () => {
      try {
        // 1. 카카오 OAuth 토큰 요청
        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(`토큰 요청 실패: ${errorData.error_description}`);
          return;
        }

        const data = await response.json();
        console.log("카카오 액세스 토큰", data.access_token);

        // 2. 백엔드 로그인 API 호출 (카카오 토큰 전달)
        const loginResponse = await fetch(
          "https://junyeong.store/api/auth/login/kakao",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken: data.access_token }),
          }
        );

        if (!loginResponse.ok) {
          const loginError = await loginResponse.json();
          setError(`로그인 실패: ${loginError.message || loginError.error}`);
          return;
        }

        const loginData = await loginResponse.json();
        console.log("로그인 서버 응답:", loginData);

        // 3. 로그인 성공 시 앱 상태 및 로컬 스토리지 저장
        localStorage.setItem("accessToken", loginData.accessToken);
        localStorage.setItem("memberId", loginData.memberId);

        alert(`환영합니다!`);
        navigate("/main");
      } catch (err) {
        setError("오류가 발생했습니다.");
        console.error(err);
      }
    };

    getToken();
  }, [location, navigate]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>로그인 처리 중입니다...</p>
      )}
    </div>
  );
}
