"use client";

import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputSmallProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

export function SelectInputSmall({
  value,
  onChange,
  options,
  className = "",
}: SelectInputSmallProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-[111px] h-[40px] appearance-none 
          px-2 py-2 pr-6
          border border-gray-200 rounded-[6px] 
          text-input text-primary 
          bg-background hover:bg-white 
          transition-colors cursor-pointer outline-none 
          focus:ring-1 focus:ring-greenLight
        "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-gray-400">
        ▼
      </span>
    </div>
  );
}