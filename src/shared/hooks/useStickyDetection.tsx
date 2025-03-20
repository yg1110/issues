import { useEffect } from "react";

const useStickyDetection = (
  ref: React.RefObject<HTMLElement | null>,
  stickyBoundary: number
) => {
  useEffect(() => {
    if (!ref.current) return;
    const handleScroll = () => {
      if (ref.current) {
        const isSticky = window.scrollY >= stickyBoundary;
        if (isSticky) {
          ref.current.classList.add("is-sticky");
        } else {
          ref.current.classList.remove("is-sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);
};

export default useStickyDetection;
