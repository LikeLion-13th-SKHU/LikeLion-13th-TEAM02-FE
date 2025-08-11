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
        const REST_API_KEY = "5DE85E47FB0DAB85BCA11AA59571E396";
        const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
        
        console.log("카카오 로그인 버트 클릭됨");

        window.location.href = kakaoAuthUrl;
    };

    return (
        <div style={{ maxwidth: 400, margin: 'auto', padding: 20, textAlign: 'center'}}>
            <img src="/img/Neezy 로고2.png" alt="Neezy 로고" style={{ width: 180, marginBottom: 30 }} />

            <h2>회원 로그인</h2><br />

            <button style={kakaoBtnStyle} onClick={handleKakaoLogin}>
                <img src="/img/kakao.png" alt="카카오 로고"  style = {{width: 20, marginRight: 32}}/>
                카카오 로그인
            </button>

            <button style={googleBtnStyle}>
                <img src="/img/google.png" alt="구글 로고" style = {{width: 23, marginRight: 32}} />
                    구글 로그인
            </button>
        </div>
    );
};

export default Login;