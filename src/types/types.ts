import { CSSProperties } from "react";
import { EnumType } from "typescript";

//object의 key가 확실하지 않은 타입
export interface UnknownObj<T = any> {
  [key: string]: T;
}
//팝업이나 모달의 type
export type ModalPopupStateType = {
  type?: string;
  content: string;
  btnList: { word: string; func: Event | Function }[];
  visible: boolean;
};
export type ColumnsType = {
  label: string | number;
  tag: string;
  style?: CSSProperties;
  width: string | number;
};
export type UserInfoType = {
  id: number;
  userId: string;
  nickname: string;
  password: string;
  name: string;
  url: string;
  email: string;
};