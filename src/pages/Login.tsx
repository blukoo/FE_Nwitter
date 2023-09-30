import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@/styles/pages/Login.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CheckBox from "@/components/Input/CheckBox";
import {
  kakaoLoginApi,
  loginApi,
  findUserApi,
  findKakaoUserApi,
  signupApi,
  kakaoSignupApi
} from "@/services/pages/Login";
import usePost from "@/hooks/usePost";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import { UseAuthContext } from "@/contexts/AuthContext";
import { Popup } from "@/enum/Popup";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import KakaoLoginButton from "@/components/Button/KakaoLoginButton";
export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
  const { setPopup } = UseModalPopupContext();
  const {
    userInfo,
    setUserInfo,
    isLogin,
    setIsLogin,
    isAutoLogin,
    setIsAutoLogin
  } = UseAuthContext(); // 회원정보

  const navigate = useNavigate();
  const { mutateAsync: loginMutate, data: loginRes } = usePost({
    queryKey: ["login"],
    queryFn: loginApi
  });
  const { mutateAsync: kakaoLoginMutate, data: kakaoLoginRes } = usePost({
    queryKey: ["kakaoLogin"],
    queryFn: kakaoLoginApi
  });
  const { mutateAsync: signupMutate, data: signupRes } = usePost({
    queryKey: ["signup"],
    queryFn: signupApi
  });
  const { mutateAsync: kakaoSignupMutate, data: kakaoSignupRes } = usePost({
    queryKey: ["kakaoSignup"],
    queryFn: kakaoSignupApi
  });
  const { mutateAsync: kakaoUserMutate, data: kakaoUserRes } = usePost({
    queryKey: ["kakaoUser"],
    queryFn: findKakaoUserApi
  });
  const { setLogin } = useLogin({
    setIsLogin,
    setUserInfo,
    setPopup,
    navigate
  });
  const [isNotEmpty, setIsNotEmpty] = useState(false);
  useEffect(() => {
    if (isLogin) {
      navigate("/Home");
    }
  }, [isLogin]);
  const onIdChange = useCallback(e => {
    setId(e.target.value);
  }, []);
  const onPasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);
  const onSetAutoLogin = useCallback(
    e => {
      debugger;
      setIsAutoLogin(e.target.checked);
    },
    [isAutoLogin]
  );
  useMemo(() => {
    if (id && password) {
      setIsNotEmpty(true);
    } else {
      setIsNotEmpty(false);
    }
  }, [id, password]);
  const validateLogin = () => {
    if (!id.trim()) {
      setPopup("아이디를 입력해주세요");
      return false;
    }
    if (!password.trim()) {
      setPopup("비밀번호를 입력해주세요");
      return false;
    }
    return true;
  };
  const onEnterLogin = async e => {
    if (e.code === "Enter" && isNotEmpty) {
      if (!validateLogin()) return;
      loginMutate({ userId: id, password }).then(res =>
        setLogin(res, isAutoLogin)
      );
    }
  };
  const onLogin = async e => {
    if (!validateLogin()) return;
    debugger;
    loginMutate({ userId: id, password }).then(res =>
      setLogin(res, isAutoLogin)
    );
  };
  useEffect(() => {
    const paramsData = new URL(document.location.toString());
    const params: any = new URL(document.location.toString()).searchParams;
    debugger;
    console.log(params, paramsData, isAutoLogin, "파람");
    //화면이 전환되면서 자동로그인 체크가 사라짐
    //그냥 localstorage에 저장
    let _isAutoLogin = localStorage.getItem("isAutoLogin");
    localStorage.removeItem("isAutoLogin");
    if (!params.size) return;
    let kakaoId;
    let kakaoUserInfo;
    const code = params.get("code");
    const kakaoKey = process.env.REACT_APP_KAKAO_KEY; //REST API KEY
    const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URL; //Redirect URI
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      body: `grant_type=authorization_code&client_id=${kakaoKey}&redirect_uri=${redirectUri}&code=${code}`
    })
      .then(res => res.json())
      .then(async data => {
        return await fetch("https://kapi.kakao.com/v2/user/me", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + data.access_token,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        });
      })
      .then(res => res.json())
      .then(res => {
        kakaoUserInfo = res;
        kakaoId = res.id;
        kakaoUserMutate({ kakaoId })
          .then(async (res: any) => {
            //카카오 로그인 일때
            if (!res.userInfo.id) {
              await kakaoSignupMutate({
                password: 1234,
                name: kakaoUserInfo.kakao_account.profile.nickname,
                email: kakaoUserInfo.kakao_account.email,
                url: kakaoUserInfo.kakao_account.profile.thumbnail_image_url,
                nickname: kakaoUserInfo.kakao_account.profile.nickname,
                kakaoId: kakaoUserInfo.id
              });
              return {
                kakaoId,
                password: 1234,
                name: kakaoUserInfo.kakao_account.profile.nickname,
                email: kakaoUserInfo.kakao_account.email,
                url: kakaoUserInfo.kakao_account.profile.thumbnail_image_url,
                nickname: kakaoUserInfo.kakao_account.profile.nickname
              };
            } else {
              kakaoLoginMutate({ kakaoId, password: 1234 }).then(res =>
                setLogin(res, _isAutoLogin)
              );
            }
          })
          .then(res => {
            console.log(res, "eee");
            if (kakaoId) {
              kakaoLoginMutate({ kakaoId, password: 1234 }).then(res =>
                setLogin(res, _isAutoLogin)
              );
            }
          });
      });
  }, [new URL(document.location.toString()).searchParams.size]);

  return (
    <div>
      <div className={styled.login_wrap}>
        <ul className={styled.login_inner_wrap}>
          <li className={styled.login_item}>
            <p className={styled.login_label_item}>아이디</p>
            <p className={styled.login_value_item}>
              <Input value={id} onChange={onIdChange} onKeyUp={onEnterLogin} />
            </p>
          </li>
          <li className={styled.login_item}>
            <p className={styled.login_label_item}>비밀번호</p>
            <p className={styled.login_value_item}>
              <Input
                value={password}
                onChange={onPasswordChange}
                onKeyUp={onEnterLogin}
              />
            </p>
          </li>

          <li className={styled.login_item}>
            <p className={styled.login_value_item}>
              <Button onClick={onLogin}>로그인</Button>
              <KakaoLoginButton isAutoLogin={isAutoLogin}></KakaoLoginButton>
            </p>
          </li>
          <li className={styled.login_item}>
            <p className={styled.login_label_item}>자동로그인 </p>
            {JSON.stringify(isAutoLogin) + "Sss"}
            <p className={styled.login_value_item}>
              <CheckBox
                value={isAutoLogin}
                onChange={onSetAutoLogin}
              ></CheckBox>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
