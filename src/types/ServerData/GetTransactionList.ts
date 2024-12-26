import { AdditionalServerResponseData } from '@/shared/types/AdditionalServerResponseData';

interface TransactionSender {
    address: string;
    isMy: boolean;
    inAddressBook: boolean;
    name: string;
}

interface TransactionRecipient {
    address: string;
    isMy: boolean;
    inAddressBook: boolean;
    name: string;
}

interface TransactionCurrency {
    code: string;
    title: string;
    symbol: string;
}

interface TransactionNotes {
    text: string;
    type: string;
}

interface TransactionDate {
    unix: number;
    formatted: string;
    date: string;
}

export interface Transaction {
    timestamp: string;
    date: TransactionDate;
    notes: TransactionNotes;
    amount: number;
    currency: TransactionCurrency;
    sender: TransactionSender;
    recipient: TransactionRecipient;
    operationType: string;
}

export interface GetTransactionListResponse extends AdditionalServerResponseData {
    data: Transaction[];
    pagination: {
        total: number;
        limit: number;
        currentPage: number;
        totalPages: number;
    };
}
