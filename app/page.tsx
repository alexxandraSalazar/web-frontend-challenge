'use client'

import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { BankContext } from '@/context/BankProvider'
import { getAccountTransactions } from '@/services/account.service'
import { CardComponent } from '@/components/ui/CardComponent' 
import { AccountCard } from '@/components/ui/AccountCard'    
import { TransactionTable } from '@/components/ui/TransactionTable'
import { Transaction } from '@/types'
import { formatCurrency } from '@/utils/formatters'

const TABS = ['Movimientos', 'Estado', 'Detalle', 'Fondo no Disponible']

export default function Page() {
    const context = useContext(BankContext)
    const [activeTab, setActiveTab] = useState('Movimientos')
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loadingTransactions, setLoadingTransactions] = useState(true)

    const { accounts, user, isLoading: isLoadingBank } = context || {}

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
        if (!isLoadingBank) loadTransactions()
    }, [accounts, isLoadingBank])

    if (!context) return null

    return (
        <main className="p-4 md:p-6 w-full mx-auto flex flex-col gap-12">
            
            <section>
                <h2 className="text-h1 mb-6 text-black font-bold">Mis tarjetas</h2>
                <div className="flex flex-wrap gap-6">
                    {isLoadingBank ? (
                        [1].map((i) => (
                            <div key={i} style={{ width: '353.35px', height: '208.46px' }} className="bg-gray-200 animate-pulse rounded-[15px]" />
                        ))
                    ) : (
                        accounts?.map((acc, index) => (
                            <CardComponent
                                key={`card-${acc.account_number}`}
                                variant={index === 0 ? 'green' : index === 1 ? 'dark-blue' : 'gray'}
                                cardNumber={acc.account_number.toString().replace(/(\d{4})/g, '$1 ').trim()}
                                holderName={user?.full_name || "TITULAR"}
                                expiryDate="06/26"
                            />
                        ))
                    )}
                </div>
            </section>
            <section>
                <h2 className="text-h1 mb-6 text-black font-bold">Mis cuentas</h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(355px,1fr))] gap-6">
                    {isLoadingBank ? (
                        [1, 2].map((i) => <AccountCard key={i} isLoading={true} />)
                    ) : (
                        accounts?.map((acc) => (
                            <AccountCard
                                key={`acc-${acc.account_number}`}
                                accountTitle={acc.alias || 'Cuenta de Ahorros'}
                                accountNumber={acc.account_number.toString()}
                                balance={`${acc.currency} ${formatCurrency(acc.balance)}`}
                                currencyType={acc.currency as 'USD' | 'NIO'}
                            />
                        ))
                    )}
                </div>
            </section>

            <section className="w-full">
                <h2 className="text-h1 mb-8 text-black font-bold">Transacciones recientes</h2>

                <div className="flex items-center gap-2 mb-8 border-b border-transparent overflow-x-auto no-scrollbar">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-lg text-input transition-all duration-200 font-semibold whitespace-nowrap ${
                                activeTab === tab ? 'bg-greenPastel text-greenLight' : 'bg-transparent text-grayContent'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {isLoadingBank || loadingTransactions ? (
                    <div className="flex justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-greenLight" />
                    </div>
                ) : (
                    <div className="w-full">
                        {activeTab === 'Movimientos' ? (
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-end mb-2">
                                    <Link href="/transactions" className="text-sm font-bold text-primary hover:underline">
                                        Ver todas
                                    </Link>
                                </div>
                                <TransactionTable transactions={transactions} />
                            </div>
                        ) : (
                            <div className="w-full p-20 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl bg-white shadow-sm font-lato">
                                No hay información disponible en la sección de {activeTab}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}