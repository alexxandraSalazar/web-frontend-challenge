// ===== COMMON =====

export interface Amount {
    currency: string;
    value: number;
}

export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail?: string;
    instance?: string;
    traceId?: string;
}

// ===== USER =====

export interface AccountProduct {
    type: string;
    id: string;
}

export interface UserInfo {
    full_name: string;
    profile_photo: string;
    products: AccountProduct[];
}

// ===== ACCOUNT =====

export interface Account {
    alias: string;
    account_number: number;
    balance: number;
    currency: string;
}

// ===== TRANSACTIONS =====

export interface Transaction {
    transaction_number: string;
    description: string;
    bank_description: string;
    transaction_type: string;
    origin: string;
    destination: string;
    amount: Amount;
    transaction_date?: string;
}

export interface AccountTransactionResponse {
    page: number;
    size: number;
    next: number;
    total_count: number;
    items: Transaction[];
}

export interface TransactionRequest {
    origin: string;
    destination: string;
    amount: Amount;
}


/**
 * Definition of the global banking state.
 */
export interface BankContextType {
    user: UserInfo | null;
    accounts: Account[];
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}