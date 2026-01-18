import * as React from "react";

import { useLocalStore } from "../lib/store";

const MOBILE_BREAKPOINT = 768;

type MobileStore = {
  isMobile: boolean | undefined;
  setIsMobile: (value: boolean) => void;
};

export function useIsMobile() {
  const { isMobile, setIsMobile } = useLocalStore<MobileStore>((set) => ({
    isMobile: undefined,
    setIsMobile: (value) => set({ isMobile: value }),
  })).useShallow((state) => ({
    isMobile: state.isMobile,
    setIsMobile: state.setIsMobile,
  }));

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, [setIsMobile]);

  return !!isMobile;
}
