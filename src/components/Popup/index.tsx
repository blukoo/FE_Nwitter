import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import React, { useEffect, useCallback } from "react";
import { EnumType } from "typescript";
import styles from "@/styles/components/ModalPopup/Popup.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Popup as BtnType } from "@/enum/Popup";
export default function Popup() {
  const { popupState, popupAction } = UseModalPopupContext();
  const onClose = useCallback(
    () =>
      popupAction(e => {
        return { ...e, isOpen: false };
      }),
    []
  );

  return (
    <>
      {popupState.isOpen ? (
        <div className={styles.popup_wrap}>
          <div className={styles.popup_inner_wrap}>
            <div className={styles.type_wrap}>
              <div className={styles.type}>{popupState.type}</div>
              <p onClick={onClose}>
                <AiOutlineClose />
              </p>
            </div>
            <div className={styles.content_wrap}>{popupState.content}</div>
            <div className={styles.btn_list_wrap}>
              {popupState.btnList?.map((item, idx) =>
                item === BtnType.Close ? (
                  <button onClick={onClose} key={idx}>
                    취소
                  </button>
                ) : (
                  <button onClick={item.func} key={idx}>
                    {item.word}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
