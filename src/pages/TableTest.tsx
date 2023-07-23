import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  getDataApi,
  createDataApi,
  updateDataApi,
  deleteDataApi
} from "@/services/TableTestAPI";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Input from "@/components/Input";
import styled from "@/styles/pages/TableTest.module.scss";
import usePost from "@/hooks/usePost";
import useGet from "@/hooks/useGet";

export default function TableTestPage() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: { data: list }
  }: {
    isLoading: boolean;
    error: any;
    data: { data: any[] };
  } = useQuery(["testList"], () => getDataApi(), {
    staleTime: 60 * 1000
  });
  useGet({ queryKey: ["testList"], queryFn: getDataApi });
  useEffect(() => setDataList(v => [...list]), [list]);
  const { mutate: createData } = usePost({
    queryKey: ["testList", "create"],
    queryFn: createDataApi
  });
  const { mutate: updateData } = usePost({
    queryKey: ["testList", "update"],
    queryFn: updateDataApi
  });
  const { mutate: deleteData } = usePost({
    queryKey: ["testList", "delete"],
    queryFn: deleteDataApi
  });
  const [dataList, setDataList] = useState(list);

  const unshiftList = () => {
    setDataList(value => {
      let _value = [...value];
      _value.unshift({ index: "new", title: "", content: "" });
      return [..._value];
    });
  };
  const onChangeValue = (cate, e: ChangeEvent<Element>, row, idx) => {
    if (cate === "deleteChoice") {
      setDataList(value => {
        value[idx][cate] = (e.target as HTMLInputElement).checked;
        return [...value];
      });
      return;
    } else {
      setDataList(value => {
        row[cate] = (e.target as HTMLInputElement).value;
        return [...value];
      });
    }
  };
  const saveData = async () => {
    await createData(dataList.filter(item => item.index == "new"));
    await deleteData(
      dataList.filter(item => item.index != "new" && item.deleteChoice)
    );
    await updateData(dataList.filter(item => item.index != "new"));
    await queryClient.invalidateQueries(["testList"]);
  };
  return (
    <>
      <div>
        {JSON.stringify(list)}
        <br />
        <br />
        <div className="test">testPage1</div>
        <button onClick={unshiftList}>추가</button>
        <button onClick={saveData}>저장</button>
        <br />
        <br />
        <br />
        <table style={{ backgroundColor: "blue" }}>
          <thead>
            <tr>
              <th>제목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, idx) => (
              <tr
                className={item.index === "new" ? styled.create_row : ""}
                key={idx}
              >
                <td>
                  <Input
                    id={`deleteChoice_${idx}`}
                    type="checkbox"
                    value={item.deleteChoice}
                    onChange={e => onChangeValue("deleteChoice", e, item, idx)}
                  />
                </td>
                <td>
                  <Input
                    id={`title_${idx}`}
                    value={item.title}
                    onChange={e => onChangeValue("title", e, item, idx)}
                  />
                </td>
                <td>
                  <Input
                    id={`content_${idx}`}
                    value={item.content}
                    onChange={e => onChangeValue("content", e, item, idx)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
}
