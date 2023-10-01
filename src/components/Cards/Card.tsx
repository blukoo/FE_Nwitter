import { ColumnsType } from "@/types/types";
import React, { ChangeEventHandler, FormEvent, useCallback } from "react";
import styles from "@/styles/components/Cards/Card.module.scss";
import Input from "@/components/Input/index";
import Button from "@/components/Button/index";
export default function Rows(props) {
  const {
    rowData,
    columnsData,
    onInput,
    onDeleteList,
    onSaveList
  }: { columnsData: ColumnsType[]; rowData: any,
    onInput:(e:FormEvent,...arg:any)=>void 
    onDeleteList:(row:any)=>void  
    onSaveList:(row:any)=>void 
  } = props;

  return (
    <div className={styles.card_wrap}>
      <div className={styles.top_wrap}>
        <div className={styles.nickname_wrap}>{rowData.nickname}</div>
        <div className={styles.btn_wrap}>
          <Button onClick={()=>onDeleteList(rowData)}>삭제</Button>
          <Button onClick={()=>onSaveList(rowData)}>저장</Button>
        </div>
      </div>
      <div className={styles.content_wrap}>
        {rowData.image ? (
          <div className={styles.image_wrap}>
            <img src={rowData.image}></img>
          </div>
        ) : null}
        <div className={styles.text_wrap}>
          <Input value={rowData.text} wrapperStyle={{width:"100%",height:"100%"}} type={"textarea"} onInput={(e)=>onInput(e,rowData,"text")} />
        </div>
      </div>
    </div>
  );
}
