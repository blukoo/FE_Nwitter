import { CSSProperties } from "react";
import { EnumType } from "typescript";

//object의 key가 확실하지 않은 타입
export interface UnknownObj<T = any> {
  [key: string]: T;
}
//팝업이나 모달의 type
export type ModalPopupStateType = {
  type: string;
  content: string;
  btnList: { word: string; func: Event | EnumType }[];
  isOpen: boolean;
};
export type ColumnsType = {
  label: string | number;
  tag: string;
  style?: CSSProperties;
  width: string | number;
};
