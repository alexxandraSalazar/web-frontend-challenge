'use client';

import React, { useState } from 'react';
import CopyIconComponent from '@/components/icons/CopyIconComponent';
import USAFlagComponent from '@/components/icons/USAFlagComponent';
import NicFlagComponent from '@/components/icons/NicFlagComponent';

interface AccountCardProps {
    accountTitle?: string;
    accountNumber?: string;
    balance?: string;
    currencyType?: 'USD' | 'NIO';
    className?: string;
    isLoading?: boolean;
}

export function AccountCard({
    accountTitle,
    accountNumber,
    balance,
    currencyType,
    className = '',
    isLoading = false
}: AccountCardProps) {
    const [copied, setCopied] = useState(false);

    const FlagComponent = currencyType === 'USD' ? USAFlagComponent : NicFlagComponent;

    const handleCopy = async () => {
        if (!accountNumber) return;
        try {
            await navigator.clipboard.writeText(accountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Error al copiar el número de cuenta', err);
        }
    };

    if (isLoading) {
        return (
            <div className={`
                bg-background border border-gray-100 rounded p-4 
                shadow-[0px_2px_15px_0px_#6868681C] w-88.75 h-37.5 
                animate-pulse flex flex-col justify-between ${className}
            `}>
                <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-3">
                        <div className="h-5 w-32 bg-gray-200 rounded" />
                        <div className="h-6 w-24 bg-gray-100 rounded-[4px]" />
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
                <div className="h-8 w-44 bg-gray-200 rounded" />
            </div>
        );
    }

    return (
        <div
            className={`
                bg-background border border-gray-100 flex flex-col justify-between
                transition-shadow duration-200 hover:shadow-md
                rounded p-4 gap-9.5
                shadow-[0px_2px_15px_0px_#6868681C]
                w-88.75 h-37.5
                ${className}
            `}
        >
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-h1 text-primary font-semibold mb-1 truncate">
                        {accountTitle}
                    </h3>

                    <div className="flex items-center gap-2 relative">
                        <span className="w-[90px] h-[24px] rounded-[4px] text-greenLight text-input bg-greenPastel flex items-center justify-center font-bold">
                            {accountNumber}
                        </span>

                        <div className="flex items-center relative">
                            <button
                                onClick={handleCopy}
                                className={`transition-all duration-200 p-1 -m-1 ${
                                    copied ? 'text-greenPrimary' : 'text-grayContent hover:text-greenLight'
                                }`}
                                aria-label="Copiar número de cuenta"
                            >
                                <CopyIconComponent className="w-4 h-4" />
                            </button>
                            
                            {/* Mensaje Flotante de Copiado */}
                            <span className={`
                                absolute left-6 text-[10px] font-bold text-greenPrimary uppercase tracking-tighter
                                transition-all duration-300 pointer-events-none
                                ${copied ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                            `}>
                                Copiado
                            </span>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 ml-4">
                    <FlagComponent className="w-8 h-8" />
                </div>
            </div>
            
            <div className="flex flex-col">
                <span className="text-h1 text-primary font-bold">
                    {balance}
                </span>
            </div>
        </div>
    );
}