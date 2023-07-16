import Button from "@/components/Button";
import StatusInput from "@/components/Input/StatusInput";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function HeaderLogin({ setIsOpen }) {
  //hook
  const { userInfo, setUserInfo, isLogin, setIsLogin } = useAuthContext(); // 회원정보
  //useState
  const [user, setUser] = useState({ name: "", password: "" });
  //useEffect
  //function
  const onNameChange = e => {
    setUser(u => {
      return { ...u, name: (e.target as HTMLInputElement).value };
    });
  };
  const onPasswordChange = e => {
    setUser(u => {
      return { ...u, password: (e.target as HTMLInputElement).value };
    });
  };
  const onLogin = () => {
    console.log(userInfo);
    setIsLogin(e => true);
    setIsOpen(e => false);
    setUserInfo(item => {
      return {
        ...item,
        name: user.name,
        password: user.password
      };
    });
  };
  return (
    <div>
      <StatusInput
        type="text"
        value={user.name}
        onChange={onNameChange}
        style={{ color: "black" }}
        onClear={e =>
          setUser(u => {
            return { ...u, name: "" };
          })
        }
      ></StatusInput>
      <StatusInput
        type="text"
        value={user.password}
        onChange={onPasswordChange}
        style={{ color: "black" }}
        validation={/^[0-9]+$/}
        onClear={e =>
          setUser(u => {
            return { ...u, password: "" };
          })
        }
      />
      <Button onClick={onLogin}>로그인</Button>
    </div>
  );
}
