interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function Input({ label, type = 'text', placeholder, value, onChange }: InputProps) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-primary"
        />
      </div>
    );
  }
  