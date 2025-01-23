import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-background text-slate-100  px-4 py-2 rounded hover:bg-slate-900 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;