//react
import { useCallback, useEffect, useRef, useState } from "react";
//style
import styles from "@/styles/Layout/Header/index.module.scss";
import { AiOutlineLogin } from "react-icons/ai";
//component
import Navbar from "@/components/Layout/Header/Navbar";
import FixedComponent from "@/components/FixedComponent";
import HeaderLogin from "./HeaderLogin";
import { UseAuthContext } from "@/contexts/AuthContext";
//hook
import { Mobile, Tablet, PC } from "@/hooks/useMedia";
import Button from "@/components/Button";
import useLogin from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  //ref
  const loginClose = useRef(null);
  const {
    setIsLogin: _setIsLogin,
    setUserInfo,
    isLogin: _isLogin
  } = UseAuthContext(); // 회원정보
  const [isLogin, setIsLogin] = useState(_isLogin);
  const { setLogin, setLogout } = useLogin({ setIsLogin, setUserInfo });
  useEffect(() => {
    setIsLogin(_ => _isLogin);
  }, [_isLogin]);
  const onLogin = useCallback(() => {
    navigate("/login");
  }, []);
  const onLogout = useCallback(() => {
    setLogout();
    navigate("/login");
  }, []);
  return (
    <header className={styles.header_wrap} id="header">
      <div className={styles.inner_header_wrap}>
        <Mobile>
          <div className={styles.mobile_navbar_wrap}>
            <Navbar />
            mobie
          </div>
        </Mobile>
        <Tablet>
          <div className={styles.mobile_navbar_wrap}>
            <Navbar />
            mobie
          </div>
        </Tablet>
        <div className={styles.title_wrap}>
          <span className={styles.point_letter}>L</span>IT
        </div>
        <div className={styles.login_wrap}>
          {isLogin ? (
            <Button onClick={onLogout}>로그아웃</Button>
          ) : (
            <Button onClick={onLogin}>로그인</Button>
          )}
          {/* 로그인 페이지로 이동하는 flow로 바꾸는게 좋을듯하지만 컴포넌트 테스트용으로*/}
          {/* <FixedComponent
            render={props => <HeaderLogin setIsOpen={props.setIsOpen} />}
            ShowElementRef={loginClose}
          >
            <p ref={loginClose}>
              <AiOutlineLogin></AiOutlineLogin>
            </p>
          </FixedComponent> */}
        </div>
      </div>
      <PC>
        <div className={styles.pc_navbar_wrap}>
          <Navbar />
        </div>
      </PC>
    </header>
  );
}
