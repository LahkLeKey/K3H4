import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { authStore, type AuthStatus } from "../stores/auth-store";
import {
  deriveUser,
  type GithubCallbackResponse,
  type SessionResponse,
  useAccountDeleteStatusQuery,
  useAccountDeleteMutation,
  useGithubCallbackMutation,
  useGithubUrlMutation,
  useProfileQuery,
  useProfileSaveMutation,
  useSessionQuery,
} from "./use-auth-queries";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../lib/constants";
import { useLocalStore } from "../lib/store";

export type { ProfileState, UserIdentity } from "../stores/auth-store";

export function useAuthProfile() {
  const queryClient = useQueryClient();
  const local = useLocalStore(() => ({
    hasToken: typeof window !== "undefined" ? Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)) : false,
    deleteJobId: null as string | null,
    deleteProgress: 0,
    deleteStatusText: "",
  }));
  const { hasToken, deleteJobId, deleteProgress, deleteStatusText } = local.useShallow((state) => state);
  const setHasToken = (value: boolean) => local.setState({ hasToken: value });
  const setDeleteJobId = (value: string | null) => local.setState({ deleteJobId: value });
  const setDeleteProgress = (value: number) => local.setState({ deleteProgress: value });
  const setDeleteStatusText = (value: string) => local.setState({ deleteStatusText: value });
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
  const accountDeleteMutation = useAccountDeleteMutation(apiBase);
  const deleteStatusQuery = useAccountDeleteStatusQuery(apiBase, deleteJobId);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
    setHasToken(Boolean(token));
  }, [sessionQuery.data, sessionQuery.isPending]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      setHasToken(false);
      setUser({ status: "anonymous" });
      setProfileFromServer(null);
      setAuthState("idle", "Session expired - please sign in again");
    };
    window.addEventListener("k3h4:auth-signed-out", handler);
    return () => window.removeEventListener("k3h4:auth-signed-out", handler);
  }, [setAuthState, setProfileFromServer, setUser]);

  useEffect(() => {
    if (!hasToken) {
      setUser({ status: "anonymous" });
      setProfileFromServer(null);
      setAuthState("idle", "");
    }
  }, [hasToken, setUser, setProfileFromServer, setAuthState]);

  useEffect(() => {
    if (!hasToken) return;
    if (sessionQuery.isPending) {
      // Keep UI interactive while session check is in flight
      setAuthState("idle", "");
      return;
    }
    if (sessionQuery.isError) {
      setUser({ status: "anonymous" });
      setProfileFromServer(null);
      setHasToken(false);
      const message = sessionQuery.error instanceof Error ? sessionQuery.error.message : "";
      setAuthState("idle", message || "Session expired - please sign in again");
      return;
    }
    setUser(userIdentity);
    if (userIdentity.status === "authenticated") {
      setAuthState("success", `Signed in as ${userIdentity.email}`);
    } else {
      setAuthState("idle", "");
    }
  }, [hasToken, sessionQuery.isPending, sessionQuery.isError, sessionQuery.error, userIdentity, setAuthState, setUser]);

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

  function handleSignOut() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    void queryClient.removeQueries({ queryKey: ["auth", "session"] });
    void queryClient.removeQueries({ queryKey: ["auth", "profile"] });
    setUser({ status: "anonymous" });
    setProfileFromServer(null);
    setAuthState("idle", "Signed out");
    setHasToken(false);
  }

  const handleDeleteAccount = async (confirmText: string) => {
    setProfileMessage("Deleting account and wiping data...");
    try {
      const res = await accountDeleteMutation.mutateAsync({ confirmText });
      setDeleteJobId(res.jobId);
      setDeleteProgress(5);
      setDeleteStatusText("Queued deletion job");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed";
      setProfileMessage(message);
      throw error;
    }
  };

  useEffect(() => {
    if (!deleteStatusQuery.data) return;
    setDeleteProgress(deleteStatusQuery.data.progress ?? deleteProgress);
    setDeleteStatusText(deleteStatusQuery.data.message ?? "");

    if (deleteStatusQuery.data.status === "done") {
      setProfileMessage("Account deleted and local session cleared");
      handleSignOut();
      setDeleteJobId(null);
    }

    if (deleteStatusQuery.data.status === "error") {
      setProfileMessage(deleteStatusQuery.data.message || "Delete failed");
      setDeleteJobId(null);
    }
  }, [deleteStatusQuery.data, deleteProgress, handleSignOut, setProfileMessage]);

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
    handleDeleteAccount,
    handleProfileSave,
    deletingAccount: accountDeleteMutation.isPending || deleteStatusQuery.isFetching,
    deleteProgress,
    deleteStatusText,
    completeGithubCallback,
  };
}
