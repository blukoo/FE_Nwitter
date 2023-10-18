import { UnknownObj, UserInfoType } from "@/types/types";
import useGet from "@/hooks/useGet";
import { getChatApi } from "@/services/pages/ChatApi";
import { UseUtilsContext } from "@/contexts/UtilsContext";
import { useMemo } from "react";

function Chat({
  friendInfo,
  myInfo
}: {
  friendInfo: UnknownObj;
  myInfo: UserInfoType;
}) {
  let userInfo = JSON.parse(
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
  );
  const friendInfoData = useMemo(() => {
    if(friendInfo){
      return friendInfo.requestFriend.id === myInfo.id?friendInfo.requestFriend:friendInfo.replyfriend
    }
  }, [friendInfo]);
  const { socketClient } = UseUtilsContext();
  const { data: friendList, refetch: friendFetch } = useGet({
    queryKey: ["Friend"],
    queryFn: async () =>
      await getChatApi({ friendId: friendInfo.id, myId: myInfo.id })
  });
  return (
    <>
      <ul>
        <li>{JSON.stringify(myInfo)}</li>
        <br /> <br /> <br />
        <li>{JSON.stringify(friendInfoData)}</li>
      </ul>
    </>
  );
}

export default Chat;
