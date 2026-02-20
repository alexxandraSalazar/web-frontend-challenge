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
    const pathname = usePathname();

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <aside className="fixed left-0 top-0 w-70 h-screen bg-sidebarBg border-r border-gray-200 flex flex-col p-6 gap-2 z-30">
            <div className="mb-10 px-2 flex justify-center">
                {logo}
            </div>

            <nav className="flex-1 flex flex-col gap-1">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = ICON_MAP[item.iconName] || DashboardIconComponent;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
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

            <div className="border-t border-gray-200 pt-6 mt-auto">
                <h3 className="text-bodyMedium text-black mb-4 font-bold">Tasa de cambio</h3>

                <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full appearance-none px-3 py-2 border border-gray-200 rounded-xl text-[12px] font-semibold text-primary bg-gray-50 hover:bg-white transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-greenLight"
                        >
                            <option value="NIO">Córdoba</option>
                            <option value="USD">USD</option>
                            <option value="EUR">Euro</option>
                        </select>
                        <span className="absolute right-2 top-2.5 pointer-events-none text-[10px] text-gray-400">▼</span>
                    </div>

                    <div className="relative flex-1">
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full appearance-none px-3 py-2 border border-gray-200 rounded-xl text-[12px] font-semibold text-primary bg-gray-50 hover:bg-white transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-greenLight"
                        >
                            <option value="USD">USD</option>
                            <option value="NIO">Córdoba</option>
                            <option value="EUR">Euro</option>
                        </select>
                        <span className="absolute right-2 top-2.5 pointer-events-none text-[10px] text-gray-400">▼</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{fromCurrency}</span>
                        <span className="text-[14px] text-black font-bold">35.10</span>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="w-8 h-8 bg-greenLight hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-transform active:scale-90 shadow-md"
                    >
                        <span className="text-sm font-bold">⇄</span>
                    </button>

                    <div className="flex flex-col text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{toCurrency}</span>
                        <span className="text-[14px] text-black font-bold">35.95</span>
                    </div>
                </div>

                <div className="text-caption text-black font-medium">
                    <p>IP del Servidor: 190.432.574.23</p>
                    <p>Último acceso: 2021/11/21 13:32:11</p>
                </div>
            </div>
        </aside>
    );
}