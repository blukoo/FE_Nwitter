import { UserInfoType } from "@/types/types";
import { Dispatch, createContext, useContext, useState } from "react";
interface AuthType {
  userInfo: UserInfoType;
  setUserInfo: Dispatch<any>;
  isLogin: boolean;
  setIsLogin: Dispatch<any>;
  isAutoLogin: boolean;
  setIsAutoLogin: Dispatch<any>;
}
const AuthContext = createContext<AuthType>({
  userInfo: {
    id: 0,
    userId: "",
    password: "",
    nickname: "",
    name: "",
    url: "",
    email: ""
  }, //화원정보
  setUserInfo: () => {},
  // isLogin: false, //로딩 여부

  isLogin: !!(localStorage.getItem("token") || sessionStorage.getItem("token")), //로딩 여부
  setIsLogin: () => {},
  isAutoLogin: false, //자동로그인
  setIsAutoLogin: () => {}
});

export function AuthContextProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<any>(
    {
      userId: "",
      password: "",
      name: "",
      url: "",
      email: ""
    } //화원정보
  );
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
  return (
    // @ts-ignore
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLogin,
        setIsLogin,
        isAutoLogin,
        setIsAutoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuthContext() {
  return useContext(AuthContext);
}
