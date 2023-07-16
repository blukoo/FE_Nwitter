/**
 * 버튼을 누르면 나오는 영역, 다른 영역을 누르면 꺼짐
 */
//style
import { UseUtilsContext } from "@/contexts/UtilsContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function FixedComponent({
  render, //해당 영역을 호출 하는 element
  TempElement = AiFillCloseCircle, //영역이 있는동안 showElement를 대체할 element
  ShowElementRef,
  children: element
}) {
  const ref = useRef();
  //useContext
  const {
    state: { target },
    action: Aaction
  } = UseUtilsContext(); //현재 타겟이 이 element면 close
  //useState
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(
      ShowElementRef?.current?.children[0] === target
      //  ||
      // (ref?.current as HTMLElement)?.contains(target)
    );
  }, [ShowElementRef, target]);
  //useState
  return (
    <div>
      {isOpen ? (
        <div>
          <div onClick={() => setIsOpen(false)}>{<TempElement />}</div>
          <div>{render({ setIsOpen })}</div>
        </div>
      ) : (
        <div>{element}</div>
      )}
    </div>
  );
}
