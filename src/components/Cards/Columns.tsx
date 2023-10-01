import { UnknownObj } from "@/types/types";
import React from "react";
import styles from "@/styles/components/Table/Columns.module.scss";

export default function Columns(props) {
  const { columnsData, columnkey } = props;
  console.log(columnkey);
  return (
    <div key={columnkey} className={styles.columns_wrap}>
      {columnsData.label}
    </div>
  );
}
