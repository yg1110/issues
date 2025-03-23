import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";

const typeStyles = {
  primary: `
    bg-[#238636]
    text-white
    border border-[#238636]
    hover:bg-[#2ea043]
    focus:ring-[#238636]
  `,
  secondary: `
    text-sm
    rounded-md
    bg-blue-600
    text-white
    hover:bg-blue-700
  `,
  outline: `
    text-sm
    rounded-md
    border
    border-gray-300
    text-gray-700
    hover:bg-gray-100
  `,
} as Record<ButtonVariant, string>;

export default function Button({ icon, variant = "primary", disabled = false, children, ...props }: ButtonProps) {
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
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
