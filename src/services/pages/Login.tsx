import api from "@/utils/axios";
export function loginApi({ userId, password }) {
  console.log(userId, password, "@@@@@@@@@@");
  const url = `/users/login`;
  return api.post({
    url,
    query: { userId, password }
  });
}
