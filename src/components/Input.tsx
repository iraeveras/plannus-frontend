import React from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full mt-1 p-2 border rounded focus:outline-primary"
      />
    </div>
  );
};

export default Input;  