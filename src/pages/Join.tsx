import styled from "@/styles/pages/Join.module.scss";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useCallback, useMemo, useState } from "react";
import usePost from "@/hooks/usePost";
import { signupApi } from "@/services/pages/JoinApi";
import { Popup } from "@/enum/Popup";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";

function Join() {
  //최소 8 자, 하나 이상의 문자와 하나의 숫자 정규식
  const PASSWORDREG = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //비밀번호 정규식
  const { mutateAsync: signupMutate, data: signupRes } = usePost({
    queryKey: ["kakaoLogin"],
    queryFn: signupApi
  });
  const { setPopup } = UseModalPopupContext();
  const INIT_JOIN_INFO = {
    userId: { value: "", label: "아이디" },
    password: { value: "", label: "비밀번호" },
    passwordConfirm: { value: "", label: "비밀번호 확인" },
    name: { value: "", label: "이름" },
    nickname: { value: "", label: "닉네임" }
  };
  const [joinInfo, setJoinInfo] = useState({
    userId: { value: "", label: "아이디" },
    password: { value: "", label: "비밀번호" },
    passwordConfirm: { value: "", label: "비밀번호 확인" },
    name: { value: "", label: "이름" },
    nickname: { value: "", label: "닉네임" }
  });

  const hasEmptyValue = useMemo(() => {
    for (let [key, info] of Object.entries(joinInfo)) {
      if (!info.value) {
        return key; //빈 값을 key를 return
      }
    }
    return true;
  }, [joinInfo]);

  const isCheckPassword = useMemo(() => {
    return PASSWORDREG.test(joinInfo.password.value);
  }, [joinInfo]);

  const isSamePasswordNConfirm = useMemo(() => {
    return joinInfo.password.value === joinInfo.passwordConfirm.value;
  }, [joinInfo]);
  const onInfoChange = useCallback(
    async (e, key) => {
      setJoinInfo(info => {
        info[key].value = e.target.value;
        return { ...info };
      });
    },
    [joinInfo]
  );
  const onEnterJoin = useCallback(async (e, key) => {}, []);
  const onJoin = useCallback(async (e, key) => {
    if (
      typeof hasEmptyValue === "string" &&
      ["userId", "password", "passwordConfirm", "name", "nickname"].includes(
        hasEmptyValue
      )
    ) {
      return setPopup(`${hasEmptyValue} 값이 비어있습니다`, {
        [Popup.Confirm]: () => {
          alert();
        }
      });
    }
    let res = await signupMutate({
      userId: joinInfo.userId.value,
      password: joinInfo.password.value,
      name: joinInfo.name.value,
      nickname: joinInfo.nickname.value
    });
    // res => setLogin(res)
    console.log(res, "res회원가입");
  }, []);
  const onReset = useCallback(
    async (e, key) => {
      setJoinInfo(v => {
        return { ...INIT_JOIN_INFO };
      });
    },
    []
  );
  return (
    <div>
      <div className={styled.join_wrap}>
        <ul className={styled.join_inner_wrap}>
          {JSON.stringify(joinInfo.userId)}
          {Object.entries(joinInfo).map(([key, info]) => {
            return (
              <li className={styled.join_item} key={key}>
                <p className={styled.join_label_item}>{info.label}</p>
                <p className={styled.join_value_item}>
                  <Input
                    value={joinInfo[key].value}
                    onChange={e => onInfoChange(e, key)}
                    onKeyUp={e => onEnterJoin(e, key)}
                  />
                </p>
              </li>
            );
          })}
          <li className={styled.join_item}>
            <p className={styled.join_value_item}>
              <Button onClick={onJoin}>회원가입</Button>
            </p>
            <p className={styled.join_value_item}>
              <Button onClick={onReset}>초기화</Button>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Join;
