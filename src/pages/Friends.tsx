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

export default function Friends() {
  const [findUser, setFindUser] = useState("");
  const { setPopupInfo } = UseModalPopupContext();
  let userInfo = JSON.parse(
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
  );

  const { data: friendList } = useGet({
    queryKey: ["Friend"],
    queryFn: async () => await getFriendApi({ id: userInfo?.id })
  });
  const { data: requestFriendList } = useGet({
    queryKey: ["RequestFriend"],
    queryFn: async () => await getRequestFriendApi({ id: userInfo?.id })
  });
  const { data: replyDriendList } = useGet({
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
  const onDeleteFriend = useCallback(async friend => {
    console.log(friend, "friend");
    setPopupInfo(e => {
      return {
        ...e,
        visible: true,
        content: "취소하시겠습니가까",
        btnList: [
          {
            word: "확인",
            func: async () => {
              await deleteFriendMutate({ id: friend.id });
              setPopupInfo(e => {
                return { ...e, visible: false };
              });
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
    return;
  }, []);
  const onFindUser = e => {
    console.log(e.target, e, e.target.value, "e");
    setFindUser(e.target.value);
  };
  // useEffect(() => {
  // }, [findUser]);
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
            <Input
              onInput={onFindUser}
              defaultValue={findUser}
            />
          </div>
          <div>
            {findUserList
              .filter(user => user.id !== userInfo?.id)
              .map((user, idx) => (
                <li key={idx}>
                  <Friend user={user}>
                    <Button onClick={() => onDeleteFriend(user)}>삭제</Button>
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
                <Button>수락</Button>
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
                <Button>취소</Button>
              </Friend>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
