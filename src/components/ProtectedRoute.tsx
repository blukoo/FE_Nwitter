import { useAuthContext, AuthContextProvider } from "@/contexts/AuthContext";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import styles from "@/styles/pages/NeedLoginPage.module.scss";
import ModalPortal from "@/components/Modal/ModalPortal";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function ProtectedRoute({ children }: { children }) {
  const { popupState, popupAction } = UseModalPopupContext();
  const { isLogin } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      popupAction(e => {
        return {
          ...e,
          isOpen: true,
          content: "로그인 부터 해주시기 바랍니다",
          btnList: [
            {
              word: "확인",
              func: () => {
                popupAction(e => {
                  return { ...e, isOpen: false };
                });
                navigate("/");
              }
            }
          ]
        };
      });
    }
  }, []);
  return children;
}
