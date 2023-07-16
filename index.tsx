import React, { useState } from "react";
import _CustomCheckBoxArea from "@/components/CustomCheckBox/CustomCheckBoxArea";
/**
 *
 * @props multi => 다중선택을 할지 하나만 선택을 할지 여부
 * @props checkBoxData=> object 이고 체크할 데이터
 * @props setCheckBoxData=> 변경해주는 함수
 */
export default function CustomCheckBoxArea() {
  const checkBoxData1 = {
    a: true,
    b: true,
    c: false
  };
  const checkBoxData2 = {
    d: true,
    e: true,
    f: false
  };
  const checkBoxData3 = {
    g: true,
    h: false,
    i: false
  };
  const [checkBoxData_1, setCheckBoxData_1] = useState(checkBoxData1);
  const [checkBoxData_2, setCheckBoxData_2] = useState(checkBoxData2);
  const [checkBoxData_3, setCheckBoxData_3] = useState(checkBoxData3);
  return (
    <>
      <div>
        1번
        <_CustomCheckBoxArea
          checkBoxData={checkBoxData_1}
          setCheckBoxData={setCheckBoxData_1}
        ></_CustomCheckBoxArea>
      </div>
      <div>
        2번
        <_CustomCheckBoxArea
          checkBoxData={checkBoxData_2}
          setCheckBoxData={setCheckBoxData_2}
        ></_CustomCheckBoxArea>
      </div>
      <div>
        multi 테스트
        <_CustomCheckBoxArea
          checkBoxData={checkBoxData_3}
          setCheckBoxData={setCheckBoxData_3}
          multi={false}
        ></_CustomCheckBoxArea>
      </div>
    </>
  );
}
