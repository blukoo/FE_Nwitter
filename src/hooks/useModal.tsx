import React, { useEffect, useId, useState } from "react";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";

export default function useModal() {
  const id = useId();
  const { modalState, modalAction } = UseModalPopupContext();
  useEffect(() => {
    modalAction((e) => {
      e[id] = { visible: false };
      return e;
    });
  }, []);
  const showModal = () => {
    modalAction((e) => {
      e[id].visible = true;
      return { ...e };
    });
  };
  const closeModal = () => {
    modalAction((e) => {
      e[id].visible = false;
      return { ...e };
    });
  };
  return { id, showModal, closeModal };
}
