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
      className={`bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;