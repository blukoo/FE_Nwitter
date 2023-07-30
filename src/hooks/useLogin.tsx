import { UseAuthContext } from "@/contexts/AuthContext";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import { Popup } from "@/enum/Popup";

const INIT_USER_INFO = {
  userId: "",
  password: "",
  name: "",
  url: "",
  email: ""
};
export default function useLogin({
  setIsLogin,
  setUserInfo,
  setPopup,
  navigate
}: {
  setIsLogin?;
  setUserInfo?;
  setPopup?;
  navigate?;
}) {
  function setLogout() {
    setUserInfo(e => INIT_USER_INFO);
    setIsLogin(e => false);
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    } else if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
    }
  }
  async function setLogin(res, isAutoLogin?) {
    if (res?.token) {
      setIsLogin(e => true);
      if (isAutoLogin) {
        localStorage.setItem("token", res.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", res.token);
        localStorage.removeItem("token");
      }

      setPopup("로그인 완료되었습니다", {
        [Popup.Confirm]: () => navigate("/home")
      });
    } else if (res?.message) {
      setPopup(res.message);
    }
  }
  return {
    setLogout,
    setLogin
  };
}
