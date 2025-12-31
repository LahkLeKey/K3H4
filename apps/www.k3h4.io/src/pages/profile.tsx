import { AuthAccessSection } from "../components/auth-access-section";
import { ProfileView } from "../components/profile-view";
import { useAuthProfile } from "../hooks/use-auth-profile";

export function ProfilePage() {
    const {
        authStatus,
        authMessage,
        user,
        userEmail,
        profile,
        profileLoading,
        profileMessage,
        setProfile,
        handleProfileSave,
        handleSignOut,
        handleDeleteAccount,
        deletingAccount,
        deleteProgress,
        deleteStatusText,
        handleGithubLogin,
        handleLinkedinLogin,
    } = useAuthProfile();

    if (user.status !== "authenticated") {
        return (
            <AuthAccessSection
                title="Sign in to manage your profile"
                description="Authenticate to edit your preferences and saved details."
                userEmail={userEmail}
                authStatus={authStatus}
                authMessage={authMessage || ""}
                onGithubLogin={handleGithubLogin}
                onLinkedinLogin={handleLinkedinLogin}
            />
        );
    }

    return (
        <ProfileView
            userEmail={userEmail}
            profile={profile}
            profileLoading={profileLoading}
            profileMessage={profileMessage}
            setProfile={setProfile}
            onSave={handleProfileSave}
            onSignOut={handleSignOut}
            onDeleteAccount={handleDeleteAccount}
            deletingAccount={deletingAccount}
            deleteProgress={deleteProgress}
            deleteStatusText={deleteStatusText}
        />
    );
}
