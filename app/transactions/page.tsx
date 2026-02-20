'use client'

import { useContext, useEffect, useState } from 'react'
import { BankContext } from '@/context/BankProvider'
import { getAccountTransactions } from '@/services/account.service'
import { TransactionTable } from '@/components/ui/TransactionTable'
import { Transaction } from '@/types'
import { filterTransactionsByDate } from '@/utils/filters'

const TABS = ['Movimientos', 'Estado', 'Detalle', 'Fondo no Disponible']

export default function HomePage() {
    const context = useContext(BankContext)
    const [activeTab, setActiveTab] = useState('Movimientos')
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loadingTransactions, setLoadingTransactions] = useState(true)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const { accounts, isLoading: isLoadingBank } = context || {}

    useEffect(() => {
        const loadTransactions = async () => {
            if (accounts && accounts.length > 0 && accounts[0].account_number) {
                try {
                    setLoadingTransactions(true)
                    const response = await getAccountTransactions(accounts[0].account_number)
                    setTransactions(response.items || [])
                } catch (error) {
                    console.error("Error loading transactions:", error)
                } finally {
                    setLoadingTransactions(false)
                }
            } else if (!isLoadingBank) {
                setLoadingTransactions(false)
            }
        }

        if (!isLoadingBank) {
            loadTransactions()
        }
    }, [accounts, isLoadingBank])

    const filteredTransactions = filterTransactionsByDate(transactions, startDate, endDate)

    if (!context) return null

    return (
        <main className="p-8">
            <h1 className="text-h1 mb-8 text-black">
                Mis Transacciones
            </h1>

            <div className="flex items-center gap-2 mb-8 border-b border-transparent">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-lg text-input transition-all duration-200 ${
                            activeTab === tab
                                ? 'bg-greenPastel text-greenLight' 
                                : 'bg-transparent text-grayContent' 
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'Movimientos' && !loadingTransactions && (
                <div className="flex justify-end items-center gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-grayContent uppercase">Desde:</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-greenLight outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-grayContent uppercase">Hasta:</label>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-greenLight outline-none"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <button 
                            onClick={() => { setStartDate(''); setEndDate(''); }}
                            className="text-s font-bold text-greenPrimary hover:underline ml-2"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            )}

            {isLoadingBank || loadingTransactions ? (
                <div className="flex justify-center py-12">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-greenPrimary" />
                </div>
            ) : (
                <div className="mt-4">
                    {activeTab === 'Movimientos' ? (
                        <TransactionTable transactions={filteredTransactions} />
                    ) : (
                        <div className="p-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl">
                            No hay información disponible en {activeTab}
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}