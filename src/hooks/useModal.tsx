import React, { useEffect, useId, useState } from "react";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";

export default function useModal() {
  const id = useId();
  const { modalInfo, setModalInfo } = UseModalPopupContext();
  useEffect(() => {
    setModalInfo(e => {
      e[id] = { visible: false };
      return e;
    });
  }, []);
  const showModal = () => {
    setModalInfo(e => {
      e[id].visible = true;
      return { ...e };
    });
  };
  const closeModal = () => {
    setModalInfo(e => {
      e[id].visible = false;
      return { ...e };
    });
  };
  return { id, showModal, closeModal };
}
