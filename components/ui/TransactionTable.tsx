'use client'

import React from 'react'
import { Transaction } from '@/types'
import { formatDate, formatCurrency } from '@/utils/formatters'

interface TransactionTableProps {
    transactions?: Transaction[]
    className?: string
}

export function TransactionTable({
    transactions = [],
    className = '',
}: TransactionTableProps) {
    return (
        <div className={`w-full overflow-x-auto rounded-[4px] border border-gray-200 shadow-sm ${className}`}>
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
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-caption text-gray-500 font-medium">
                                No se encontraron transacciones en esta cuenta.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((t, index) => (
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
    )
}