import React, { ChangeEventHandler, useEffect, useMemo, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "@/components/Input";
import "@/styles/components/Input/StatusInput.scss";
import { UseUtilsContext } from "@/contexts/UtilsContext";
export type propsType = {
  value: string | boolean | number;
  id?: string;
  onChange: ChangeEventHandler;
  style?: any;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;

  validation;
  onClear;
};
export default function StatusInput(props) {
  //props
  const {
    id,
    value = "",
    onChange,
    style,
    type,
    placeholder,
    validation,
    onClear = () => onChange(""),
    label
  } = props;
  //useRef
  const InputRef = useRef();
  //useContext
  const {
    state: { target },
    action: Aaction
  } = UseUtilsContext(); //현재 타겟이 이 element면 reset button이 보이도록
  //useMemo
  const passValidation = useMemo(() => {
    return validation?.test(value);
  }, [value]);

  return (
    <div className="input_wrap">
      {props.label && <label htmlFor={id ?? ""}>{label}</label>}
      <div className="status_input_wrap">
        <Input
          id={id ?? ""}
          value={value}
          onChange={onChange}
          style={style}
          type={type}
          placeholder={placeholder}
          ref={InputRef}
          className={passValidation ? "success" : "fail"}
        />
        {target === InputRef?.current && (
          <span className="clear_value" onClick={onClear}>
            <AiFillCloseCircle />
          </span>
        )}
      </div>
    </div>
  );
}
