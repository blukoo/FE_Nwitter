import { ColumnsType } from "@/types/types";
import React from "react";
import styles from "@/styles/components/Table/Rows.module.scss";

export default function Rows(props) {
  const { rowData, columnsData }: { columnsData: ColumnsType[]; rowData: any } =
    props;
  return (
    <div className={styles.row_wrap}>
      {columnsData.map((column, idx) => (
        <div
          className={styles.row_inner_wrap}
          key={idx}
          style={{ flex: column.width ?? "auto", ...column.style }}
        >
          {rowData[column.tag]}
        </div>
      ))}
    </div>
  );
}
