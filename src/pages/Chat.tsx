import { UnknownObj, UserInfoType } from "@/types/types";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { getChatApi, createChatApi } from "@/services/pages/ChatApi";
import { UseUtilsContext } from "@/contexts/UtilsContext";
import { useEffect, useMemo } from "react";

function Chat({
  friendShipInfo,
  myInfo
}: {
  friendShipInfo: UnknownObj;
  myInfo: UserInfoType;
}) {
  let userInfo = JSON.parse(
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
  );
  const friendInfo = useMemo(() => {
    if (friendShipInfo) {
      return friendShipInfo.requestFriend.id !== myInfo.id
        ? friendShipInfo.requestFriend
        : friendShipInfo.replyFriend;
    }
  }, [friendShipInfo]);
  const { socketClient } = UseUtilsContext();
  const {
    data: chatData,
    refetch: chatFetch
  }: { data: UnknownObj<any>; refetch: any } = useGet({
    queryKey: ["Chat"],
    queryFn: async () =>
      await getChatApi({
        friendShipId: friendShipInfo.id,
        friendId: friendInfo.id
      })
  });

  const { mutateAsync: createChatMutate, data: createChatRes } = usePost({
    queryKey: ["Tweets"],
    queryFn: createChatApi
  });
  useEffect(() => {
    console.log(chatData, "chatData");
    const handleChat = async () => {
      try {
        if (chatData) {
          if (!chatData.id) {
            let res = await createChatMutate({ friendId: friendInfo.id });
            console.log(res, "res", chatData);
            chatFetch();
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    handleChat();
  }, [chatData]);
  return (
    <>
      <ul>
        <li>{JSON.stringify(myInfo)}</li>
        <br /> <br /> <br />
        <li>{JSON.stringify(friendInfo)}</li>
        <li>{JSON.stringify(chatData)}</li>
      </ul>
    </>
  );
}

export default Chat;
