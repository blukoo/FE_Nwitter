import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import React, { useEffect, useCallback } from "react";
import { EnumType } from "typescript";
import styles from "@/styles/components/ModalPopup/Popup.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Popup as BtnType } from "@/enum/Popup";
export default function Popup() {
  const { popupInfo, setPopupInfo } = UseModalPopupContext();
  const onClose = useCallback(
    () =>
      setPopupInfo(e => {
        return { ...e, visible: false };
      }),
    []
  );

  return (
    <>
      {popupInfo.visible ? (
        <div className={styles.popup_wrap}>
          <div className={styles.popup_inner_wrap}>
            <div className={styles.type_wrap}>
              <div className={styles.type}>{popupInfo.type}</div>
              {/* <p onClick={onClose}> 
              <AiOutlineClose /> 
              </p> */}
            </div>
            <div className={styles.content_wrap}>{popupInfo.content}</div>
            <div className={styles.btn_list_wrap}>
              {popupInfo.btnList.map((item, idx) => (
                <button onClick={item.func} key={idx}>
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
