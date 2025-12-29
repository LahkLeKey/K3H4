import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ACCESS_TOKEN_KEY } from "./constants";

type FetchCall = [string, RequestInit];

let fetchMock: ReturnType<typeof vi.fn>;

const stubLocalStorage = () => {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    length: 0,
  });
};

describe("telemetry", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("crypto", {
      randomUUID: () => "uuid-test",
      getRandomValues: (arr: Uint8Array) => {
        arr.fill(1);
        return arr;
      },
    });
    stubLocalStorage();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("falls back to crypto.getRandomValues when randomUUID is missing", async () => {
    vi.stubGlobal("crypto", {
      getRandomValues: (arr: Uint8Array) => {
        arr.fill(0xaa);
        return arr;
      },
    });

    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    telemetry.setTelemetryApiBase("https://api.test");
    telemetry.trackTelemetry("hex.event", { hex: true }, "/hex");

    await vi.advanceTimersByTimeAsync(1_000);

    const headers = (fetchMock.mock.calls[0] as FetchCall)[1].headers as Record<string, string>;
    const sessionId = headers["x-session-id"];

    expect(sessionId).toBe("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(localStorage.getItem("k3h4.sessionId")).toBe(sessionId);
  });

  it("falls back to Math.random session ids when storage is blocked", async () => {
    vi.stubGlobal("crypto", undefined as unknown as Crypto);
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => {
        if (key === "k3h4.sessionId") throw new Error("denied");
        return null;
      },
      setItem: () => {
        throw new Error("denied");
      },
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    });

    vi.spyOn(Math, "random").mockReturnValue(0.123456789);
    vi.spyOn(Date, "now").mockReturnValue(1_735_440_000_000);

    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    telemetry.setTelemetryApiBase("https://api.test");
    telemetry.trackTelemetry("blocked.storage");

    await vi.advanceTimersByTimeAsync(1_000);

    const headers = (fetchMock.mock.calls[0] as FetchCall)[1].headers as Record<string, string>;
    const sessionId = headers["x-session-id"];
    const expected = `sid-${Math.random().toString(16).slice(2)}-${Date.now()}`;

    expect(sessionId).toBe(expected);
  });

  it("trims telemetry queue to the max size before flushing", async () => {
    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    telemetry.setTelemetryApiBase("https://api.test");

    for (let i = 0; i < 205; i += 1) {
      telemetry.trackTelemetry(`event-${i}`, { i }, `/path-${i}`);
    }

    await vi.advanceTimersByTimeAsync(1_000);

    const body = JSON.parse((fetchMock.mock.calls[0] as FetchCall)[1].body as string) as {
      events: Array<{ eventType: string; path: string }>;
    };

    expect(body.events).toHaveLength(200);
    expect(body.events[0].eventType).toBe("event-5");
    expect(body.events[0].path).toBe("/path-5");
    expect(body.events.at(-1)?.eventType).toBe("event-204");
  });

  it("ignores repeat pointerenter on the same element", async () => {
    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    telemetry.setTelemetryApiBase("https://api.test");
    telemetry.installTelemetryDomHooks();

    const hoverTarget = document.createElement("div");
    document.body.appendChild(hoverTarget);

    hoverTarget.dispatchEvent(new Event("pointerenter", { bubbles: true }));
    hoverTarget.dispatchEvent(new Event("pointerenter", { bubbles: true }));

    await vi.runAllTimersAsync();

    const body = JSON.parse((fetchMock.mock.calls[0] as FetchCall)[1].body as string) as {
      events: Array<{ eventType: string }>;
    };

    expect(body.events).toHaveLength(1);
    expect(body.events[0].eventType).toBe("ui.hover");
  });

  it("flushes queued events with session and payload", async () => {
    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    telemetry.setTelemetryApiBase("https://api.test");
    telemetry.trackTelemetry("unit.event", { foo: "bar" }, "/test");

    await vi.advanceTimersByTimeAsync(1_000);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0] as FetchCall;
    expect(url).toBe("https://api.test/telemetry");

    const body = JSON.parse(options.body as string) as { events: Array<Record<string, unknown>> };
    expect(body.events[0]).toMatchObject({
      eventType: "unit.event",
      path: "/test",
      payload: { foo: "bar" },
      source: "web",
    });
  });

  it("installs DOM hooks and captures clicks", async () => {
    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    telemetry.setTelemetryApiBase("https://api.test");
    telemetry.installTelemetryDomHooks();

    const button = document.createElement("button");
    button.textContent = "Click";
    document.body.appendChild(button);

    button.click();

    await vi.runAllTimersAsync();

    const body = JSON.parse((fetchMock.mock.calls[0] as FetchCall)[1].body as string) as {
      events: Array<{ eventType: string }>;
    };
    expect(body.events[0].eventType).toBe("ui.click");
  });

  it("retries failed sends and keeps auth header", async () => {
    fetchMock
      .mockRejectedValueOnce(new Error("netfail"))
      .mockResolvedValueOnce({ ok: true });

    const telemetry = await vi.importActual<typeof import("./telemetry")>("./telemetry");

    localStorage.setItem(ACCESS_TOKEN_KEY, "token-123");
    telemetry.setTelemetryApiBase("https://api.test/");
    telemetry.trackTelemetry("retry.event", { ok: true }, "/retry");

    await vi.advanceTimersByTimeAsync(900); // first flush attempts and fails
    await vi.advanceTimersByTimeAsync(900); // retry flush

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const lastCall = fetchMock.mock.calls.at(-1) as FetchCall;
    const headers = (lastCall[1].headers as Record<string, string>) || {};
    expect(headers.Authorization).toBe("Bearer token-123");

    const body = JSON.parse(lastCall[1].body as string) as { events: Array<Record<string, unknown>> };
    expect(body.events[0]).toMatchObject({ eventType: "retry.event", path: "/retry" });
  });
});
