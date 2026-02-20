'use client'

import { useContext, useEffect, useState } from 'react'
import { BankContext } from '@/context/BankProvider'
import { getAccountTransactions } from '@/services/account.service'
import { TransactionTable } from '@/components/ui/TransactionTable'
import { Transaction } from '@/types'

const TABS = ['Movimientos', 'Estado', 'Detalle', 'Fondo no Disponible']

export default function HomePage() {
    const context = useContext(BankContext)
    const [activeTab, setActiveTab] = useState('Movimientos')
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loadingTransactions, setLoadingTransactions] = useState(true)

    const { accounts, isLoading: isLoadingBank } = context || {}

    useEffect(() => {
        const loadTransactions = async () => {
            if (accounts?.[0]?.account_number) {
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
                                ? 'bg-greenPastel text-greenLight font-semibold' 
                                : 'bg-transparent text-grayContent' 
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {isLoadingBank || loadingTransactions ? (
                <div className="flex justify-center py-12">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-greenPrimary" />
                </div>
            ) : (
                <div className="mt-4">
                    {activeTab === 'Movimientos' ? (
                        <TransactionTable transactions={transactions} />
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