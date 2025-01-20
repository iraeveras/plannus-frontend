import React from 'react';

interface FormWrapperProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-white p-6 rounded shadow-md space-y-4"
        >
            {children}
        </form>
    );
};

export default FormWrapper;