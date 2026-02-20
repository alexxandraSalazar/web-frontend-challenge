"use client";
import React from "react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = ({ label, ...props }: FloatingInputProps) => {
  return (
    <div className="relative w-107">
      <input
        {...props}
        className="
          peer
          w-full
          h-12
          px-4
          bg-background
          border border-gray-300
          rounded-sm
          font-sans
          text-input
          text-inputText
          placeholder-transparent
          focus:outline-none
          focus:border-greenPrimary
          focus:ring-1
          focus:ring-greenPrimary
        "
        placeholder={label}
      />
      <label
        className="
          absolute
          left-3
          -top-2.5
          px-1
          bg-background
          text-greenPrimary
          text-label
          font-medium
          transition-all
          peer-placeholder-shown:text-grayContent
          peer-placeholder-shown:text-input
          peer-placeholder-shown:top-4
          peer-placeholder-shown:left-4
          peer-focus:-top-2.5
          peer-focus:left-3
          peer-focus:text-greenPrimary
          peer-focus:text-label
        "
      >
        {label}
      </label>
    </div>
  );
};