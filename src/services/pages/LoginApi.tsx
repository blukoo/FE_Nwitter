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
export function findKakaoUserApi({ kakaoId }) {
  console.log(kakaoId, "@@@@@@@@@@");
  const url = `/users/find_kakao_user`;
  return api.get({
    url,
    query: { kakaoId }
  });
}

export function kakaoLoginApi({ kakaoId, password }) {
  const url = `/users/kakao_login`;
  return api.post({
    url,
    query: { kakaoId, password }
  });
}

export function signupApi(userInfo) {
  console.log(userInfo, "@@@@@@@@@@");
  const url: string = `/users/signup`;
  return api.post({
    url,
    query: userInfo
  });
}
export function kakaoSignupApi(userInfo) {
  console.log(userInfo, "@@@@@@@@@@");
  const url: string = `/users/kakao_signup`;
  return api.post({
    url,
    query: userInfo
  });
}
