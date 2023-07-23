import React, { useCallback, useState } from "react";
import styled from "@/styles/pages/Login.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CheckBox from "@/components/Input/CheckBox";
import { loginApi } from "@/services/pages/Login";
import usePost from "@/hooks/usePost";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Popup } from "@/enum/Popup";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
  const { setPopup } = UseModalPopupContext();
  const { userInfo, setUserInfo, isLogin, setIsLogin } = useAuthContext(); // 회원정보

  const navigate = useNavigate();
  const { mutate: loginMutate, data: loginRes } = usePost({
    queryKey: ["login"],
    queryFn: loginApi
  });
  const onIdChange = useCallback(e => {
    setId(e.target.value);
  }, []);
  const onPasswordChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);
  const onSetAutoLogin = useCallback(e => {
    setIsAutoLogin(e.target.checked);
  }, []);
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
  const onLogin = async () => {
    if (!validateLogin()) return;
    await loginMutate({ userId: id, password });
    if (loginRes && loginRes.token) {
      setPopup("로그인 완료되었습니다", {
        [Popup.Confirm]: () => navigate("/home")
      });
    } else if (loginRes && loginRes.message) {
      setPopup(loginRes.message);
    }
  };
  return (
    <div>
      <div className={styled.login_wrap}>
        {JSON.stringify(loginRes)}
        <ul className={styled.login_inner_wrap}>
          <li className={styled.login_item}>
            <p className={styled.login_label_item}>아이디</p>
            <p className={styled.login_value_item}>
              <Input value={id} onChange={onIdChange} />
            </p>
          </li>
          <li className={styled.login_item}>
            <p className={styled.login_label_item}>비밀번호</p>
            <p className={styled.login_value_item}>
              <Input value={password} onChange={onPasswordChange} />
            </p>
          </li>

          <li className={styled.login_item}>
            <p className={styled.login_value_item}>
              <Button onClick={onLogin}>로그인</Button>
            </p>
          </li>
          <li className={styled.login_item}>
            <p className={styled.login_label_item}>자동로그인 </p>
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
