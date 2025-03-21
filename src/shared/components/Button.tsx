import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

const typeStyles = {
  primary: `
    bg-[#238636]
    text-white
    border border-[#238636]
    hover:bg-[#2ea043]
    focus:ring-[#238636]
  `,
  secondary: `
    bg-[#f6f8fa]
    text-gray-800
    border border-gray-300
    hover:bg-gray-100
    focus:ring-gray-300
  `,
  outline: `
    bg-transparent
    text-gray-800
    border border-gray-300
    hover:bg-gray-100
    focus:ring-gray-300
  `,
} as Record<ButtonVariant, string>;

export default function Button({ icon, variant = "primary", disabled = false, children, ...props }: ButtonProps) {
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button
      className={`${baseClasses} ${typeStyles[variant]} ${disabledClasses} px-4 py-2`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
