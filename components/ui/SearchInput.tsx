"use client";

import SearchIconComponent from '@/components/icons/SearchIconComponent';

interface SearchInputProps {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ placeholder = "Buscar", onChange }: SearchInputProps) {
    return (
        <div className="relative w-70 h-[40px]">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIconComponent width={20} height={20} />
            </span>
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="w-full h-full pl-10 pr-4 border border-gray-200 rounded-[8px] text-sm placeholder-grayContent focus:outline-none focus:border-greenLight bg-transparent"
            />
        </div>
    );
}