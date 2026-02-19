import { apiFetch } from "./api";
import { Account, AccountTransactionResponse } from "@/types";

/**
 * Retrieves account information by internal account number.
 *
 * @param accountId 9–12 digit account identifier
 * @returns Account details including balance and currency
 */
export const getAccountById = async (
    accountId: string | number
): Promise<Account> => {
    return apiFetch<Account>(`/accounts/${accountId}`);
};

/**
 * Retrieves transactions associated with an account.
 *
 * @param accountId Account internal number
 * @returns Paginated list of transactions
 */
export const getAccountTransactions = async (
    accountId: string | number
): Promise<AccountTransactionResponse> => {
    return apiFetch<AccountTransactionResponse>(
        `/accounts/${accountId}/transactions`
    );
};
