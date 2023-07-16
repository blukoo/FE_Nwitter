import { createContext, useContext, useEffect, useState } from "react";
import { UnknownObj } from "@/types/types";
export type CheckBoxPropsType = {
  checkBoxData: UnknownObj<boolean>;
  setCheckBoxData: any;
};

const CustomCheckBoxContext = createContext<CheckBoxPropsType>({
  checkBoxData: {},
  setCheckBoxData: () => {}
});
export default function CustomCheckBoxContextProvider({
  checkBoxData,
  setCheckBoxData,
  children
}) {
  return (
    <CustomCheckBoxContext.Provider
      value={{
        checkBoxData: checkBoxData,
        setCheckBoxData: setCheckBoxData
      }}
    >
      {children}
    </CustomCheckBoxContext.Provider>
  );
}
export function UseCustomCheckBoxContext() {
  return useContext(CustomCheckBoxContext);
}
