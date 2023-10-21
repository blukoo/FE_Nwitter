import api from "@/utils/axios";
const url = `/chat`;
export function getChatApi({ friendShipId, friendId }) {
  let _url = url;
  return api.get({
    url: _url,
    query: { friendShipId, friendId }
  });
}
export function createChatApi({ friendId }) {
  let _url = `${url}/${friendId}`;
  return api.post({
    url: _url
  });
}
