import { createContext, useContext, useEffect, useState } from "react";
import Socket from "@/network/socket";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const socketClient = new Socket(baseURL, () => localStorage.getItem("token") || sessionStorage.getItem("token"));
const UtilsContext = createContext(null);

export default function UtilsContextProvider({ children }) {
  const [target, setTarget] = useState(null); // 현재 클릭된 element target
  return (
    <>
      <UtilsContext.Provider
        // @ts-ignore
        value={{ state: { target }, action: { setTarget }, socketClient }}
      >
        {children}
      </UtilsContext.Provider>
    </>
  );
}
export function UseUtilsContext() {
  return useContext(UtilsContext);
}
