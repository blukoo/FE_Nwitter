import React, { useCallback, useEffect, useId, useMemo } from "react";
import CustomCheckBox from ".";
import styled from "@/styles/components/CustomCheckBox/CustomCheckBoxArea.module.scss";
import CustomCheckBoxContextProvider, {
  CheckBoxPropsType,
  UseCustomCheckBoxContext
} from "@/contexts/CustomCheckBoxContext";
const CustomCheckBoxArea = function (
  props: CheckBoxPropsType & { multi?: boolean; id?: string | null }
) {
  const tempId = useId();
  const { setCheckBoxData } = UseCustomCheckBoxContext();
  const {
    checkBoxData: propsCheckBoxData,
    setCheckBoxData: propsSetCheckBoxData,
    id = null,
    multi = true
  } = props;
  //props에서 던져준 체크박스 리스트 object를 array
  const propsCheckBoxList = useMemo(() => {
    return propsCheckBoxData ? Object.entries(propsCheckBoxData) : [];
  }, [propsCheckBoxData]);
  //mulit가 아니면 바로 target 의 checked 가져오고 아니면 모두 checked를 false로 바꾸고 check를 가져옴
  const onChange = (e, key) => {
    if (!multi) {
      propsSetCheckBoxData(data => {
        for (let v in data) {
          data[v] = false;
        }
        return { ...data, [key]: e.target.checked };
      });
    } else {
      propsSetCheckBoxData(data => {
        return { ...data, [key]: e.target.checked };
      });
    }
  };
  useEffect(() => {
    setCheckBoxData(e => {
      return { ...e, ...propsCheckBoxData };
    });
  }, [propsCheckBoxData]);

  return (
    <div className={styled.custom_checkBox_wrap}>
      <CustomCheckBoxContextProvider {...props}>
        <ul className={styled.custom_checkBox_inner_wrap}>
          checkBoxData입니다{JSON.stringify(propsCheckBoxData)}
          <br />
          {propsCheckBoxList.map(([key, value], index) => (
            <li key={id ?? tempId + index}>
              <CustomCheckBox
                id={id ?? tempId + index}
                name={multi ? tempId : id ?? tempId + index}
                value={key}
                type="checkbox"
                label={key}
                checked={value}
                onChange={e => onChange(e, key)}
                multi={multi}
              ></CustomCheckBox>
            </li>
          ))}
        </ul>
      </CustomCheckBoxContextProvider>
    </div>
  );
};

export default React.memo(CustomCheckBoxArea);
