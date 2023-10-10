import api from "@/utils/axios";
export function getFriendApi({ id }: { id: string }) {
  const url = `/friend`;
  return api.get({
    url,
    query: { id }
  });
}
export function getRequestFriendApi({ id }: { id: string }) {
  const url = `/friend/request`;
  return api.get({
    url,
    query: { id }
  });
}
export function getReplyFriendApi({ id }: { id: string }) {
  const url = `/friend/reply`;
  return api.get({
    url,
    query: { id }
  });
}
export function findUserApi({ nickname }: { nickname: string }) {
  const url = `/friend/find_user_by_nickname`;
  return api.get({
    url,
    query: { nickname }
  });
}
export function insertFriendApi({ requestFriendId, replyFriendId }) {
  const url = `/friend/`;
  return api.post({
    url,
    query: { requestFriendId, replyFriendId }
  });
}

export function updateFriendApi({ id, query }) {
  const url = `/friend/${id}`;
  return api.put({
    url,
    query
  });
}

export function deleteFriendApi({ id, query }) {
  const url = `/friend/${id}`;
  return api.delete({
    url,
    query
  });
}
