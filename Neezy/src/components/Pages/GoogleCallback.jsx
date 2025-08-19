import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function GoogleCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code");
        if (!code) {
            alert("인가 코드가 없습니다.");
            navigate("/login");
            return;
        }

        console.log("구글 인가 코드:", code);

        // const fetchGoogleToken = async () => {
        //     try {
        //         const response = await axios.post(
        //             `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        //             { code }
        //         );

        //         console.log("로그인 성공:", response.data);
        //         localStorage.setItem("token",response.data.token);
        //         navigate("/");
        //     } catch (error) {
        //         console.error(error);
        //         alert("구글 로그인 실패");
        //         navigate("/login");
        //     }
        // };

        // fetchGoogleToken();
    }, [location, navigate]);

    return <div>구글 로그인 처리 중...</div>;
}