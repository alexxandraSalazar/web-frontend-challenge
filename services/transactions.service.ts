import { apiFetch } from "./api";
import { Transaction, TransactionRequest } from "@/types";

/**
 * Creates a transfer transaction between two accounts.
 *
 * The backend mock handles:
 * - Currency validation
 * - Account existence validation
 * - Business rule enforcement
 *
 * @param payload Transfer request data
 * @returns Created transaction with metadata
 */
export const createTransaction = async (
    payload: TransactionRequest
): Promise<Transaction> => {
    return apiFetch<Transaction>(`/transactions`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
};
