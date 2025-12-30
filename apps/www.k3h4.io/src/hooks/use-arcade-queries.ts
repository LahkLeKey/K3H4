import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

export type ArcadeMachine = {
  id: string;
  name: string;
  gameTitle: string;
  status: string;
  location?: string | null;
  createdAt?: string;
};

export type ArcadeCard = {
  id: string;
  label?: string | null;
  balance: string | number;
  status: string;
};

export type ArcadePrize = {
  id: string;
  name: string;
  sku?: string | null;
  costCoins: string | number;
  stock: number;
};

export type ArcadeSession = {
  id: string;
  machineId: string;
  cardId: string;
  creditsSpent: string | number;
  score?: number | null;
  startedAt?: string;
  endedAt?: string | null;
};

export type ArcadeOverview = {
  machines: ArcadeMachine[];
  cards: ArcadeCard[];
  prizes: ArcadePrize[];
  sessions: ArcadeSession[];
  redemptions: any[];
};

const arcadeKeys = {
  overview: (apiBase: string, token: string) => ["arcade", "overview", apiBase, token || "anon"],
};

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
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

export function useArcadeOverviewQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;
  return useQuery({
    enabled,
    queryKey: arcadeKeys.overview(apiBase, auth?.token || ""),
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view arcade data.");
      const data = await fetchJson<ArcadeOverview>(`${apiBase}/arcade/overview`, { headers: auth.headers }, "arcade.overview.error");
      void trackTelemetry("arcade.overview.success", { cards: data.cards?.length ?? 0 });
      return data;
    },
  });
}

export function useCreateArcadeCard(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["arcade", "card", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: { label?: string }) => {
      if (!auth) throw new Error("Sign in to create a card.");
      const data = await fetchJson<{ card: ArcadeCard }>(
        `${apiBase}/arcade/cards`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "arcade.card.create.error",
      );
      void trackTelemetry("arcade.card.create.success", { label: payload.label });
      return data.card;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["arcade", "overview", apiBase, token] });
      void queryClient.invalidateQueries({ queryKey: ["bank", "balance"] });
    },
  });
}

export function useTopUpArcadeCard(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["arcade", "card", "topup", apiBase, auth?.token || ""],
    mutationFn: async (payload: { cardId: string; amount: number; source?: string }) => {
      if (!auth) throw new Error("Sign in to top up a card.");
      const data = await fetchJson<{ card: ArcadeCard }>(
        `${apiBase}/arcade/cards/${payload.cardId}/topup`,
        { method: "POST", headers: auth.headers, body: JSON.stringify({ amount: payload.amount, source: payload.source }) },
        "arcade.card.topup.error",
      );
      void trackTelemetry("arcade.card.topup.success", { amount: payload.amount });
      return data.card;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["arcade", "overview", apiBase, token] });
      void queryClient.invalidateQueries({ queryKey: ["bank", "balance"] });
    },
  });
}

export function useCreateArcadePrize(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["arcade", "prize", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: { name: string; sku?: string; costCoins: number; stock?: number }) => {
      if (!auth) throw new Error("Sign in to create a prize.");
      const data = await fetchJson<{ prize: ArcadePrize }>(
        `${apiBase}/arcade/prizes`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "arcade.prize.create.error",
      );
      void trackTelemetry("arcade.prize.create.success", { name: payload.name });
      return data.prize;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["arcade", "overview", apiBase, token] });
    },
  });
}

export function useCreateArcadeSession(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["arcade", "session", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: { machineId: string; cardId: string; creditsSpent: number; score?: number }) => {
      if (!auth) throw new Error("Sign in to start a session.");
      const data = await fetchJson<{ session: ArcadeSession; balance: string | number }>(
        `${apiBase}/arcade/sessions`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "arcade.session.create.error",
      );
      void trackTelemetry("arcade.session.create.success", { credits: payload.creditsSpent });
      return data.session;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["arcade", "overview", apiBase, token] });
    },
  });
}

export function useRedeemArcadePrize(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["arcade", "prize", "redeem", apiBase, auth?.token || ""],
    mutationFn: async (payload: { prizeId: string; cardId: string; sessionId?: string }) => {
      if (!auth) throw new Error("Sign in to redeem a prize.");
      const data = await fetchJson<{ redemption: any }>(
        `${apiBase}/arcade/prizes/${payload.prizeId}/redeem`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "arcade.prize.redeem.error",
      );
      void trackTelemetry("arcade.prize.redeem.success", { prizeId: payload.prizeId });
      return data.redemption;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["arcade", "overview", apiBase, token] });
    },
  });
}
