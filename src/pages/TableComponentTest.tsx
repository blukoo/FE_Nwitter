import Table from "@/components/Cards/index";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState
} from "react";
import useGet from "@/hooks/useGet";
import { getTweetsApi,updateTweetsApi,insertTweetsApi,deleteTweetsApi } from "@/services/pages/TableComponentTestApi";
import { UseAuthContext } from "@/contexts/AuthContext";
import usePost from "@/hooks/usePost";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
export default function TableComponentTest() {
  const { setPopup } = UseModalPopupContext();
  const id = useId();
  // const { userInfo, setUserInfo, isLogin, setIsLogin } = UseAuthContext();
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") ?? sessionStorage.getItem("userInfo")
  );
  const { data: list } = useGet({
    queryKey: ["Tweets"],
    queryFn: async () => await getTweetsApi({ userId: userInfo.userId })
  });
  const [rowData, setRowData] = useState<any[]>([]);
  const [targetContent, setTargetContent] = useState({});
  const DATAFORM = { id: "new", text: "", image: "" };
  
  const { mutateAsync: insertTweetsMutate, data: insertTweetsRes } = usePost({
    queryKey: ["Tweets"],
    queryFn: insertTweetsApi
  });
  const { mutateAsync: updateTweetsMutate, data: updateTweetsRes } = usePost({
    queryKey: ["Tweets"],
    queryFn: updateTweetsApi
  });
  const { mutateAsync: deleteTweetsMutate, data: deleteTweetsRes } = usePost({
    queryKey: ["Tweets"],
    queryFn: deleteTweetsApi
  });
  // const { mutateAsync: loginMutate, data: loginRes } = usePost({
  //   queryKey: ["login"],
  //   queryFn: loginApi
  // });
  useEffect(() => {
    console.log(list, "list");
    setRowData(v => {
      if (typeof list === "object" && list.length) {
        return [...list];
      }
      return [];
    });
  }, [list]);
  const colData = useMemo(() => {
    return [
      { tag: "name", label: "이름" },
      { tag: "text", label: "내용" },
      { tag: "image", label: "이미지" }
    ];
  }, [list]);
  const onDeleteList = useCallback(async (r) => {
    try{
      if(r.id==="new"){
        setRowData(r=>{
          r.shift(); 
          return r
        })
        return
      }else{
        await deleteTweetsMutate({id:r.id,query:r})
      }
      setPopup("저장되었습니다");
    } catch(e){

      setPopup(e.message);
    }
  }, []);
  const onSaveList = useCallback(async (r) => {
    try{
      if(r.id==="new"){
        await insertTweetsMutate({query:r})
      }else{
        await updateTweetsMutate({id:r.id,query:r})
      }
      setPopup("저장되었습니다");
    } catch(e){

      setPopup(e.message);
    }
  }, [

  ]);
  return (
    <>
      <Table
        id={id}
        columnsData={colData}
        rowData={rowData}
        setRowData={setRowData}
        targetContent={targetContent} 
        setTargetContent={setTargetContent}
        onDeleteList={onDeleteList}
        onSaveList={onSaveList}
        dataForm={DATAFORM}
      />
    </>
  );
}
