import { useEffect, useMemo } from "react";

import { bankStore, type TabKey } from "../stores/bank-store";
import { type BankTransaction, type BankTransactionFilters, useBankBalanceQuery, useBankTransactionsQuery, useBankUpdateMutation } from "./use-bank-queries";

export function useK3h4Bank(apiBase: string, filters?: Partial<BankTransactionFilters>) {
  const { amountInput, setAmountInput, note, setNote, activeTab, setActiveTab, apiBase: storeApiBase, setApiBase } = bankStore.useShallow((state) => ({
    apiBase: state.apiBase,
    setApiBase: state.setApiBase,
    amountInput: state.amountInput,
    setAmountInput: state.setAmountInput,
    note: state.note,
    setNote: state.setNote,
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }));

  useEffect(() => {
    if (storeApiBase !== apiBase) {
      setApiBase(apiBase);
    }
  }, [apiBase, setApiBase, storeApiBase]);

  const balanceQuery = useBankBalanceQuery(apiBase);
  const transactionsQuery = useBankTransactionsQuery(apiBase, {
    page: filters?.page ?? 0,
    pageSize: filters?.pageSize ?? 10,
    from: filters?.from,
    to: filters?.to,
    direction: filters?.direction,
  });
  const updateMutation = useBankUpdateMutation(apiBase);

  const balance = balanceQuery.data?.balance ?? null;
  const loading = balanceQuery.isPending;
  const transactions = transactionsQuery.data?.transactions ?? [];
  const totalTransactions = transactionsQuery.data?.total ?? transactions.length;
  const transactionsLoading = transactionsQuery.isPending;
  const updating = updateMutation.isPending;

  const error = useMemo(() => {
    const mutationErr = updateMutation.error as Error | null | undefined;
    const balanceErr = balanceQuery.error as Error | null | undefined;
    const txnErr = transactionsQuery.error as Error | null | undefined;
    return mutationErr?.message || balanceErr?.message || txnErr?.message || "";
  }, [balanceQuery.error, transactionsQuery.error, updateMutation.error]);

  const message = updateMutation.isSuccess ? "Balance updated" : "";

  const refreshBalance = () => balanceQuery.refetch();
  const refreshTransactions = () => transactionsQuery.refetch();

  const applyDelta = (amount: number, reason?: string) => updateMutation.mutate({ delta: amount, reason });
  const setAbsolute = (value: number, reason?: string) => updateMutation.mutate({ set: value, reason });

  return {
    balance,
    loading,
    updating,
    message,
    error,
    transactions,
    totalTransactions,
    transactionsLoading,
    refreshBalance,
    refreshTransactions,
    applyDelta,
    setAbsolute,
    amountInput,
    setAmountInput,
    note,
    setNote,
    activeTab,
    setActiveTab,
  };
}

export type { TabKey } from "../stores/bank-store";
export type { BankTransaction } from "./use-bank-queries";
