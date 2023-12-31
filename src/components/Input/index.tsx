//react
import React, {
  forwardRef,
  ChangeEventHandler,
  RefObject,
  KeyboardEventHandler,
  FormEventHandler,
  FormEvent,
  LegacyRef,
  ChangeEvent,
  KeyboardEvent
} from "react";
//style
import "@/styles/components/Input/index.scss";
type CustomChangeEventHandler<T = Element, U = any | undefined> = (
  event: ChangeEvent<T>,
  additionalParam?: U
) => void;
type CustomKeyboardEventHandler<T = Element, U = any | undefined> = (
  event: KeyboardEvent<T>,
  additionalParam?: U
) => void;
export type propsType = {
  value?: string | boolean | number;
  defaultValue?: string | number;
  id?: string;
  onChange?: CustomChangeEventHandler;
  onKeyUp?: CustomKeyboardEventHandler;
  onKeyPress?: CustomKeyboardEventHandler;
  onInput?: (e: FormEvent, ...arg: any) => void;
  style?: any;
  wrapperStyle?: any;
  wrapperClassName?: string;
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
      defaultValue = "",
      id = "",
      onChange,
      onKeyUp,
      onKeyPress,
      onInput,
      style,
      wrapperStyle,
      type = "text",
      value = type==="checkbox"?false:"",
      placeholder,
      label,
      className,
      wrapperClassName,
      name,
      multiple,
      accept
    } = props;
    return (
      <span
        className={"input_wrap " + wrapperClassName}
        style={{ display: "inline-block", ...wrapperStyle }}
      >
        {props.label && <label htmlFor={id}>{label}</label>}
        {type !== "textarea" ? (
          <input
            id={id}
            // @ts-ignore
            value={value}
            // defaultValue={defaultValue}
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
export default React.memo(Input);
