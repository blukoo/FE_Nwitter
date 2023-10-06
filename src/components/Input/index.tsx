//react
import {
  forwardRef,
  ChangeEventHandler,
  RefObject,
  KeyboardEventHandler,
  FormEventHandler,
  FormEvent,
  LegacyRef
} from "react";
//style
import "@/styles/components/Input/index.scss";
export type propsType = {
  value?: string | boolean | number;
  defaultValue?: string | number;
  id?: string;
  onChange?: ChangeEventHandler;
  onKeyUp?: KeyboardEventHandler;
  onKeyPress?: KeyboardEventHandler;
  onInput?: (e: FormEvent, ...arg: any) => void;
  style?: any;
  wrapperStyle?: any;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
  multiple?: boolean;
  accept?: string;
};

const Input = forwardRef(
  (
    props: propsType,
    ref: RefObject<HTMLInputElement> | LegacyRef<HTMLTextAreaElement>
  ) => {
    //props
    const {
      value = false,
      defaultValue = "",
      id = "",
      onChange,
      onKeyUp,
      onKeyPress,
      onInput,
      style,
      wrapperStyle,
      type = "text",
      placeholder,
      label,
      className,
      name,
      multiple,
      accept
    } = props;
    return (
      <span
        className="input_wrap"
        style={{ display: "inline-block", ...wrapperStyle }}
      >
        {props.label && <label htmlFor={id}>{label}</label>}
        {type !== "textarea" ? (
          <input
            id={id}
            // @ts-ignore
            // value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onInput={onInput}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            style={style}
            type={type}
            placeholder={placeholder}
            ref={ref as RefObject<HTMLInputElement>}
            className={className}
            name={name}
            multiple={multiple ? true : false}
            accept={accept}
          />
        ) : (
          <textarea
            id={id}
            // @ts-ignore
            value={value}
            onChange={onChange}
            onInput={onInput}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            style={style}
            // type={type}
            placeholder={placeholder}
            ref={ref as LegacyRef<HTMLTextAreaElement>}
            className={className}
            name={name}
          />
        )}
      </span>
    );
  }
);
Input.displayName = "Input";
export default Input;
