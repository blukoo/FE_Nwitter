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
  value: string | boolean | number;
  id?: string;
  onChange?: ChangeEventHandler;
  onKeyUp?: KeyboardEventHandler;
  onInput?: (e: FormEvent, ...arg: any) => void;
  style?: any;
  wrapperStyle?: any;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
};

const Input = forwardRef(
  (props: propsType, ref: RefObject<HTMLInputElement>|LegacyRef<HTMLTextAreaElement>) => {
    //props
    const {
      value = "",
      id = "",
      onChange,
      onKeyUp,
      onInput,
      style,
      wrapperStyle,
      type = "text",
      placeholder,
      label,
      className,
      name
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
            value={value}
            onChange={onChange}
            onInput={onInput}
            onKeyUp={onKeyUp}
            style={style}
            type={type}
            placeholder={placeholder}
            ref={ref as RefObject<HTMLInputElement>}
            className={className}
            name={name}
          />
        ) : (
          <textarea
            id={id}
            // @ts-ignore
            value={value}
            onChange={onChange}
            onInput={onInput}
            onKeyUp={onKeyUp}
            style={style}
            type={type}
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
