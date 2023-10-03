import api from "@/utils/axios";
export function getTweetsApi({ userId }: { userId: string }) {
  const url = `/tweets`;
  return api.get({
    url,
    query: { userId }
  });
}
export function insertTweetsApi({ query }) {
  const url = `/tweets/`;
  return api.post({
    url,
    query,
  });
}

export function insertTweetsImageApi({ query }) {
  const url = `/tweets/image/`;
  return api.post({
    url,
    query,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updateTweetsApi({ id, query }) {
  const url = `/tweets/${id}`;
  return api.put({
    url,
    query,
  });
}

export function updateTweetsImageApi({ id, query }) {
  const url = `/tweets/image/${id}`;
  return api.put({
    url,
    query,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function deleteTweetsApi({ id, query }) {
  const url = `/tweets/${id}`;
  return api.delete({
    url,
    query
  });
}
