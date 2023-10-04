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
import {
  getTweetsApi,
  updateTweetsApi,
  updateTweetsImageApi,
  insertTweetsApi,
  insertTweetsImageApi,
  deleteTweetsApi
} from "@/services/pages/TableComponentTestApi";
import { UseUtilsContext } from "@/contexts/UtilsContext";

import usePost from "@/hooks/usePost";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
export default function TableComponentTest() {
  const { socketClient } = UseUtilsContext();
  const { setPopup } = UseModalPopupContext();
  const id = useId();
  // const { userInfo, setUserInfo, isLogin, setIsLogin } = UseAuthContext();
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") ?? sessionStorage.getItem("userInfo")
  );
  const { data: list, refetch } = useGet({
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
  const { mutateAsync: insertTweetsImageMutate, data: insertTweetsImageRes } =
    usePost({
      queryKey: ["Tweets"],
      queryFn: insertTweetsImageApi
    });
  const { mutateAsync: updateTweetsImageMutate, data: updateTweetsImageRes } =
    usePost({
      queryKey: ["Tweets"],
      queryFn: updateTweetsImageApi
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
  useEffect(() => {
    socketClient.io.on("getTweets", () => {
      refetch();
    });
  }, []);
  const colData = useMemo(() => {
    return [
      { tag: "name", label: "이름" },
      { tag: "text", label: "내용" },
      { tag: "image", label: "이미지" }
    ];
  }, [list]);
  const onDeleteList = useCallback(async r => {
    try {
      if (r.id === "new") {
        setRowData(r => {
          r.shift();
          return r;
        });
        return;
      } else {
        await deleteTweetsMutate({ id: r.id, query: r });
      }
      setPopup("저장되었습니다");
    } catch (e) {
      setPopup(e.message);
    }
  }, []);
  const onSaveList = useCallback(async r => {
    try {
      let formData = new FormData();
      for (let k in r) {
        if (k === "_image") {
          // var reader = new FileReader();
          // reader.addEventListener('load', readFile);
          // reader.readAsDataURL(r[k]);
          // // let a
          // reader.onload=()=>{
          //   a=reader.result
          // }
          // console.log("r[k]r[k]",r[k].blob(),reader)
          console.log(r[k], "sss");
          formData.append("image", r[k]);
          continue;
        } else if (k === "image") {
          continue;
        }
        // formData.append(k, r[k]);
      }
      for (let [name, value] of [...formData]) {
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
      }
      console.log(...formData, "formdata");
      if (r.id === "new") {
        let res = await insertTweetsMutate({ query: r });
        if (formData.get("image")) {
          await updateTweetsImageMutate({ id: res.id, query: formData });
        }
      } else {
        let insert = { ...r };
        delete insert.image;
        delete insert._image;
        await updateTweetsMutate({
          id: r.id,
          query: insert
        });
        if (formData.get("image")) {
          await updateTweetsImageMutate({ id: r.id, query: formData });
        }
      }
      setPopup("저장되었습니다");
      console.log(socketClient, "socketClient");
      socketClient.io.emit("saveTweets", a => {
        console.log("소켓");
      });
    } catch (e) {
      setPopup(e.message);
    }
  }, []);
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
