import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] =
    useState("로그인 처리 중입니다...");

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) {
      setError("인가 코드가 없습니다.");
      setLoadingMessage(null);
      return;
    }

    const getTokenFromBackend = async () => {
      try {
        const response = await fetch(
          `/api1/login/oauth2/code/kakao?code=${code}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );
        if (!response.ok) {
          const text = await response.text();
          let errorMessage = `로그인 실패: ${response.status}`;
          try {
            const data = JSON.parse(text);
            if (data.message) errorMessage = data.message;
          } catch {
            errorMessage = text || errorMessage;
          }
          setError(errorMessage);
          setLoadingMessage(null);
          return;
        }
        const data = await response.json();

        if (data.accessToken && data.memberId) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("memberId", data.memberId);
          alert("환영합니다!");
          navigate("/roleselect", { replace: true });
        } else {
          setError("서버 응답에 토큰 정보가 없습니다.");
        }
        setLoadingMessage(null);
      } catch (err) {
        setError("서버 요청 중 오류가 발생했습니다.");
        setLoadingMessage(null);
        console.error(err);
      }
    };

    getTokenFromBackend();
  }, [location.search, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{loadingMessage}</p>
      )}
    </div>
  );
}
