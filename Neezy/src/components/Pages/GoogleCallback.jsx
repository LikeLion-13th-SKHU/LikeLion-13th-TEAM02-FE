import React, { useEffect } from "react;"
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

        
    })
}