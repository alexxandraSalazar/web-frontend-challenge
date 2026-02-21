"use client";
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getUserById } from '@/services/users.service';
import { getAccountById } from '@/services/account.service';
import { UserInfo, Account, BankContextType } from '@/types';

/**
 * Context for global state.
 */
export const BankContext = createContext<BankContextType | undefined>(undefined);

/**
 * Provider that manages user data and account balances.
 */
export const BankProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches user profile and account details from the API.
     * Uses sequential requests to ensure data consistency.
     */
    const loadBankData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch user info first
            const userData = await getUserById(1);
            setUser(userData);

            // If user has products, fetch each account detail
            if (userData.products && userData.products.length > 0) {
                const tempAccounts: Account[] = [];

                for (const product of userData.products) {
                    const detail = await getAccountById(product.id);

                    tempAccounts.push({
                        ...detail,
                        account_number: Number(product.id),
                    });
                }

                setAccounts(tempAccounts);
            }
        } catch (err) {
            setError((err as Error).message || "Connection Error");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load initial data on mount
    useEffect(() => {
        loadBankData();
    }, [loadBankData]);

    /**
     * Public method to refresh all data (e.g., after a transfer).
     */
    // Dentro del BankProvider
    // Dentro de BankProvider en su archivo de contexto
    const refreshData = async () => {
        try {
            setIsLoading(true);
            await loadBankData(); // Recarga usuarios y balances reales de la API
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BankContext.Provider value={{
            user,
            accounts,
            isLoading,
            error,
            refreshData // Ahora disponible para los componentes
        }}>
            {children}
        </BankContext.Provider>
    );
};