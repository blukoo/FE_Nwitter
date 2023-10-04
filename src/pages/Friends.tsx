import React, { useCallback } from "react";
import useGet from "@/hooks/useGet";
import {
  getFriendApi,
  getRequestFriendApi,
  getReplyFriendApi,
  updateFriendApi,
  deleteFriendApi
} from "@/services/pages/FriendsApi";
export default function Friend() {
  let userInfo = JSON.parse(
    localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")
  );

  const { data: friendList } = useGet({
    queryKey: ["Friend"],
    queryFn: async () => await getFriendApi({ id: userInfo.id })
  });
  const { data: requestFriendList } = useGet({
    queryKey: ["RequestFriend"],
    queryFn: async () => await getRequestFriendApi({ id: userInfo.id })
  });
  const { data: replyDriendList } = useGet({
    queryKey: ["ReplyFriend"],
    queryFn: async () => await getReplyFriendApi({ id: userInfo.id })
  });
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
  return (
    <div>
      <div>
        친구목록
        <ul>
          {friendList.map((friend, idx) => (
            <li key={idx}>
              {findFriendNickname({
                requestFriend: friend.requestFriend,
                replyFriend: friend.replyFriend
              })}
            </li>
          ))}
        </ul>
      </div>
      <div>
        내가 신청한 친구목록
        <ul>
          {requestFriendList.map((friend, idx) => (
            <li key={idx}>
              {findFriendNickname({
                requestFriend: friend.requestFriend,
                replyFriend: friend.replyFriend
              })}
            </li>
          ))}
        </ul>
      </div>
      <div>
        요청 친구목록
        <ul>
          {replyDriendList.map((friend, idx) => (
            <li key={idx}>
              {findFriendNickname({
                requestFriend: friend.requestFriend,
                replyFriend: friend.replyFriend
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
