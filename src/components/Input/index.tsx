//react
import { forwardRef, ChangeEventHandler, RefObject } from "react";
//style
import "@/styles/components/Input/index.scss";
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
};

const Input = forwardRef(
  (props: propsType, ref: RefObject<HTMLInputElement>) => {
    //props
    const {
      value = "",
      id = "",
      onChange,
      style,
      type = "text",
      placeholder,
      label,
      className,
      name
    } = props;
    return (
      <span className="input_wrap">
        {props.label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          // @ts-ignore
          value={value}
          onChange={onChange}
          style={style}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={className}
          name={name}
        />
      </span>
    );
  }
);
Input.displayName = "Input";
export default Input;
