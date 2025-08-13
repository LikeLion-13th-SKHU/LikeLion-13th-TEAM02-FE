import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800); // 0.8초 딜레이 후 이동

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
      }}
    >
      🚀 잠시만 기다려주세요...
    </div>
  );
}
