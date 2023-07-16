//react
import { useRef } from "react";
//style
import styles from "@/styles/Layout/Header/index.module.scss";
import { AiOutlineLogin } from "react-icons/ai";
//component
import Navbar from "@/components/Layout/Header/Navbar";
import FixedComponent from "@/components/FixedComponent";
import HeaderLogin from "./HeaderLogin";
//hook
import { Mobile, Tablet, PC } from "@/hooks/useMedia";
export default function Header() {
  //ref
  const loginClose = useRef(null);
  return (
    <header id={styles.header_wrap}>
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
          {/* 로그인 페이지로 이동하는 flow로 바꾸는게 좋을듯하지만 컴포넌트 테스트용으로*/}
          <FixedComponent
            render={props => <HeaderLogin setIsOpen={props.setIsOpen} />}
            ShowElementRef={loginClose}
          >
            <p ref={loginClose}>
              <AiOutlineLogin></AiOutlineLogin>
            </p>
          </FixedComponent>
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
