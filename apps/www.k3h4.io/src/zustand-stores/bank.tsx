import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const BalanceSchema = z.object({ balance: z.string() });
const TransactionSchema = z.object({
    id: z.string(),
    amount: z.string(),
    direction: z.string(),
    kind: z.string(),
    note: z.string().nullish(),
    balanceAfter: z.string(),
    createdAt: z.string(),
});
const TransactionsSchema = z.object({ transactions: z.array(TransactionSchema), total: z.number() });

export type BankTransaction = z.infer<typeof TransactionSchema>;

export type BankState = {
    balance: string | null;
    transactions: BankTransaction[];
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchBalance: () => Promise<void>;
    fetchTransactions: () => Promise<void>;
};

export const useBankStore = create<BankState>((set) => ({
    balance: null,
    transactions: [],
    status: "idle",
    error: null,

    fetchBalance: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load balance." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const res = await apiFetch("/bank/balance", { token: session.accessToken, baseUrl: apiBase, schema: BalanceSchema });
            set({ balance: res.balance, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch balance";
            set({ status: "error", error: message });
        }
    },

    fetchTransactions: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load transactions." });
            return;
        }
        try {
            const res = await apiFetch("/bank/transactions", { token: session.accessToken, baseUrl: apiBase, schema: TransactionsSchema });
            set({ transactions: res.transactions, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch transactions";
            set({ status: "error", error: message });
        }
    },
}));

export function useBankState() {
    return useBankStore();
}
