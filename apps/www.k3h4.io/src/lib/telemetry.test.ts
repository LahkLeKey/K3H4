import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
});
