import { UnknownObj } from "@/types/types";
import React from "react";
import styles from "@/styles/components/Table/Columns.module.scss";

export default function Columns(props) {
  const { columnsData, key } = props;
  return (
    <div key={key} className={styles.columns_wrap}>
      {columnsData.label}
    </div>
  );
}
