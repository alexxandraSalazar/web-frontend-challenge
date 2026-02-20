import { useContext } from 'react';
import { BankContext } from '@/context/BankProvider';

/**
 * Custom hook to consume the BankContext.
 * Ensures the context is used within its provider.
 */
export const useBank = () => {
    const context = useContext(BankContext);
    
    if (context === undefined) {
        throw new Error("useBank must be used within a BankProvider");
    }
    
    return context;
};