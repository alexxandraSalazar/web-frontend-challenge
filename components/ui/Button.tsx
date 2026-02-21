import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    label: string;
}

export default function Button({
    label,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) {

    const variants = {
        primary: "bg-greenPrimary text-white hover:bg-greenLight",
        secondary: "bg-greenPastel text-greenLight hover:bg-greenLight hover:text-white",
        outline: "border border-greenPrimary text-greenPrimary hover:bg-gray-100"
    };

    return (
        <button
            className={`
        w-[120px] h-[48px] 
        py-[14px] px-[24px] gap-[10px]
        rounded-[4px] opacity-100
        flex items-center justify-center
        text-label transition-colors duration-200
        ${variants[variant]}
        ${className}
    `}
            {...props}
        >
            {label}
        </button>
    );
}