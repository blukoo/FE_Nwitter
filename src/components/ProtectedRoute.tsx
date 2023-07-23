import { useAuthContext, AuthContextProvider } from "@/contexts/AuthContext";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Popup } from "@/enum/Popup";
export default function ProtectedRoute({ children }: { children }) {
  const { setPopup, popupResult } = UseModalPopupContext();
  const { isLogin } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      setPopup("로그인 부터 해주시기 바랍니다", [
        {
          [Popup.Confirm]: () => navigate("/")
        }
      ]);
    }
  }, []);
  return children;
}
