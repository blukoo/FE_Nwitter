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
  const { mutateAsync: updateChatMutate, data: updateChatRes } = usePost({
    queryKey: ["Tweets"],
    queryFn: updateChatApi
  });
  const [writingMessage, setWritingMessage] = useState("");
  const myMessage = useMemo(() => {
    if (chatData.id) {
      return chatData.friend1Info.id === myInfo.id
        ? chatData.friend1Msg
        : chatData.friend2Msg;
    }
    return [];
  }, [chatData]);

  const friendMessage = useMemo(() => {
    if (chatData.id) {
      return chatData.friend1Info.id === myInfo.id
        ? chatData.friend2Msg
        : chatData.friend1Msg;
    }
    return [];
  }, [chatData]);

  //반복문을 돌리기 위한 메세지 수가 많은 messag의 갯수
  const messageList = useMemo(() => {
    if (chatData) return [];
    let arr = [];
    console.log(chatData, chatData.friend1Msg, "sss");

    for (let i = 0; i < Math.max(myMessage.length, friendMessage.length); i++) {
      arr.push(chatData.friend1Msg[i], chatData.friend2Msg[i]);
    }
    return arr;
  }, [chatData]);
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
    chatFetch();
    console.log(res, "sss");
  }, [chatData,writingMessage]);
  return (
    <>
      <ul
        className={`${
          chatData?.friend1Info?.id === myInfo.id
            ? styled.my_message_left
            : styled.my_message_right
        } ${styled.my_message_left}`}
      >
        {/* <li>{JSON.stringify(myInfo)}</li>
        <br /> <br /> <br />
        <li>{JSON.stringify(friendInfo)}</li>*/}
        <li>{JSON.stringify(chatData)}</li>
        {JSON.stringify(messageList)}
        {messageList.map((chat, idx) => (
          <li className={styled.chat_item_wrap} key={idx}>
            {chat.nickname}
          </li>
        ))}
      </ul>
      writingMessage:{writingMessage}
      <ul>
        <li>
          {myInfo.nickname} <Input onInput={handleWriteMessage} />
          <span>
            <Button onClick={submitMessaage}>보내기</Button>
          </span>
        </li>
      </ul>
    </>
  );
}

export default Chat;
