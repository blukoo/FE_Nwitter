import { useCallback, useEffect } from "react";
// func : 디바운스 걸 함수, delay : 시간, deps :변화감지가 필요한 value
export default function useDebounce(func, delay, deps) {
  const callback = useCallback(func, deps);

  useEffect(() => {
    console.log(func, delay, deps);
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
}
