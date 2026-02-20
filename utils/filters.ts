import { Transaction } from "@/types";

/**
 * Filters transactions by a specific date range.
 * @param {Transaction[]} transactions - List of transactions to filter.
 * @param {string} startDate - Start date (YYYY-MM-DD).
 * @param {string} endDate - End date (YYYY-MM-DD).
 * @returns {Transaction[]} Filtered list of transactions.
 */
export const filterTransactionsByDate = (
    transactions: Transaction[],
    startDate: string,
    endDate: string
): Transaction[] => {
    // Return all if dates are missing
    if (!startDate || !endDate) return transactions;

    // Set start to beginning of day and end to end of day for precision
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    return transactions.filter((tx) => {
        if (!tx.transaction_date) return false;

        const txTime = new Date(tx.transaction_date).getTime();
        return txTime >= start && txTime <= end;
    });
};