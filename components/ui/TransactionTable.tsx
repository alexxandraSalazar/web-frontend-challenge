'use client'

import React, { useState, useMemo } from 'react'
import { Transaction } from '@/types'
import { formatDate, formatCurrency } from '@/utils/formatters'
import { filterTransactionsByDate } from '@/utils/filters'

interface TransactionTableProps {
    transactions?: Transaction[]
    className?: string
}

/**
 * Tabla de transacciones con filtros de fecha.
 * * @param {TransactionTableProps} props
 */
export function TransactionTable({
    transactions = [],
    className = '',
}: TransactionTableProps) {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const filteredTransactions = useMemo(() => {
        return filterTransactionsByDate(transactions, startDate, endDate)
    }, [transactions, startDate, endDate])

    const handleClear = () => {
        setStartDate('')
        setEndDate('')
    }

    return (
        <div className={`flex flex-col w-full ${className}`}>
            
            <div className="flex justify-end items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-grayContent uppercase">Desde:</label>
                    <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-greenLight outline-none text-gray-700 bg-white"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-grayContent uppercase">Hasta:</label>
                    <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-greenLight outline-none text-gray-700 bg-white"
                    />
                </div>
                {(startDate || endDate) && (
                    <button 
                        onClick={handleClear}
                        className="text-s font-bold text-greenPrimary hover:underline ml-2"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <div className="w-full overflow-x-auto rounded-[4px] border border-gray-200 shadow-sm">
                <table className="w-full border-collapse bg-white text-left">
                    <thead>
                        <tr className="border-b border-gray-200 bg-white">
                            <th className="px-6 py-4 text-label font-bold tracking-tight text-grayContent">Fecha</th>
                            <th className="px-6 py-4 text-label font-bold tracking-tight text-grayContent">Descripción</th>
                            <th className="px-6 py-4 text-label font-bold tracking-tight text-grayContent text-right">Débito USD</th>
                            <th className="px-6 py-4 text-label font-bold tracking-tight text-grayContent text-right">Balance USD</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-caption text-gray-500 font-medium">
                                    No se encontraron transacciones en esta cuenta.
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((t, index) => (
                                <tr key={t.transaction_number || index} className="group hover:bg-gray-50 transition-colors duration-150">
                                    <td className="whitespace-nowrap px-6 py-4 text-input font-medium text-gray-900">
                                        {formatDate(t.transaction_date)}
                                    </td>
                                    <td className="px-6 py-4 text-input font-medium text-gray-900">
                                        {t.description}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-input font-bold text-gray-900 text-right">
                                        {formatCurrency(t.amount?.value)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-input font-medium text-gray-400 text-right">
                                        ---
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}