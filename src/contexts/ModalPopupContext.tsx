import { createContext, useContext, useEffect, useState } from "react";
import { ModalPopupStateType } from "@/types/types";
const ModalPopupContext = createContext(null);
export function ModalPopupContextProvider({ children }) {
  const [popupInfo, setPopupInfo] = useState<ModalPopupStateType>({
    type: "알림",
    isOpen: false,
    content: "",
    btnList: [],
  });
  const [modalInfo, setModalInfo] = useState<any>({});
  return (
    <ModalPopupContext.Provider
      // @ts-ignore
      value={{
        popupState: popupInfo,
        popupAction: setPopupInfo,
        modalState: modalInfo,
        modalAction: setModalInfo,
      }}
    >
      {children}
    </ModalPopupContext.Provider>
  );
}
export function UseModalPopupContext() {
  return useContext(ModalPopupContext);
}
