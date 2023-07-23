import React, { useCallback, useState } from "react";
import styled from "@/styles/pages/Login.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CheckBox from "@/components/Input/CheckBox";
import { loginApi } from "@/services/pages/Login";
import usePost from "@/hooks/usePost";
export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);

  const { mutate: loginMutate } = usePost({
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
  const onLogin = () => {
    loginMutate.mutate({ userId: id, password });
  };
  return (
    <div>
      <div className={styled.login_wrap}>
        <ul>
          <li>
            {id + "아이디"}
            <span>아이디</span>
            <Input value={id} onChange={onIdChange} />
          </li>
          <li>
            {password + "비밀번호"}
            <span>비밀번호</span>
            <Input value={password} onChange={onPasswordChange} />
          </li>
          <Button onClick={onLogin}>로그인</Button>
          자동로그인{" "}
          <CheckBox value={isAutoLogin} onChange={onSetAutoLogin}></CheckBox>
        </ul>
      </div>
    </div>
  );
}
