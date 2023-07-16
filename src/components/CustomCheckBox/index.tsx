import React, { useState, useEffect, ChangeEventHandler, useMemo } from "react";
import CheckBox from "@/components/Input/CheckBox";
type PropsType = {
  value: string | boolean | number;
  id: string;
  onChange?: ChangeEventHandler;
  style?: any;
  className?: string;
  name?: string;
  type: string;
  label: string;
  checked: boolean;
  multi: boolean;
};
import styled from "@/styles/components/CustomCheckBox/index.module.scss";
export default function CustomCheckBox(props: PropsType) {
  //props
  const { id = "", label, multi = true } = props;
  return (
    <div className={styled.custom_checkBox_wrap}>
      <label htmlFor={id}>{label}</label>
      <CheckBox {...props}></CheckBox>
    </div>
  );
}
