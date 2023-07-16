import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import React, { useEffect, useCallback, useState } from "react";
import styles from "@/styles/components/ModalPopup/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal(props) {
  const { id, children } = props;
  const { modalState, modalAction } = UseModalPopupContext();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(e => modalState[id]["visible"]);
  }, [modalState]);
  useEffect(() => {
    setVisible(e => modalState[id]["visible"]);
  }, [visible]);
  const onClose = useCallback(
    () =>
      modalAction(e => {
        e[id].visible = false;
        return { ...e };
      }),
    []
  );

  return (
    <>
      {visible ? (
        <div
          // key={id}
          className={styles.modal_wrap}
        >
          <div className={styles.modal_inner_wrap}>
            <div className={styles.type_wrap}>
              {/* <div className={styles.type}>{modalState.type}</div> */}
              <p onClick={onClose}>
                <AiOutlineClose />
              </p>
            </div>
            <div className={styles.content_wrap}>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
