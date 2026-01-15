import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

export type StaffingEngagement = {
  id: string;
  name: string;
  client?: string | null;
  priority: string;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  budget?: string | null;
  forecast?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type StaffingRole = {
  id: string;
  engagementId?: string | null;
  title: string;
  location?: string | null;
  modality?: string | null;
  openings: number;
  filled: number;
  priority: string;
  status: string;
  rateMin?: string | null;
  rateMax?: string | null;
  billRate?: string | null;
  payRate?: string | null;
  tags?: string | null;
  skills?: string[] | null;
  createdAt?: string;
};

export type StaffingCandidate = {
  id: string;
  engagementId?: string | null;
  roleId?: string | null;
  personaId?: string | null;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  stage: string;
  score?: string | null;
  desiredRate?: string | null;
  availability?: string | null;
  location?: string | null;
  note?: string | null;
  tags?: string[] | null;
  persona?: { id: string; alias: string; account: string; handle?: string | null } | null;
};

export type StaffingShift = {
  id: string;
  roleId?: string | null;
  title: string;
  location?: string | null;
  startsAt: string;
  endsAt: string;
  status: string;
  coverageStatus: string;
  assignedPersona?: { id: string; alias: string; account: string; handle?: string | null } | null;
  assignedCandidate?: { id: string; fullName: string; stage: string } | null;
  notes?: string | null;
};

export type StaffingPlacement = {
  id: string;
  engagementId?: string | null;
  roleId?: string | null;
  candidateId?: string | null;
  personaId?: string | null;
  startDate: string;
  endDate?: string | null;
  status: string;
  billRate?: string | null;
  payRate?: string | null;
  margin?: string | null;
  note?: string | null;
  persona?: { id: string; alias: string; account: string; handle?: string | null } | null;
};

export type StaffingDashboard = {
  engagements: StaffingEngagement[];
  roles: StaffingRole[];
  candidates: StaffingCandidate[];
  shifts: StaffingShift[];
  placements: StaffingPlacement[];
  metrics: {
    openRoles: number;
    activeCandidates: number;
    scheduledShifts: number;
    activePlacements: number;
    fillRate: number;
  };
};

const staffingKeys = {
  dashboard: (apiBase: string, token: string) => ["staffing", "dashboard", apiBase, token || "anon"],
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

export function useStaffingDashboardQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: staffingKeys.dashboard(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access staffing.");
      const data = await fetchJson<StaffingDashboard>(`${apiBase}/staffing/dashboard`, { headers: auth.headers }, "staffing.dashboard.error");
      void trackTelemetry("staffing.dashboard.success", { engagements: data.engagements.length, candidates: data.candidates.length });
      return data;
    },
  });
}

function invalidateStaffing(apiBase: string) {
  const token = getToken();
  void queryClient.invalidateQueries({ queryKey: ["staffing", apiBase, token] });
  void queryClient.invalidateQueries({ queryKey: ["staffing", "dashboard", apiBase, token] });
}

export function useCreateEngagementMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["staffing", "engagement", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      name: string;
      client?: string;
      priority?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
      budget?: number | string;
      forecast?: number | string;
      notes?: string;
    }) => {
      if (!auth) throw new Error("Sign in to create engagements.");
      const data = await fetchJson<{ engagement: StaffingEngagement }>(
        `${apiBase}/staffing/engagements`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "staffing.engagement.create.error",
      );
      void trackTelemetry("staffing.engagement.create.success", { name: payload.name });
      return data.engagement;
    },
    onSuccess: () => invalidateStaffing(apiBase),
  });
}

export function useCreateRoleMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["staffing", "role", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      engagementId?: string;
      title: string;
      location?: string;
      modality?: string;
      openings?: number | string;
      rateMin?: number | string;
      rateMax?: number | string;
      billRate?: number | string;
      payRate?: number | string;
      priority?: string;
      status?: string;
      tags?: string;
      skills?: string[];
    }) => {
      if (!auth) throw new Error("Sign in to create roles.");
      const data = await fetchJson<{ role: StaffingRole }>(
        `${apiBase}/staffing/roles`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "staffing.role.create.error",
      );
      void trackTelemetry("staffing.role.create.success", { title: payload.title });
      return data.role;
    },
    onSuccess: () => invalidateStaffing(apiBase),
  });
}

export function useCreateCandidateMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["staffing", "candidate", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      fullName: string;
      email?: string;
      phone?: string;
      source?: string;
      stage?: string;
      score?: number | string;
      desiredRate?: number | string;
      availability?: string;
      location?: string;
      note?: string;
      tags?: string[];
      engagementId?: string;
      roleId?: string;
      personaId?: string;
    }) => {
      if (!auth) throw new Error("Sign in to add candidates.");
      const data = await fetchJson<{ candidate: StaffingCandidate }>(
        `${apiBase}/staffing/candidates`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "staffing.candidate.create.error",
      );
      void trackTelemetry("staffing.candidate.create.success", { stage: payload.stage ?? "prospect" });
      return data.candidate;
    },
    onSuccess: () => invalidateStaffing(apiBase),
  });
}

export function useUpdateCandidateStageMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["staffing", "candidate-stage", apiBase, auth?.token || ""],
    mutationFn: async (payload: { candidateId: string; stage: string }) => {
      if (!auth) throw new Error("Sign in to update candidates.");
      const data = await fetchJson<{ candidate: StaffingCandidate }>(
        `${apiBase}/staffing/candidates/${payload.candidateId}/stage`,
        { method: "POST", headers: auth.headers, body: JSON.stringify({ stage: payload.stage }) },
        "staffing.candidate.stage.error",
      );
      void trackTelemetry("staffing.candidate.stage.success", { stage: payload.stage });
      return data.candidate;
    },
    onSuccess: () => invalidateStaffing(apiBase),
  });
}

export function useCreateShiftMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["staffing", "shift", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      roleId?: string;
      title: string;
      location?: string;
      startsAt: string;
      endsAt: string;
      coverageStatus?: string;
      assignedPersonaId?: string;
      assignedCandidateId?: string;
      notes?: string;
    }) => {
      if (!auth) throw new Error("Sign in to add shifts.");
      const data = await fetchJson<{ shift: StaffingShift }>(
        `${apiBase}/staffing/shifts`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "staffing.shift.create.error",
      );
      void trackTelemetry("staffing.shift.create.success", { roleId: payload.roleId });
      return data.shift;
    },
    onSuccess: () => invalidateStaffing(apiBase),
  });
}

export function useCreatePlacementMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["staffing", "placement", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      engagementId?: string;
      roleId?: string;
      candidateId?: string;
      personaId?: string;
      startDate: string;
      endDate?: string;
      status?: string;
      billRate?: number | string;
      payRate?: number | string;
      note?: string;
    }) => {
      if (!auth) throw new Error("Sign in to add placements.");
      const data = await fetchJson<{ placement: StaffingPlacement }>(
        `${apiBase}/staffing/placements`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "staffing.placement.create.error",
      );
      void trackTelemetry("staffing.placement.create.success", { roleId: payload.roleId });
      return data.placement;
    },
    onSuccess: () => invalidateStaffing(apiBase),
  });
}
