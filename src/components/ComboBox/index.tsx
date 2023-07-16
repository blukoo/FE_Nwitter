import React, { useState, ChangeEvent, RefObject } from "react";

type propsType = {
  selectedIndex?: number;
  id?: string;
  onChange: ChangeEvent;
  style?: any;
  type?: string;
  label?: string;
  className?: string;
  options?: string[];
  onSelect?: (value: string) => void;
};

const ComboBox = ({ options, selectedIndex = 0, onSelect }: propsType) => {
  const [value, setValue] = useState<string>();

  const handleChange = e => {
    // event handler
    setValue(value);
    console.log(e.target.value);
  };
  return (
    <select
    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
      handleChange(event.target.value)
    }}
      value={value}
      defaultValue={options[selectedIndex]}
    >
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
};

export default ComboBox;
