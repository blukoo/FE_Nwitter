import React, { useCallback, useEffect, useState } from "react";
import useGet from "@/hooks/useGet";
import {
  getFriendApi,
  getRequestFriendApi,
  getReplyFriendApi,
  findUserApi,
  insertFriendApi,
  updateFriendApi,
  deleteFriendApi
} from "@/services/pages/FriendsApi";
import Friend from "@/components/Friend";
import Button from "@/components/Button";
import usePost from "@/hooks/usePost";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import Input from "@/components/Input";
import useDebounce from "@/hooks/useDebounce";
import { UseUtilsContext } from "@/contexts/UtilsContext";
import ModalPortal from "@/components/Modal/ModalPortal";
import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import Chat from "./Chat";
import { UserInfoType } from "@/types/types";
export default function Friends() {
  const { id, showModal, closeModal } = useModal();
  const [findUser, setFindUser] = useState("");
  const [targetFriend, setTargetFriend] = useState<UserInfoType | null>(null);
  const { setPopupInfo } = UseModalPopupContext();
  let userInfo = JSON.parse(
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
  );

  const { socketClient } = UseUtilsContext();
  const { data: friendList, refetch: friendFetch } = useGet({
    queryKey: ["Friend"],
    queryFn: async () => await getFriendApi({ id: userInfo?.id })
  });
  const { data: requestFriendList, refetch: requestFriendFetch } = useGet({
    queryKey: ["RequestFriend"],
    queryFn: async () => await getRequestFriendApi({ id: userInfo?.id })
  });
  const { data: replyDriendList, refetch: replyDriendFetch } = useGet({
    queryKey: ["ReplyFriend"],
    queryFn: async () => await getReplyFriendApi({ id: userInfo?.id })
  });
  const { data: findUserList, refetch: findUserListFetch } = useGet({
    queryKey: ["FindUserList"],
    queryFn: async () => await findUserApi({ nickname: findUser })
  });
  const { mutateAsync: insertFriendMutate, data: insertFriendRes } = usePost({
    queryKey: ["Friend", "RequestFriend", "ReplyFriend"],
    queryFn: insertFriendApi
  });
  const { mutateAsync: updateFriendMutate, data: updateFriendRes } = usePost({
    queryKey: ["Friend", "RequestFriend", "ReplyFriend"],
    queryFn: updateFriendApi
  });

  const { mutateAsync: deleteFriendMutate, data: deleteFriendRes } = usePost({
    queryKey: ["Friend"],
    queryFn: deleteFriendApi
  });
  const allRefresh = () => {
    friendFetch();
    requestFriendFetch();
    replyDriendFetch();
    findUserListFetch();
  };
  const onDeleteFriend = useCallback(async friend => {
    console.log(friend, "friend");
    saveData(
      async () => await deleteFriendMutate({ id: friend.id }),
      "취소하시겠습니까"
    );
    return;
  }, []);
  const onRequestFriend = useCallback(async replyFriend => {
    console.log(replyFriend, "friend");
    saveData(
      async () =>
        await insertFriendMutate({
          requestFriendId: userInfo.id,
          replyFriendId: replyFriend.id
        }),
      "요청하시겠습니까"
    );
    return;
  }, []);

  const onReplyFriend = useCallback(async friend => {
    console.log(friend, "friend");
    saveData(
      async () =>
        await updateFriendMutate({ id: friend.id, query: { isFriend: true } }),
      "수락하시겠습니까"
    );
    return;
  }, []);
  const onFindUser = e => {
    setFindUser(e.target.value);
  };
  const saveData = useCallback((func, message) => {
    setPopupInfo(e => {
      return {
        ...e,
        visible: true,
        content: message,
        btnList: [
          {
            word: "확인",
            func: async () => {
              try {
                await func();
                setPopupInfo(e => {
                  return { ...e, visible: false };
                });

                allRefresh();

                socketClient.io.emit("changeFriend", a => {
                  console.log("소켓");
                });
              } catch (e) {
                console.log(e, "error");
              }
            }
          },
          {
            word: "취소",
            func: () => {
              setPopupInfo(e => {
                return { ...e, visible: false };
              });
            }
          }
        ]
      };
    });
  }, []);
  const showChatModal = useCallback(friend => {
    setTargetFriend(v => {
      return { ...v, ...friend };
    });
    showModal();
  }, []);
  useEffect(() => {
    socketClient.onConnect()
  }, []);
  
  useEffect(() => {
    socketClient.io.on("changedFriend", () => {
      allRefresh();
    });
    return ()=>{
      socketClient.io.disconnect()
      socketClient.io.off()
    }
  }, [socketClient]);
  const debounce = useDebounce(
    () => {
      findUserListFetch();
      // alert("패치");
    },
    3000,
    [findUser]
  );
  return (
    <div>
      <div>
        <div>
          <div>유저 검색</div>
          <div>
            <Input onInput={onFindUser} defaultValue={findUser} />
          </div>
          <div>
            {findUserList
              .filter(user => user.id !== userInfo?.id)
              .map((user, idx) => (
                <li key={idx}>
                  <Friend user={user}>
                    <Button onClick={() => onRequestFriend(user)}>요청</Button>
                  </Friend>
                </li>
              ))}
          </div>
        </div>
      </div>
      <div>
        친구목록
        <ul>
          {friendList.map((friend, idx) => (
            <li key={idx}>
              <Friend friend={friend}>
                <Button onClick={() => showChatModal(friend)}>대화</Button>
                <Button onClick={() => onDeleteFriend(friend)}>삭제</Button>
              </Friend>
            </li>
          ))}
        </ul>
      </div>
      <div>
        내가 신청한 친구목록
        <ul>
          {requestFriendList.map((friend, idx) => (
            <li key={idx}>
              <Friend friend={friend}>
                <Button onClick={() => onDeleteFriend(friend)}>삭제</Button>
              </Friend>
            </li>
          ))}
        </ul>
      </div>
      <div>
        요청 친구목록
        <ul>
          {replyDriendList.map((friend, idx) => (
            <li key={idx}>
              <Friend friend={friend}>
                <Button onClick={() => onReplyFriend(friend)}>수락</Button>
                <Button onClick={() => onDeleteFriend(friend)}>거절</Button>
              </Friend>
            </li>
          ))}
        </ul>
      </div>

      <ModalPortal>
        <Modal id={id} wrapStyle={{width:"80vw", minHeight:"80vh"}}>
          <Chat friendShipInfo={targetFriend} myInfo={userInfo}  />
        </Modal>
      </ModalPortal>
    </div>
  );
}
