const TELEMETRY_SOURCE = "web";
const SESSION_STORAGE_KEY = "k3h4.sessionId";
const MAX_QUEUE = 200;
const FLUSH_INTERVAL_MS = 800;
import { ACCESS_TOKEN_KEY } from "./constants";

let apiBase: string | undefined = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || undefined;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let hooksInstalled = false;
const queue: Array<{ eventType: string; payload?: unknown; path?: string }> = [];
const hoveredOnce = new WeakSet<EventTarget>();

function generateSessionId() {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
    if (typeof crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  }
  return `sid-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

function getSessionId() {
  try {
    const existing = localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
    const next = generateSessionId();
    localStorage.setItem(SESSION_STORAGE_KEY, next);
    return next;
  } catch {
    return generateSessionId();
  }
}

function getPath() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.hash || ""}`;
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(flushQueue, FLUSH_INTERVAL_MS);
}

async function flushQueue() {
  flushTimer = null;
  if (!queue.length || !apiBase) return;
  const batch = queue.splice(0, queue.length);
  const sessionId = getSessionId();
  const token = typeof localStorage !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  const events = batch.map((evt) => ({
    eventType: evt.eventType,
    source: TELEMETRY_SOURCE,
    sessionId,
    path: evt.path ?? getPath(),
    payload: evt.payload,
  }));

  try {
    await fetch(`${apiBase}/telemetry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": sessionId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ events }),
      keepalive: true,
    });
  } catch (err) {
    console.warn("telemetry send failed", err);
    const retryable = events.slice(0, 20).map((evt) => ({ eventType: evt.eventType, payload: evt.payload, path: evt.path }));
    queue.unshift(...retryable);
    scheduleFlush();
  }
}

function enqueue(eventType: string, payload?: unknown, path?: string) {
  if (!eventType) return;
  queue.push({ eventType, payload, path });
  if (queue.length > MAX_QUEUE) {
    queue.splice(0, queue.length - MAX_QUEUE);
  }
  scheduleFlush();
}

function buildElementDescriptor(target: EventTarget | null) {
  if (!(target instanceof Element)) return { node: "unknown" };
  const tag = target.tagName.toLowerCase();
  const id = target.id || undefined;
  const role = target.getAttribute("role") || undefined;
  const nameAttr = (target as HTMLInputElement).name || target.getAttribute("name") || undefined;
  const ariaLabel = target.getAttribute("aria-label") || undefined;
  const dataTelemetry = target.getAttribute("data-telemetry-id") || target.getAttribute("data-testid") || undefined;
  const classList = target.classList && target.classList.length ? Array.from(target.classList).slice(0, 6) : undefined;
  const textContent = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ? undefined : target.textContent?.trim();
  const text = textContent ? textContent.slice(0, 80) : undefined;
  const inputType = target instanceof HTMLInputElement ? target.type : undefined;
  const checked = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : undefined;

  return { tag, id, role, name: nameAttr, ariaLabel, dataTelemetry, classList, text, inputType, checked };
}

function handleDomEvent(event: Event, eventType: string) {
  const target = event.target as EventTarget | null;
  if (event.type === "pointerenter") {
    if (target && hoveredOnce.has(target)) return;
    if (target) hoveredOnce.add(target);
  }
  const element = buildElementDescriptor(target);
  enqueue(eventType, { domEvent: event.type, element }, getPath());
}

export function trackTelemetry(eventType: string, payload?: unknown, path?: string) {
  enqueue(eventType, payload, path);
}

export function setTelemetryApiBase(base?: string) {
  apiBase = base?.replace(/\/$/, "") || apiBase || undefined;
}

export function installTelemetryDomHooks() {
  if (hooksInstalled || typeof document === "undefined") return;
  hooksInstalled = true;

  document.addEventListener(
    "click",
    (event) => handleDomEvent(event, "ui.click"),
    true,
  );
  document.addEventListener(
    "pointerenter",
    (event) => handleDomEvent(event, "ui.hover"),
    true,
  );
  document.addEventListener(
    "change",
    (event) => handleDomEvent(event, "ui.input"),
    true,
  );
  document.addEventListener(
    "submit",
    (event) => handleDomEvent(event, "ui.submit"),
    true,
  );
}
