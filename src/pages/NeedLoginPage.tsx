import React, { useEffect } from "react";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import styles from "@/styles/pages/NeedLoginPage.module.scss";
import ModalPortal from "@/components/Modal/ModalPortal";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { Link } from "react-router-dom";
export default function NeedLoginPage() {
  const { setPopupInfo } = UseModalPopupContext();
  const { id, showModal, closeModal } = useModal();
  const { id: other_id, showModal: other_showModal } = useModal();
  const setButton = () => {
    setPopupInfo(e => {
      return {
        ...e,
        visible: true,
        content: "팝업",
        btnList: [
          {
            word: "확인",
            func: () => {
              alert();
            }
          },
          {
            word: "취소",
            func: () => {
              setPopupInfo(e => {
                return { ...e, visible: false };
              });
            }
          }
        ]
      };
    });
  };
  const setModalButton = () => {
    showModal();
  };
  const setOherModalButton = () => {
    other_showModal();
  };
  return (
    <>
      <AuthContextProvider>
        <div id="wrap">TestIndex</div>
        <Link to="/test1">테스트1</Link>
        <div className={styles.test}>TestIndex</div>
        <button onClick={setButton}>버튼</button>
        <button onClick={setModalButton}>모달버튼</button>
        <button onClick={setOherModalButton}>모달버튼22</button>

        <ModalPortal>
          <Modal id={id}>test</Modal>
        </ModalPortal>
        <ModalPortal>
          <Modal id={other_id}>othertest</Modal>
        </ModalPortal>
      </AuthContextProvider>
    </>
  );
}
