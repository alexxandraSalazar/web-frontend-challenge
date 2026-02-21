"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIconComponent from '@/components/icons/DashboardIconComponent';
import TransferIconComponent from '@/components/icons/TransferIconComponent';
import HistoryIconComponent from '@/components/icons/PayIconComponent';
import PayIconComponent from '@/components/icons/PayIconComponent';
import MyTransactionsIconComponent from '@/components/icons/MyTransactionsIconComponent';
import ManageIconComponent from '@/components/icons/ManageIconComponent';
import CheckIconComponent from '@/components/icons/CheckIconComponent';
import PaynetIconComponent from '@/components/icons/PaynetIconComponent';
import SavingsIconComponent from '@/components/icons/SavingsIconComponent';
import SettingsIconComponent from '@/components/icons/SettingsIconComponent';
import { SelectInputSmall } from '@/components/ui/SelectInputSmall';
import ChangeIconComponent from "@/components/icons/ChangeIconComponent";
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
    dashboard: DashboardIconComponent,
    transfer: TransferIconComponent,
    history: HistoryIconComponent,
    pay: PayIconComponent,
    myTransactions: MyTransactionsIconComponent,
    manage: ManageIconComponent,
    check: CheckIconComponent,
    paynet: PaynetIconComponent,
    savings: SavingsIconComponent,
    settings: SettingsIconComponent,
};

const CURRENCY_OPTIONS = [
    { value: "NIO", label: "Córdoba" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "Euro" },
];

interface SidebarItem {
    label: string;
    href: string;
    iconName: string;
}

interface SidebarProps {
    logo: React.ReactNode;
    items: SidebarItem[];
}

export default function Sidebar({ logo, items }: SidebarProps) {
    const [fromCurrency, setFromCurrency] = useState("NIO");
    const [toCurrency, setToCurrency] = useState("USD");
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white border border-[#DFE1DF] rounded-md shadow-sm"
            >
                <div className="w-6 h-0.5 bg-primary mb-1"></div>
                <div className="w-6 h-0.5 bg-primary mb-1"></div>
                <div className="w-6 h-0.5 bg-primary"></div>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <aside className={`
    fixed left-0 top-0 w-70 h-full min-h-screen bg-sidebarBg border-r border-gray-200 flex flex-col p-6 z-50
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}>
                <div className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col">
                    <div className="mb-10 px-2 flex justify-center shrink-0">
                        {logo}
                    </div>

                    <nav className="flex flex-col gap-1 shrink-0">
                        {items.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = ICON_MAP[item.iconName] || DashboardIconComponent;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive ? "bg-greenPastel text-greenLight" : "text-primary hover:bg-gray-100"}
                        `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            width={22}
                                            height={22}
                                            fill="currentColor"
                                            className={isActive ? "text-greenLight" : "text-primary"}
                                        />
                                        <span className={`text-sidebarBase ${isActive ? "font-semibold" : "font-medium"}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className={`text-lg ${isActive ? "text-greenLight" : "text-gray-300"}`}>
                                        ›
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="border-t border-gray-200 pt-6 mt-6 shrink-0">
                        <h3 className="text-bodyMedium text-black mb-4 font-bold">Tasa de cambio</h3>

                        <div className="flex gap-2 mb-4">
                            <SelectInputSmall
                                value={fromCurrency}
                                onChange={setFromCurrency}
                                options={CURRENCY_OPTIONS}
                            />
                            <SelectInputSmall
                                value={toCurrency}
                                onChange={setToCurrency}
                                options={CURRENCY_OPTIONS}
                            />
                        </div>

                        <div className="flex items-center justify-between mb-4 p-3 rounded-2xl">
                            <div className="flex flex-col">
                                <span className="text-bodymedium text-black font-bold">{fromCurrency}: 35.10</span>
                            </div>

                            <div
                                onClick={handleSwap}
                                className="cursor-pointer transition-transform active:scale-90"
                            >
                                <ChangeIconComponent width={32} height={32} />
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-bodymedium text-black font-bold">{toCurrency}: 35.95</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 mb-4">
                            <div className="text-caption text-black font-medium">
                                <p>IP del Servidor: 190.432.574.23</p>
                                <p>Último acceso: 2021/11/21 13:32:11</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}