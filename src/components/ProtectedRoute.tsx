import { UseAuthContext, AuthContextProvider } from "@/contexts/AuthContext";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Popup } from "@/enum/Popup";
export default function ProtectedRoute({ children }: { children }) {
  const { setPopup } = UseModalPopupContext();
  const { isLogin } = UseAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    // if (!isLogin) {
    if(!localStorage.getItem("token") && !sessionStorage.getItem("token")){
      setPopup("로그인 부터 해주시기 바랍니다", {
        Confirm: () => navigate("/")
      });
    }
  }, []);
  return children;
}
