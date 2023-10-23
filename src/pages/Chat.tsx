import { UnknownObj, UserInfoType } from "@/types/types";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import {
  getChatApi,
  createChatApi,
  updateChatApi
} from "@/services/pages/ChatApi";
import { UseUtilsContext } from "@/contexts/UtilsContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@/styles/pages/Chat.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";

function Chat({
  friendShipInfo,
  myInfo
}: {
  friendShipInfo: UnknownObj;
  myInfo: UserInfoType;
}) {
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
  const { mutateAsync: updateChatMutate, data: updateChatRes } = usePost({
    queryKey: ["Tweets"],
    queryFn: updateChatApi
  });
  const [writingMessage, setWritingMessage] = useState("");

  //반복문을 돌리기 위한 메세지 수가 많은 messag의 갯수
  const messageList = useMemo(() => {
    if (!chatData.id) return [];
    return chatData.messageList;
  }, [chatData]);
  const [isConnectUser, setIsConnectUser] = useState("부재중");
  useEffect(() => {
    console.log(chatData, "chatData");
    const handleChat = async () => {
      try {
        if (!chatData.id) {
          let res = await createChatMutate({ friendId: friendInfo.id });
          console.log(res, "res", chatData);
          chatFetch();
        }
      } catch (e) {
        console.log(e);
      }
    };
    handleChat();
    return () => {};
  }, [chatData]);

  useEffect(() => {
    
    socketClient.io.on();
    socketClient.io.emit("enter_chat", {...chatData,userId:myInfo.id});
    socketClient.io.on("getChat", () => {
      alert("getChat");
      chatFetch();
    });
    socketClient.io.on("welcome", sendData => {
      alert("접속중");
      console.log(sendData,"접속중")
      setIsConnectUser("접속중");
    });
    socketClient.io.on("bye", sendData => {
      alert("부재중");
      console.log(sendData,"부재중")
      setIsConnectUser("부재중");
    });
    return () => {
      socketClient.io.emit("out_chat", {...chatData,userId:myInfo.id});
      socketClient.io.off();
    };
    return () => {
    };
  }, []);
  useEffect(() => {
  }, [socketClient]);
  const handleWriteMessage = useCallback(e => {
    setWritingMessage(e.target.value);
  }, []);
  const submitMessaage = useCallback(async () => {
    if (!chatData.id) {
      return;
    }
    let res = await updateChatMutate({
      chatId: chatData.id,
      query: { friendId: chatData?.friend1Info.id, message: writingMessage }
    });
    socketClient.io.emit("sendMessage");
    console.log(res, "sss");
  }, [chatData, writingMessage]);
  return (
    <div className={styled.chat_wrap}>
      <ul className={styled.message_chat_wrap}>
        {messageList.map((chat, idx) => (
          <li
            className={`${styled.chat_item_wrap} ${
              chat.id === myInfo.id
                ? styled.my_message_left
                : styled.my_message_right
            }`}
            key={idx}
          >
            <div className={styled.chat_item}>
              {isConnectUser}인
              <span className={styled.chat_nickname}>{chat.nickname}???</span>
              <span className={styled.chat_message}>{chat.message}!!!</span>
            </div>
          </li>
        ))}
      </ul>
      <ul className={styled.write_chat_item_wrap}>
        <li>
          {myInfo.nickname} <Input onInput={handleWriteMessage} />
          <span>
            <Button onClick={submitMessaage}>보내기</Button>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Chat;
