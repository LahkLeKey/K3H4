import { useEffect, useMemo } from "react";

import { authStore, type AuthStatus } from "../stores/auth-store";
import {
  deriveUser,
  type GithubCallbackResponse,
  type SessionResponse,
  useGithubCallbackMutation,
  useGithubUrlMutation,
  useProfileQuery,
  useProfileSaveMutation,
  useSessionQuery,
} from "./use-auth-queries";

export type { ProfileState, UserIdentity } from "../stores/auth-store";

export function useAuthProfile() {
  const {
    apiBase,
    redirectUri,
    authStatus,
    authMessage,
    profile,
    profileMessage,
    setProfile,
    setProfileMessage,
    setAuthState,
    setUser,
    setProfileFromServer,
  } = authStore.useShallow((state) => ({
    apiBase: state.apiBase,
    redirectUri: state.redirectUri,
    authStatus: state.authStatus as AuthStatus,
    authMessage: state.authMessage,
    profile: state.profile,
    profileMessage: state.profileMessage,
    setProfile: state.setProfile,
    setProfileMessage: state.setProfileMessage,
    setAuthState: state.setAuthState,
    setUser: state.setUser,
    setProfileFromServer: state.setProfileFromServer,
  }));

  const sessionQuery = useSessionQuery(apiBase);
  const userIdentity = useMemo(() => deriveUser(sessionQuery.data), [sessionQuery.data]);

  const profileEnabled = userIdentity.status === "authenticated";
  const profileQuery = useProfileQuery(apiBase, profileEnabled);

  const githubUrlMutation = useGithubUrlMutation(apiBase);
  const githubCallbackMutation = useGithubCallbackMutation(apiBase);
  const profileSaveMutation = useProfileSaveMutation(apiBase);

  useEffect(() => {
    if (sessionQuery.isPending) {
      setAuthState("loading", "Checking session...");
      return;
    }
    if (sessionQuery.isError) {
      setUser({ status: "anonymous" });
      setAuthState("idle", sessionQuery.error instanceof Error ? sessionQuery.error.message : "");
      return;
    }
    setUser(userIdentity);
    if (userIdentity.status === "authenticated") {
      setAuthState("success", `Signed in as ${userIdentity.email}`);
    } else {
      setAuthState("idle", "");
    }
  }, [sessionQuery.isPending, sessionQuery.isError, sessionQuery.error, userIdentity, setAuthState, setUser]);

  useEffect(() => {
    if (profileQuery.data?.profile) {
      setProfileFromServer(profileQuery.data.profile);
    }
  }, [profileQuery.data, setProfileFromServer]);

  const handleGithubLogin = async () => {
    setAuthState("loading", "Redirecting to GitHub...");
    const result = await githubUrlMutation.mutateAsync({ redirectUri });
    window.location.href = result.authorizeUrl;
  };

  const handleProfileSave = async () => {
    if (!profile) {
      setProfileMessage("Nothing to save");
      return;
    }
    setProfileMessage("Saving...");
    try {
      const res = await profileSaveMutation.mutateAsync(profile);
      setProfileFromServer(res.profile);
      setProfileMessage("Saved");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Save failed");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("k3h4.accessToken");
    localStorage.removeItem("k3h4.refreshToken");
    setUser({ status: "anonymous" });
    setProfileFromServer(null);
    setAuthState("idle", "Signed out");
  };

  const completeGithubCallback = async (code: string, redirect = redirectUri): Promise<{ ok: boolean; error?: string }> => {
    setAuthState("loading", "Signing you in with GitHub...");
    try {
      const res: GithubCallbackResponse = await githubCallbackMutation.mutateAsync({ code, redirectUri: redirect });
      const nextUser = deriveUser({ user: { email: res.profile?.email ?? "" } } as SessionResponse);
      setUser(nextUser);
      if (res.profile) {
        setProfileFromServer(res.profile);
      }
      setAuthState("success", "Signed in - redirecting...");
      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setAuthState("error", message);
      return { ok: false, error: message };
    }
  };

  const userEmail = userIdentity.status === "authenticated" ? userIdentity.email : null;
  const combinedAuthMessage = githubUrlMutation.error?.message || githubCallbackMutation.error?.message || (sessionQuery.error instanceof Error ? sessionQuery.error.message : authMessage);
  const profileLoading = profileQuery.isPending || profileSaveMutation.isPending;

  return {
    apiBase,
    redirectUri,
    user: userIdentity,
    userEmail,
    authStatus,
    authMessage: combinedAuthMessage,
    profile,
    profileLoading,
    profileMessage,
    setProfile,
    setProfileMessage,
    setAuthState,
    handleGithubLogin,
    handleSignOut,
    handleProfileSave,
    completeGithubCallback,
  };
}
