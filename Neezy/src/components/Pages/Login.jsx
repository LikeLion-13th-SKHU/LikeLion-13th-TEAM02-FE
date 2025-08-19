import React from 'react';
import { redirect } from 'react-router-dom';

const kakaoBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',
    color: '#000000',
    width: '300px',
    padding: '8px 0',
    borderRadius: 6,
    fontWeight: 'bold',
    marginTop: 20,
    cursor: 'pointer',
    border: 'none',
};

const googleBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    width: '300px',
    padding: '8px 0',
    borderRadius: 6,
    fontWeight: 'bold',
    marginTop: 20,
    cursor: 'pointer',
    borderColor: '#00A3EF',
};

const Login = () => {
    const handleKakaoLogin = () => {
        const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_KEY;
        const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
        
        console.log("카카오 로그인 버튼 클릭됨");

        window.location.href = kakaoAuthUrl;
    };

    const handleGoogleLogin = () => {
            const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
            const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline`;
            window.location.href = googleAuthUrl;
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20, textAlign: 'center'}}>
            <img src="/img/Neezy 로고2.png" alt="Neezy 로고" style={{ width: 180, marginBottom: 30 }} />

            <h2>회원 로그인</h2><br />

            <button style={kakaoBtnStyle} onClick={handleKakaoLogin}>
                <img src="/img/kakao.png" alt="카카오 로고"  style = {{width: 20, marginRight: 32}}/>
                카카오 로그인
            </button>

            <button style={googleBtnStyle} onClick={handleGoogleLogin}>
                <img src="/img/google.png" alt="구글 로고" style = {{width: 23, marginRight: 32}} />
                    구글 로그인
            </button>
        </div>
    );
};

export default Login;