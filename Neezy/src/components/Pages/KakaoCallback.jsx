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

        const text = await response.text();
        console.log("응답 텍스트:", text);

        if (!response.ok) {
          let errorMessage = `로그인 실패: ${response.statusText}`;
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          } catch {
            // JSON 파싱 실패 시 기본 메시지 유지
          }
          setError(errorMessage);
          return;
        }

        const data = JSON.parse(text);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("memberId", data.memberId);

        alert("환영합니다!");
        navigate("/main");
      } catch (err) {
        setError("서버 요청 중 오류가 발생했습니다.");
        console.error(err);
      }
    };

    getTokenFromBackend();
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
