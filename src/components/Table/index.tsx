//component
import Columns from "./Columns";
import Rows from "./Rows";
//type
import { ColumnsType } from "@/types/types";
//style
import styles from "@/styles/components/Table/index.module.scss";
//react
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
export default function index({
  columnsData,
  rowData,
  setRowData,
  id,
  dataForm
}) {
  // const [list, setRowData] = useState([]);
  const [pages, setPage] = useState(0);
  // const {
  //   columnsData,
  //   rowData,
  //   setRowData,
  //   id,
  //   dataForm
  // }: { columnsData: ColumnsType[]; rowData: any[];setRowData:React.Dispatch<React.SetStateAction<any[]>>, id: string,dataForm:any[] } = props;
  //useRef
  const scrollLoad = useRef();
  //hook
  const debounce = useDebounce(
    () => {
      alert("패치");
    },
    100,
    [pages]
  );
  //useEffect
  useEffect(() => {
    let observer;
    if (scrollLoad) {
      const handleInterSect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          //패치데이터 api 넣으면 됨
          setPage(p => {
            return p + 1;
          });
        }
      };
      observer = new IntersectionObserver(handleInterSect, { threshold: 1 });
      observer.observe(scrollLoad.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [scrollLoad]);
  const addList = () => {
    debugger
    setRowData(value => {
      let _value = [...value];
      _value.unshift(dataForm);
      return [..._value];
    });
  };
  const onChangeValue = (cate, e: ChangeEvent<Element>, row, idx) => {
    if (cate === "deleteChoice") {
      setRowData(value => {
        value[idx][cate] = (e.target as HTMLInputElement).checked;
        return [...value];
      });
      return;
    } else {
      setRowData(value => {
        row[cate] = (e.target as HTMLInputElement).value;
        return [...value];
      });
    }
  };
  const deleteList = useCallback(() => {}, []);
  const saveList = useCallback(() => {}, []);
  return (
    <>
      <div>
        <button onClick={addList}>추가</button>
        <button onClick={deleteList}>삭제</button>
        <button onClick={saveList}>저장</button>
      </div>
      {JSON.stringify(rowData)+"list"}
      <ul className={styles.table_wrap} id={id}>
        <li className={styles.columns_wrap}>
          {columnsData?.map((column, index) => (
            <Columns columnsData={column} id={index} columnkey={"column"+index} key={index} />
          ))}
        </li>
        {rowData?.map((row, idx) => (
          <li className={styles.rows_wrap} key={"row"+idx}>
            sss{styles.rows_wrap}
            <Rows rowData={row} columnsData={columnsData} />
          </li>
        ))}
        <li ref={scrollLoad}>스크롤 로딩</li>
      </ul>
    </>
  );
}
