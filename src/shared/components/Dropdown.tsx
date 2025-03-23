import React from "react";

import { useDropdown } from "@/shared/hooks/useDropdown";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Dropdown({ trigger, children, className = "" }: Props) {
  const { open, setOpen, triggerRef, dropdownRef, isOverflowingRight } = useDropdown();

  return (
    <div className="relative inline-block w-full">
      <div ref={triggerRef} onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`
          absolute z-10 mt-2 ${isOverflowingRight ? "right-0" : "left-0"}
          ${className}
        `}
        >
          {children}
        </div>
      )}
    </div>
  );
}
