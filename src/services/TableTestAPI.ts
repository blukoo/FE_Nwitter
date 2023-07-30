import api from "@/utils/axios";
export function getDataApi() {
  const url = `/TestListGet_data`;
  return api.get({
    url
  });
}

export function createDataApi(data) {
  const url = `/TestListSave_data`;
  return api.post({
    url,
    query: data
  });
}

export function updateDataApi(data) {
  const url = `/TestListUpdate_data`;
  return api.post({
    url,
    query: data
  });
}
export function deleteDataApi(data) {
  const url = `/TestListDelete_data`;
  return api.post({
    url,
    query: data
  });
}
