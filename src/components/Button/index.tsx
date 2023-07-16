import React, { useCallback, useEffect, useRef } from "react";
function Button(props) {
  //props
  // onClick, style, children : 버튼 내용, isDebouncedButton : 디바운스 할 버튼인지
  const { onClick, style, children, isDebouncedButton = true } = props;
  //useRef
  const buttonRef = useRef(null);
  let timeout;
  //useCallback
  const debounce = useCallback((func, ms) => {
    // 현재 타이머가 실행되고 있으면 timeout에 타이머의 id를 저장한다.

    return () => {
      // 만약 타이머가 실행되고 있으면 현재 타이머를 지운다.
      if (timeout) {
        clearTimeout(timeout);
      }

      // timeout에 새로운 타이머를 할당한다. 만약 ms만큼 시간이 지났으면 함수를 실행한다.
      timeout = setTimeout(() => {
        func();
      }, ms);
    };
  }, []);
  return (
    <button
      ref={buttonRef}
      style={style}
      onClick={isDebouncedButton ? debounce(onClick, 3000) : onClick}
    >
      {children}
    </button>
  );
}
export default React.memo(Button);
