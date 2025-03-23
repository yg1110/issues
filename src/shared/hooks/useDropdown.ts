import { useEffect, useRef, useState } from "react";

export function useDropdown() {
  const [open, setOpen] = useState(false);
  const [isOverflowingRight, setIsOverflowingRight] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOverflowingRight) return;
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const overflowsRight = rect.right > window.innerWidth;
      setIsOverflowingRight(overflowsRight);
    }
  }, [open]);

  return {
    open,
    setOpen,
    triggerRef,
    dropdownRef,
    isOverflowingRight,
  };
}
