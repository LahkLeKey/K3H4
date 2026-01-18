import { z } from "zod";
import { useAuthStore } from "../react-hooks/auth";

export type ApiError = Error & { status?: number; details?: unknown };

type RequestOptions<T> = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    token?: string | null;
    schema?: z.ZodSchema<T>;
    baseUrl?: string;
    signal?: AbortSignal;
};

const defaultBase = () =>
    (globalThis as any).__API_URL__ ||
    (import.meta as any)?.API_URL ||
    (import.meta as any)?.env?.API_URL ||
    "http://localhost:3001";

const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

export async function apiFetch<T = unknown>(path: string, options: RequestOptions<T> = {}) {
    const { method = "GET", body, token, schema, baseUrl = defaultBase(), signal } = options;

    const headers: Record<string, string> = {
        Accept: "application/json",
    };

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const url = `${baseUrl}${normalizePath(path)}`;
    const response = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        credentials: "include",
        signal,
    }).catch((err) => {
        const error = new Error("Network error") as ApiError;
        error.details = err;
        throw error;
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json().catch(() => ({})) : null;

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            try {
                useAuthStore.getState().kickToLogin?.("unauthorized");
            } catch (err) {
                console.warn("kickToLogin failed", err);
            }
        }
        const error = new Error(payload?.error || `Request failed (${response.status})`) as ApiError;
        error.status = response.status;
        error.details = payload;
        throw error;
    }

    const data = payload as T;
    return schema ? schema.parse(data) : data;
}

export const withAuth = <T extends (...args: any[]) => Promise<any>>(fn: T) => fn;
