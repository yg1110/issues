import { useRef } from "react";

import useStickyDetection from "../hooks/useStickyDetection";
import GithubIcon from "../icons/GithubIcon";
import SlashIcon from "../icons/SlashIcon";

export default function Header() {
  const stickyRef = useRef<HTMLDivElement>(null);
  useStickyDetection(stickyRef, 64);
  return (
    <header
      className="p-[1rem] flex items-center gap-[0.5rem] sticky top-0 bg-white"
      ref={stickyRef}
    >
      <a href="/">
        <GithubIcon />
      </a>
      <nav>
        <ul className="flex items-center text-gray-600 text-sm">
          <a
            href="https://github.com/yg1110"
            className="flex items-center hover:text-gray-900"
          >
            <span className="font-medium">yg1110</span>
          </a>
          <SlashIcon />
          <a
            href="https://github.com/yg1110/issues"
            className="font-semibold text-gray-900"
          >
            issues
          </a>
        </ul>
      </nav>
    </header>
  );
}
