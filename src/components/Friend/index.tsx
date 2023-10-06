import React, { useCallback } from "react";
import styled from "@/styles/components/Friend/index.module.scss";
function index({ children, friend, user }:{ children, friend?, user? }) {
  let userInfo = JSON.parse(
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
  );
  const findFriendNickname = useCallback(
    ({
      replyFriend,
      requestFriend
    }: {
      replyFriend: { id: number; nickname: string };
      requestFriend: { id: number; nickname: string };
    }) => {
      if (replyFriend.id === userInfo.id) {
        return requestFriend.nickname;
      }
      return replyFriend.nickname;
    },
    []
  );
  const findUserNickname = useCallback((user: any) => {
    if (user.id !== userInfo.id) {
      return user.nickname;
    }
  }, []);
  return (
    <div className={styled.friend_wrap}>
      <div className={styled.friend_inner_wrap}>
        {friend
          ? findFriendNickname({
              requestFriend: friend.requestFriend,
              replyFriend: friend.replyFriend
            })
          : findUserNickname(user)}
      </div>
      <div className={styled.btn_wrap}>{children}</div>
    </div>
  );
}

export default index;
