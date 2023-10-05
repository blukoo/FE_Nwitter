import { Suspense, useCallback, useEffect } from "react";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MutateContextProvider } from "@/contexts/MutateContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/Layout";
import "@/styles/App.scss";
import UtilsContextProvider from "@/contexts/UtilsContext";
import { PopupPortal } from "@/components/Popup/PopupPortal";
import {
  ModalPopupContextProvider,
} from "@/contexts/ModalPopupContext";
import { Popup as PopupEnum } from "@/enum/Popup";
import Popup from "@/components/Popup";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const handleError = useCallback(e => {
    alert(JSON.stringify(e));
    if (e.message.includes("Authentication")) {
      // setPopup("로그인 부터 해주시기 바랍니다", {
      // [PopupEnum.Confirm]: () =>

      if (localStorage.getItem("token")) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      } else if (sessionStorage.getItem("token")) {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
      }
      navigate("/home");
      // });
    }
  }, []);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        onError: e => handleError(e)
      }
    }
  });
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.height =
      window.innerHeight + "px";
  }, []);
  return (
    <Suspense fallback={<div>로딩중이에요!!!!</div>}>
      <QueryClientProvider client={queryClient}>
        <MutateContextProvider>
          {/* 권한관련 context */}
          <AuthContextProvider>
            {/* 현재 클릭한 target 세팅하는 context */}
            <UtilsContextProvider>
              <ModalPopupContextProvider>
                <Layout></Layout>
                <PopupPortal>
                  <Popup></Popup>
                </PopupPortal>
              </ModalPopupContextProvider>
            </UtilsContextProvider>
          </AuthContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </MutateContextProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
