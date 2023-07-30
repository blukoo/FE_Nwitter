import { createContext, useContext, useEffect, useState } from "react";
import { ModalPopupStateType } from "@/types/types";
import { Popup } from "@/enum/Popup";
import { EnumType } from "typescript";
const ModalPopupContext = createContext(null);
export function ModalPopupContextProvider({ children }) {
  const [popupInfo, setPopupInfo] = useState<ModalPopupStateType>({
    type: "알림",
    visible: false,
    content: "",
    btnList: []
  });
  const [popupResult, setPopupResult] = useState<Popup>(Popup.Close);
  const [modalInfo, setModalInfo] = useState<any>({});
  type t = "Confirm" | "Close" | "Cancel";
  function setPopup(
    content: string,
    popupType: { [key in Popup]?: any } = {
      Confirm: () => {}
    }
  ) {
    let btnList: { word: string; func: Event | Function }[] = Object.entries(
      popupType
    ).map(item => {
      let btnType = item[0];
      let btnFunc = item[1];
      if (btnType === Popup.Confirm) {
        return {
          word: "확인",
          func: async () => {
            setPopupInfo(e => {
              return { ...e, visible: false };
            });
            await btnFunc();
          }
        };
      } else if (btnType === Popup.Close) {
        return {
          word: "닫기",
          func: async () => {
            setPopupInfo(e => {
              return { ...e, visible: false };
            });
            await btnFunc();
          }
        };
      } else if (btnType === Popup.Cancel) {
        return {
          word: "취소",
          func: async () => {
            setPopupInfo(e => {
              return { ...e, visible: false };
            });
            await btnFunc();
          }
        };
      }
    });
    setPopupInfo((e: ModalPopupStateType) => {
      return {
        ...e,
        visible: true,
        content,
        btnList
      };
    });
  }
  return (
    <ModalPopupContext.Provider
      // @ts-ignore
      value={{
        popupInfo,
        setPopupInfo,
        setPopup, //팝업 쉽게 세팅하게 하는 함수
        popupResult,
        modalInfo,
        setModalInfo
      }}
    >
      {children}
    </ModalPopupContext.Provider>
  );
}
export function UseModalPopupContext() {
  return useContext(ModalPopupContext);
}
