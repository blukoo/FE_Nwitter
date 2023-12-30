import api from "@/utils/axios";
export function signupApi(query) {
  console.log(query, "@@@@@@@@@@");
  const url = `/users/signup`;
  return api.post({
    url,
    query
  });
}