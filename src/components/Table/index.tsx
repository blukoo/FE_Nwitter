//component
import Columns from "./Columns";
import Rows from "./Rows";
//type
import { ColumnsType } from "@/types/types";
//style
import styles from "@/styles/components/Table/index.module.scss";
//react
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
export default function index(props) {
  const [pages, setPage] = useState(0);
  const {
    columnsData,
    rowsData,
    id
  }: { columnsData: ColumnsType[]; rowsData: any[]; id: string } = props;
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
  return (
    <ul className={styles.table_wrap} id={id}>
      <li className={styles.columns_wrap}>
        {columnsData?.map((column, idx) => (
          <Columns columnsData={column} key={idx} />
        ))}
      </li>
      {rowsData?.map((row, idx) => (
        <li className={styles.rows_wrap} key={idx}>
          sss{styles.rows_wrap}
          <Rows rowData={row} columnsData={columnsData} />
        </li>
      ))}
      <li ref={scrollLoad}>스크롤 로딩</li>
    </ul>
  );
}
