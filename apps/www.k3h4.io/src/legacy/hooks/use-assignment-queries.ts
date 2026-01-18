import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

export type AssignmentPersona = {
  id: string;
  alias: string;
  account: string;
  handle?: string | null;
};

export type AssignmentTimecard = {
  id: string;
  hours: string;
  amount: string;
  note?: string | null;
  status: string;
  createdAt?: string;
};

export type AssignmentPayout = {
  id: string;
  amount: string;
  note?: string | null;
  invoiceUrl?: string | null;
  status: string;
  createdAt?: string;
};

export type Assignment = {
  id: string;
  personaId: string;
  persona: AssignmentPersona;
  title: string;
  status: string;
  hourlyRate: string;
  createdAt?: string;
  updatedAt?: string;
  timecards: AssignmentTimecard[];
  payouts: AssignmentPayout[];
};

const assignmentKeys = {
  list: (apiBase: string, token: string) => ["assignments", apiBase, token || "anon"],
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

export function useAssignmentsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: assignmentKeys.list(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access assignments.");
      const data = await fetchJson<{ assignments: Assignment[] }>(`${apiBase}/assignments`, { headers: auth.headers }, "assignment.list.error");
      void trackTelemetry("assignment.list.success", { count: Array.isArray(data.assignments) ? data.assignments.length : 0 });
      return data.assignments;
    },
  });
}

export function useCreateAssignmentMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["assignments", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: { title: string; personaId: string; hourlyRate: number }) => {
      if (!auth) throw new Error("Sign in to create assignments.");
      const data = await fetchJson<{ assignment: Assignment }>(
        `${apiBase}/assignments`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "assignment.create.error",
      );
      void trackTelemetry("assignment.create.success", { personaId: payload.personaId });
      return data.assignment;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["assignments", apiBase, token] });
    },
  });
}

export function useCreateTimecardMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["assignments", "timecard", apiBase, auth?.token || ""],
    mutationFn: async (payload: { assignmentId: string; hours: number; note?: string }) => {
      if (!auth) throw new Error("Sign in to add timecards.");
      const data = await fetchJson<{ assignment: Assignment | null }>(
        `${apiBase}/assignments/${payload.assignmentId}/timecards`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "assignment.timecard.error",
      );
      void trackTelemetry("assignment.timecard.success", { assignmentId: payload.assignmentId, hours: payload.hours });
      return data.assignment;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["assignments", apiBase, token] });
    },
  });
}

export function usePayTimecardMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["assignments", "pay", apiBase, auth?.token || ""],
    mutationFn: async (payload: { assignmentId: string; timecardId: string }) => {
      if (!auth) throw new Error("Sign in to pay timecards.");
      const data = await fetchJson<{ assignment: Assignment | null }>(
        `${apiBase}/assignments/${payload.assignmentId}/pay`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "assignment.pay.error",
      );
      void trackTelemetry("assignment.pay.success", { assignmentId: payload.assignmentId, timecardId: payload.timecardId });
      return data.assignment;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["assignments", apiBase, token] });
      void queryClient.invalidateQueries({ queryKey: ["bank", "balance"] });
    },
  });
}
