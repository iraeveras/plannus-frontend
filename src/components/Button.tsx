import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
    const classes = variant === 'primary'
      ? 'bg-primary text-white px-4 py-2 rounded hover:bg-primary/90'
      : 'bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90';
  
    return (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }
  