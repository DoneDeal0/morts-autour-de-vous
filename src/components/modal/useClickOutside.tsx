import { useCallback, useEffect } from "react";

export default function useClickOutside(ref: any, callback: () => void) {
  const onClickOutside = useCallback(
    (e) => !ref.current.contains(e.target) && callback(),
    [callback, ref]
  );
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [onClickOutside, ref]);
}
