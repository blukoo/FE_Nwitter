//component
import Columns from "./Columns";
import Card from "./Card";
//type
import { ColumnsType } from "@/types/types";
//style
import styles from "@/styles/components/Cards/index.module.scss";
//react
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
export default function index({
  columnsData,
  rowData,
  setRowData,
  id,
  dataForm,
  targetContent,
  setTargetContent,
  onDeleteList,
  onSaveList
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
      // alert("패치");
    },
    100,
    [pages]
  );
  const [addList, setAddList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [update, setUpdate] = useState([]);
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
  const onAddList = () => {
    if (rowData.find(r => r.id === "new")) {
      return;
    }
    setRowData(value => {
      let _value = [...value];
      _value.unshift(dataForm);
      return [..._value];
    });
  };
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>, row, tag) => {
    console.log(e, row, "sss");
    setRowData(r => {
      r.find(item => item.id === row.id)[tag] = e.target.value;
      return r;
    });
  };

  const onImageChange = useCallback(async (e, row, tag) => {
    let imageArr = [];
    // console.log(e, e.target.files, URL.createObjectURL(e.target.files[0]));
    for (let file of e.target.files) {
      let _file = URL.createObjectURL(file);
      imageArr.push(_file);
    }
    // let reader = new FileReader()
    // reader.readAsDataURL(e.target.files[0])
    // reader.onload = ()=>{
    //   console.log(reader.result)
    //   setRowData(r => {
    //     let target = r.find(item => item.id === row.id);
    //     console.log(reader.result)
    //     target["_image"] = reader.result;
    //     return r;
    //   });
    // }
    setRowData(r => {
      let target = r.find(item => item.id === row.id);
      target[tag] = URL.createObjectURL(e.target.files[0]);
      target["_image"] =e.target.files[0];
      return r;
    });
  }, []);
  const onSetTargetContent = useCallback(row => {
    setTargetContent(r => {
      return { ...r, ...row };
    });
  }, []);
  return (
    <>
      <div>
        <button onClick={onAddList}>추가</button>
      </div>
      <ul className={styles.table_wrap} id={id}>
        {/* <li className={styles.columns_wrap}>
          {columnsData?.map((column, index) => (
            <Columns
              columnsData={column}
              id={index}
              columnkey={"column" + index}
              key={index}
            />
          ))}
        </li> */}
        {rowData?.map((row, idx) => (
          <li
            onClick={row => onSetTargetContent(row)}
            key={"row" + idx}
            className={styles.row_wrap}
          >
            {/* <div className={styles.rows_wrap}> */}
            <Card
              rowData={row}
              columnsData={columnsData}
              onInput={onChangeValue}
              onDeleteList={onDeleteList}
              onSaveList={onSaveList}
              onImageChange={onImageChange}
            />
            {/* </div> */}
          </li>
        ))}
        <li ref={scrollLoad}>스크롤 로딩</li>
      </ul>
    </>
  );
}
