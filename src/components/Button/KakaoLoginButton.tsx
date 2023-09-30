import React, { useCallback, useEffect, useRef } from "react";
import styled from "@/styles/components/Button/KakaoLoginButton.module.scss";
import KakaoLogin from "react-kakao-login";
import Button from ".";
export default function KakaoLoginButton({isAutoLogin}) {
  const kakaoKey = process.env.REACT_APP_KAKAO_KEY; //REST API KEY
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${redirectUri}&response_type=code`;
  const handleLogin = () => {
    localStorage.setItem("isAutoLogin",isAutoLogin)
    window.location.href = kakaoURL+`&isAutoLogin=${isAutoLogin}`;
  };
  return <Button onClick={handleLogin}>카카오 로그인</Button>;
}
