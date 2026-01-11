export type CoinStack = {
    id: string;
    coins: number;
    height: number;
    position: [number, number, number];
    baseY: number;
    direction: "credit" | "debit" | "";
    note?: string | null;
    amount: number;
    balanceAfter: number;
    createdAt?: string;
};

export type LedgerEntry = {
    id: string;
    note?: string | null;
    amount?: string | number;
    balanceAfter?: string | number;
    createdAt?: string;
};
