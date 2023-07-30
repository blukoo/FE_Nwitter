import { UserInfoType } from "@/types/types";
import { Dispatch, createContext, useContext, useState } from "react";
interface AuthType {
  userInfo: UserInfoType;
  setUserInfo: Dispatch<any>;
  isLogin: boolean;
  setIsLogin: Dispatch<any>;
}
const AuthContext = createContext<AuthType>({
  userInfo: {
    userId: "",
    password: "",
    name: "",
    url: "",
    email: ""
  }, //화원정보
  setUserInfo: () => {},
  isLogin: false, //로딩 여부
  setIsLogin: () => {}
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
  return (
    // @ts-ignore
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLogin,
        setIsLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuthContext() {
  return useContext(AuthContext);
}
