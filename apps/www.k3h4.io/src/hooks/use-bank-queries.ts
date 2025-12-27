import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";

export type BankTransaction = {
  id: string;
  amount: string;
  direction: string;
  kind: string;
  note: string | null;
  balanceAfter: string;
  createdAt: string;
};

export type BankBalanceResponse = { balance: string };
export type BankTransactionsResponse = { transactions: BankTransaction[] };

export const bankKeys = {
  balance: (apiBase: string, token: string) => ["bank", "balance", apiBase, token || "anon"],
  transactions: (apiBase: string, token: string) => ["bank", "transactions", apiBase, token || "anon"],
};

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("k3h4.accessToken") || "";
}

function getAuthHeaders() {
  const token = getToken();
  if (!token) return null;
  return {
    token,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    } as const,
  };
}

async function fetchJson<T>(url: string, options: RequestInit, onErrorMetric: string): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    const message = (data as any)?.error || "Request failed";
    void trackTelemetry(onErrorMetric, { message });
    throw new Error(message);
  }
  return data as T;
}

export function useBankBalanceQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: bankKeys.balance(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access K3H4 Bank.");
      const data = await fetchJson<BankBalanceResponse>(`${apiBase}/bank/balance`, { headers: auth.headers }, "bank.balance.fetch.error");
      void trackTelemetry("bank.balance.fetch.success");
      return data;
    },
  });
}

export function useBankTransactionsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: bankKeys.transactions(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access K3H4 Bank.");
      const data = await fetchJson<BankTransactionsResponse>(`${apiBase}/bank/transactions?limit=50`, { headers: auth.headers }, "bank.transactions.fetch.error");
      void trackTelemetry("bank.transactions.fetch.success", { count: Array.isArray(data.transactions) ? data.transactions.length : 0 });
      return data;
    },
  });
}

export function useBankUpdateMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["bank", "update", apiBase, auth?.token || ""],
    mutationFn: async (payload: { delta?: number; set?: number; reason?: string }) => {
      if (!auth) throw new Error("Sign in to access K3H4 Bank.");
      const data = await fetchJson<BankBalanceResponse & { transaction?: BankTransaction }>(
        `${apiBase}/bank/balance`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "bank.balance.update.error",
      );
      void trackTelemetry("bank.balance.update.success", { mode: payload.set !== undefined ? "set" : "delta" });
      return data;
    },
    onSuccess: (data) => {
      const token = getToken();
      queryClient.setQueryData(bankKeys.balance(apiBase, token), { balance: data.balance });
      queryClient.setQueryData(bankKeys.transactions(apiBase, token), (prev: BankTransactionsResponse | undefined) => {
        const current = prev?.transactions || [];
        const next = data.transaction ? [data.transaction, ...current].slice(0, 50) : current;
        return { transactions: next };
      });
    },
  });
}
