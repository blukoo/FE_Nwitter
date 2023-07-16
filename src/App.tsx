import { Suspense, useEffect } from "react";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MutateContextProvider } from "@/contexts/MutateContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/Layout";
import "@/styles/App.scss";
import UtilsContextProvider from "@/contexts/UtilsContext";
import { PopupPortal } from "@/components/Popup/PopupPortal";
import { ModalPopupContextProvider } from "@/contexts/ModalPopupContext";
import Popup from "@/components/Popup";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});
function App() {
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
