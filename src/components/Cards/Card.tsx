import { ColumnsType } from "@/types/types";
import React, { ChangeEventHandler, FormEvent, useCallback } from "react";
import styles from "@/styles/components/Cards/Card.module.scss";
import Input from "@/components/Input/index";
import Button from "@/components/Button/index";
import { UseAuthContext } from "@/contexts/AuthContext";
export default function Rows(props) {
  const {
    rowData,
    columnsData,
    onInput,
    onDeleteList,
    onSaveList,
    onImageChange
  }: {
    columnsData: ColumnsType[];
    rowData: any;
    onInput: (e: FormEvent, ...arg: any) => void;
    onDeleteList: (row: any) => void;
    onSaveList: (row: any) => void;
    onImageChange: (...arg: any) => void;
  } = props;
  const { userInfo, setUserInfo, isLogin, setIsLogin } = UseAuthContext(); // 회원정보

  return (
    <div className={styles.card_wrap}>
      <div className={styles.top_wrap}>
        <div className={styles.nickname_wrap}>{rowData.nickname}</div>
        {rowData.userId === userInfo.id ? (
          <div className={styles.btn_wrap}>
            {/* <Button onClick={() => onDeleteList(rowData)}>삭제</Button> */}
            <Button onClick={() => onSaveList(rowData)}>저장</Button>
          </div>
        ) : null}
      </div>
      <div className={styles.content_wrap}>
        <Input
          type="file"
          accept="image/*"
          onChange={file => onImageChange(file, rowData, "image")}
          multiple
        />
        {rowData.image ? (
          <div className={styles.image_wrap}>
            <div className={styles.image_inner_wrap}>
              <img src={rowData.image}></img>
            </div>
          </div>
        ) : null}
        <div className={styles.text_wrap}>
          <Input
            value={rowData.text}
            wrapperStyle={{ width: "100%", height: "100%" }}
            type={"textarea"}
            onInput={e => onInput(e, rowData, "text")}
          />
        </div>
      </div>
    </div>
  );
}
