import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { UseUtilsContext } from "@/contexts/UtilsContext";
import { UseMutateContext } from "@/contexts/MutateContext";
import "@/styles/Layout/index.scss";
import { useEffect } from "react";
import { UseAuthContext } from "@/contexts/AuthContext";
export default function Layout() {
  const { action } = UseUtilsContext();
  const { state: mutateState, action: mutateAction } = UseMutateContext();
  const { setIsLogin, setUserInfo } = UseAuthContext();

  const setCurrentTarget = $event => {
    console.log($event.target, "target");
    action.setTarget($event.target);
  };
  useEffect(() => {
    if (
      localStorage.getItem("userInfo") ||
      sessionStorage.getItem("userInfo")
    ) {
      const { token, userId, nickname, url, email } = JSON.parse(
        localStorage.getItem("userInfo") ?? sessionStorage.getItem("userInfo")
      );
      if (token) {
        setIsLogin(true);
        setUserInfo(e => {
          return { userId, nickname, url, email };
        });
      }
    } else {
      setIsLogin(false);
    }
  }, [localStorage.getItem("token"), sessionStorage.getItem("token")]);
  return (
    <>
      {/* get은 suspense로 확인가능 */}
      {/* cud api를 하는 중이라면 loading 페이지가 나오도록 */}
      {mutateState.state.isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            color: "#fff",
            position: "fixed",
            left: 0,
            top: 0
          }}
        >
          로딩중
        </div>
      ) : null}
      <div onClick={setCurrentTarget} id="app_wrap">
        <Header />
        <div id="layout_content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
