import styled from "@/styles/pages/Join.module.scss";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useCallback, useMemo, useState } from "react";
import usePost from "@/hooks/usePost";
import { signupApi, duplicateIdApi } from "@/services/pages/JoinApi";
import { Popup } from "@/enum/Popup";
import { UseModalPopupContext } from "@/contexts/ModalPopupContext";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

function Join() {
  const navigate = useNavigate();
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

  const [duplicateId, setDuplicateId] = useState(true);
  const hasEmptyValue = useMemo(() => {
    for (let [key, info] of Object.entries(joinInfo)) {
      if (!info.value) {
        return info.label; //빈 값을 key를 return
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
  const onCheckDuplicateId = useCallback(async () => {
    // debugger;
    let _duplicateId: { isExist: boolean } = await duplicateIdApi(
      joinInfo.userId.value
    );
    setDuplicateId(_duplicateId.isExist);
    if (_duplicateId.isExist) setPopup("중복된 id가 있습니다");
    return _duplicateId.isExist
  }, [joinInfo]);
  const onInfoChange = useCallback(
    async (e, key) => {
      if (key === "userId") {
        setDuplicateId(true);
      }
      setJoinInfo(info => {
        info[key].value = e.target.value;
        return { ...info };
      });
    },
    [joinInfo]
  );
  const onEnterJoin = useCallback(async (e, key) => {}, []);
  const onJoin = useCallback(
    async (e, key) => {
      let _duplicateId = await onCheckDuplicateId()
      if(_duplicateId){
        setPopup("중복된 id가 있습니다");
      }
      debugger
      if (
        typeof hasEmptyValue === "string" &&
        ["아이디", "비밀번호", "비밀번호 확인", "이름", "닉네임"].includes(
          hasEmptyValue
        )
      ) {
        return setPopup(`${hasEmptyValue} 값이 비어있습니다`);
      }
      if (!isCheckPassword) {
        return setPopup(
          `최소 8 자, 하나 이상의 문자와 하나의 숫자로 비밀번호를 입력해주세요`
        );
      }
      if (!isSamePasswordNConfirm) {
        return setPopup(`비밀번호와 비밀번호 확인 값이 다릅니다`);
      }
      let res = await signupMutate({
        userId: joinInfo.userId.value,
        password: joinInfo.password.value,
        name: joinInfo.name.value,
        nickname: joinInfo.nickname.value
      });
      // res => setLogin(res)
      return setPopup(`회원가입되었습니다`, {
        [Popup.Confirm]: () => {
          navigate("/Login");
        }
      });
    },
    [joinInfo]
  );
  const onReset = useCallback(async (e, key) => {
    setJoinInfo(v => {
      return { ...INIT_JOIN_INFO };
    });
  }, []);
  return (
    <div>
      <div className={styled.join_wrap}>
        <ul className={styled.join_inner_wrap}>
          {JSON.stringify(hasEmptyValue)}
          {Object.entries(joinInfo).map(([key, info]) => {
            return (
              <li className={styled.join_item} key={key}>
                <p className={styled.join_label_item}>{info.label}</p>
                <p className={styled.join_value_item_wrap}>
                  <span className={styled.join_value_item}>
                    <Input
                      value={joinInfo[key].value}
                      onChange={e => onInfoChange(e, key)}
                      onKeyUp={e => onEnterJoin(e, key)}
                      style={{ width: "100%" }}
                      wrapperStyle={{ width: "100%" }}
                    />

                    {key === "userId" && !duplicateId ? (
                      <span>사용가능한 아이디입니다</span>
                    ) : null}
                  </span>
                  {key === "userId" ? (
                    <Button
                      style={{
                        width: "auto",
                        marginLeft: "2%",
                        vertical: "center"
                      }}
                      onClick={onCheckDuplicateId}
                    >
                      아이디 중복 확인
                    </Button>
                  ) : null}
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
