import api from "@/utils/axios";
import axios from "axios";
export function loginApi({ userId, password }) {
  console.log(userId, password, "@@@@@@@@@@");
  const url = `/users/login`;
  return api.post({
    url,
    query: { userId, password }
  });
}
export function findUserApi({ userId }) {
  console.log(userId, "@@@@@@@@@@");
  const url = `/users/find_user`;
  return api.get({
    url,
    query: { userId }
  });
}

export function kakaoLoginApi({ code }) {
  const kakaoKey = process.env.REACT_APP_KAKAO_KEY; //REST API KEY
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL; //Redirect URI
  const url: string = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoKey}&redirect_uri=${redirectUri}&code=${code}`;
  return new Promise(res => url);
}

export function signupApi(userInfo) {
  console.log(userInfo, "@@@@@@@@@@");
  const url: string = `/users/signup`;
  return api.post({
    url,
    query: userInfo
  });
}
