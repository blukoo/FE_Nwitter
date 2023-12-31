import api from "@/utils/axios";
export function signupApi(query) {
  const url = `/users/signup`;
  return api.post({
    url,
    query
  });
}
export function duplicateIdApi(userId) {
  const url = `/users/check_duplicate_id`;
  return api.get({
    url,
    query: {
      userId
    }
  });
}
