import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      default: "/img/네브바_메인.png",
      active: "/img/네브바_메인선택.png",
      alt: "메인",
      path: "/main",
    },
    {
      default: "/img/네브바_챗봇.png",
      active: "/img/네브바_챗봇선택.png",
      alt: "챗봇",
      path: "/chatbot",
    },
    {
      default: "/img/네브바_내정보.png",
      active: "/img/네브바_내정보선택.png",
      alt: "내정보",
      path: "/mypage",
    },
  ];

  const activeIndex = navItems.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    <nav className="nav-container">
      {navItems.map((item, index) => (
        <img
          key={index}
          src={index === activeIndex ? item.active : item.default}
          alt={item.alt}
          onClick={() => navigate(item.path)}
        />
      ))}
    </nav>
  );
}
