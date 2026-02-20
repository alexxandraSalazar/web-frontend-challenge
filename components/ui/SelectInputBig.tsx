"use client";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { Account } from "@/types";

interface SimpleOption {
    id: string;
    label: string;
}

interface SelectInputBigProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: (Account | SimpleOption | any)[];
    placeholder?: string;
    variant?: "simple" | "account";
}

export const SelectInputBig = ({
    label,
    value,
    options,
    onChange,
    placeholder,
    variant = "simple",
}: SelectInputBigProps) => {

    const selectedOption = options.find(
        (o) => String(o.account_number || o.id) === String(value)
    );

    const shouldHideIcon = variant === "account" && value && selectedOption;

    return (
        <div className="flex flex-col gap-2 w-107">
            <label className="text-label text-primary font-sans font-medium">
                {label}
            </label>

            <div className="relative group">
                <select
                    className={`
            w-full h-12 pt-3 pb-3 px-4
            bg-white border border-[#DFE1DF] rounded-sm
            appearance-none focus:outline-none
            focus:border-greenPrimary
            text-selectInput font-sans cursor-pointer
            ${variant === "account" && value ? "text-transparent" : "text-primary"}
        `}
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {placeholder && (
                        <option value="" disabled className="text-grayContent">
                            {placeholder}
                        </option>
                    )}

                    {options.map((opt, i) => {
                        const isAccount = 'account_number' in opt;
                        return (
                            <option
                                key={i}
                                value={isAccount ? opt.account_number : opt.id}
                                className="text-black bg-white"
                            >
                                {variant === "account" && isAccount
                                    ? `${opt.currency} ${opt.alias} - ${opt.account_number}`
                                    : (opt as SimpleOption).label}
                            </option>
                        );
                    })}
                </select>

                {variant === "account" && value && selectedOption && (
                    <div className="absolute inset-0 flex items-center px-[16px] pointer-events-none">
                        <div className="flex justify-between w-full text-selectInput font-sans">
                            <span className="text-greenLight font-medium">
                                {selectedOption.currency} {selectedOption.alias}
                            </span>

                            <span className="text-grayContent">
                                {selectedOption.account_number}
                            </span>

                            <span className="text-primary font-semibold">
                                {selectedOption.currency === "NIO" ? "C$" : "$"}{" "}
                                {selectedOption.balance}
                            </span>
                        </div>
                    </div>
                )}

                {!shouldHideIcon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black group-focus-within:text-greenPrimary transition-colors">
                        <ChevronDownIcon className="w-5 h-5" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInputBig;