import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import React, { useEffect, useCallback, useState } from "react";
import styles from "@/styles/components/ModalPopup/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal(props) {
  const { id, children, wrapStyle }: { id; children; wrapStyle? } = props;
  const { modalInfo, setModalInfo } = UseModalPopupContext();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(e => modalInfo[id]["visible"]);
  }, [modalInfo]);
  useEffect(() => {
    setVisible(e => modalInfo[id]["visible"]);
  }, [visible]);
  const onClose = useCallback(
    () =>
      setModalInfo(e => {
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
          <div className={styles.modal_inner_wrap} style={wrapStyle}>
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
