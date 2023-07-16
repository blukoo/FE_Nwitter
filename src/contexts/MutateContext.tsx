import { useContext, createContext, useState } from "react";
const MutateContext = createContext(null);

export function MutateContextProvider({ children }) {
  const [state, action] = useState({
    isLoading: false,
    isError: false,
  });
  return (
    <>
      <MutateContext.Provider
        // @ts-ignore
        value={{ state: { state }, action: { action } }}
      >
        {children}
      </MutateContext.Provider>
    </>
  );
}
export function UseMutateContext() {
  return useContext(MutateContext);
}
