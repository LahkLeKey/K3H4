import { describe, it, expect, beforeEach } from "vitest";

let authStore: typeof import("./auth-store").authStore;
let initialState: ReturnType<typeof authStore.getState>;

describe("authStore", () => {
  beforeEach(async () => {
    if (!(globalThis as any).window) {
      (globalThis as any).window = { location: { origin: "http://localhost" } } as any;
    }
    const mod = await import("./auth-store");
    authStore = mod.authStore;
    initialState = authStore.getState();
    authStore.setState(initialState, true);
  });

  it("initializes with defaults and redirectUri", () => {
    const state = authStore.getState();
    expect(state.apiBase).toBe("http://localhost:3001");
    expect(state.redirectUri).toBe(`${window.location.origin}/auth/github`);
    expect(state.user).toEqual({ status: "anonymous" });
    expect(state.authStatus).toBe("idle");
    expect(state.authMessage).toBe("");
    expect(state.profile).toBeNull();
  });

  it("updates auth state and message", () => {
    authStore.getState().setAuthState("loading");
    expect(authStore.getState().authStatus).toBe("loading");
    expect(authStore.getState().authMessage).toBe("");

    authStore.getState().setAuthState("error", "bad");
    expect(authStore.getState().authStatus).toBe("error");
    expect(authStore.getState().authMessage).toBe("bad");
  });

  it("updates user and profile", () => {
    authStore.getState().setUser({ status: "authenticated", email: "a@b.com" });
    expect(authStore.getState().user).toEqual({ status: "authenticated", email: "a@b.com" });

    authStore.getState().setProfile(() => ({ displayName: "Name" }));
    expect(authStore.getState().profile).toEqual({ displayName: "Name" });

    authStore.getState().setProfileFromServer({ displayName: "Server" });
    expect(authStore.getState().profile).toEqual({ displayName: "Server" });
    expect(authStore.getState().profileMessage).toBe("");
  });

  it("sets profile message", () => {
    authStore.getState().setProfileMessage("saved");
    expect(authStore.getState().profileMessage).toBe("saved");
  });
});
