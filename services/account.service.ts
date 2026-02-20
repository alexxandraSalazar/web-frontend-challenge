import { apiFetch } from "./api";
import { Account, AccountTransactionResponse } from "@/types";

/**
 * Retrieves account information by account number.
 *
 * @param accountId Account internal number (9-12 digits)
 * @returns Account details including balance and currency
 */
export const getAccountById = async (
  accountId: string | number
): Promise<Account> => {
  return apiFetch<Account>(`/accounts/${accountId}`);
};

/**
 * Retrieves transactions associated with a specific account.
 *
 * @param accountId Account internal number
 * @returns Paginated transaction response
 */
export const getAccountTransactions = async (
  accountId: string | number
): Promise<AccountTransactionResponse> => {
  return apiFetch<AccountTransactionResponse>(
    `/accounts/${accountId}/transactions`
  );
};
