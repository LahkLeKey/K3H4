import { useEffect } from "react";

import { authStore, type AuthStatus, type ProfileState } from "../stores/auth-store";

export type { ProfileState } from "../stores/auth-store";

export function useAuthProfile() {
  const {
    apiBase,
    redirectUri,
    userEmail,
    authStatus,
    authMessage,
    profile,
    profileLoading,
    profileMessage,
    setProfile,
    setProfileMessage,
    setAuthState,
    checkSession,
    handleGithubLogin,
    handleSignOut,
    handleProfileSave,
    completeGithubCallback,
  } = authStore.useShallow((state) => ({
    apiBase: state.apiBase,
    redirectUri: state.redirectUri,
    userEmail: state.userEmail,
    authStatus: state.authStatus as AuthStatus,
    authMessage: state.authMessage,
    profile: state.profile,
    profileLoading: state.profileLoading,
    profileMessage: state.profileMessage,
    setProfile: state.setProfile,
    setProfileMessage: state.setProfileMessage,
    setAuthState: state.setAuthState,
    checkSession: state.checkSession,
    handleGithubLogin: state.startGithubLogin,
    handleSignOut: state.signOut,
    handleProfileSave: state.saveProfile,
    completeGithubCallback: state.completeGithubCallback,
  }));

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return {
    apiBase,
    redirectUri,
    userEmail,
    authStatus,
    authMessage,
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
