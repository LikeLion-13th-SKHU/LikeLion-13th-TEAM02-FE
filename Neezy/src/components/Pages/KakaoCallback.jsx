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

    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const getToken = async () => {
      try {
        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded,charset=utf-8",
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
        console.log("액세스 토큰", data.access_token);

        const useResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Content_Type: "application?x-www-form-urlencoded;charset=utf-8",
          },
        });

        if (!useResponse.ok) {
          setError("사용자 정보 요청 실패");
          return;
        }

        const userData = await useResponse.json();
        console.log("사용자 정보: ", userData);

        alert(`환영합니다, ${userData.kakao_account.profile.nickname}님!!`);
        navigate("/");
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
