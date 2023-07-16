import React, { createContext } from "react";

// AppContext 객체를 생성한다.
export default function usePrice({
  price,
  rate
}: {
  price: string | number;
  rate: string | number;
}) {
  const AppContext = createContext(null);

  const App = () => {
    const initialValue = {
      price: 0,
      rate: 0
   };
   

    return;
  };
}
