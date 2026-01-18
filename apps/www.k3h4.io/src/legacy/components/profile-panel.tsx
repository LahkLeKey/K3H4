import { useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { ACCOUNT_DELETE_PHRASE } from '../lib/constants'
import { useLocalStore } from '../lib/store'
import type { ProfileState } from '../hooks/use-auth-profile'

type Props = {
    userEmail: string | null
    profile: ProfileState | null
    profileLoading: boolean
    profileMessage: string
    setProfile: (updater: (prev: ProfileState | null) => ProfileState | null) => void
    onSave: () => void
    onSignOut: () => void
    onDeleteAccount?: (confirmText: string) => Promise<void> | void
    deletingAccount: boolean
    deleteProgress: number
    deleteStatusText: string
}

export function ProfilePanel({ userEmail, profile, profileLoading, profileMessage, setProfile, onSave, onSignOut, onDeleteAccount, deletingAccount, deleteProgress, deleteStatusText }: Props) {

    const deleteStore = useLocalStore(() => ({
        deleteDialogOpen: false,
        deleteAcknowledged: false,
        deleteConfirmText: '',
    }))

    const { deleteDialogOpen, deleteAcknowledged, deleteConfirmText } = deleteStore.useShallow((state) => state)

    // Only reset dialog when deletion is complete (not pending)
    // Only close dialog if deletion is complete and user is logged out
    useEffect(() => {
        if (
            deleteDialogOpen &&
            !deletingAccount &&
            deleteProgress >= 100 &&
            !userEmail // user is logged out
        ) {
            deleteStore.setState({ deleteDialogOpen: false, deleteAcknowledged: false, deleteConfirmText: '' })
        }
    }, [deletingAccount, deleteDialogOpen, deleteProgress, userEmail, deleteStore])

    const resetDeleteDialog = () => {
        deleteStore.setState({ deleteDialogOpen: false, deleteAcknowledged: false, deleteConfirmText: '' })
    }

    const handleDeleteConfirm = async () => {
        console.log('Delete confirm clicked', { deleteConfirmText });
        if (!onDeleteAccount) {
            console.warn('delete account handler is not available')
            return
        }
        try {
            await onDeleteAccount(deleteConfirmText)
            // Do not reset dialog here; let useEffect handle it after deletion completes
        } catch (err) {
            console.warn('delete account failed', err)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted-foreground">Account details from your sign-in provider.</p>
                <p className="text-xs text-muted-foreground">Signed in as {userEmail ?? 'unknown'}</p>
            </div>
            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <p className="text-muted-foreground">Display name: <span className="text-foreground font-medium">{profile?.displayName ?? '—'}</span></p>
                <p className="text-muted-foreground">Avatar URL: <span className="text-foreground break-all font-medium">{profile?.avatarUrl ?? '—'}</span></p>
            </div>

            <label className="space-y-1 text-sm text-muted-foreground">
                <span className="block font-medium text-foreground">Personal note</span>
                <Textarea
                    placeholder="Add a short note for yourself"
                    value={profile?.preference?.note ?? ''}
                    onChange={(e) =>
                        setProfile((prev) => ({
                            ...(prev ?? {}),
                            preference: { ...(prev?.preference ?? {}), note: e.target.value },
                        }))
                    }
                />
                <span className="text-xs text-muted-foreground">Saved privately to your profile.</span>
            </label>
            <div className="flex flex-wrap gap-3">
                <Button variant="default" className="w-full sm:w-auto" onClick={onSave} disabled={profileLoading}>
                    {profileLoading ? 'Saving…' : 'Save profile'}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" onClick={onSignOut}>
                    Sign out
                </Button>
            </div>
            {profileMessage ? <p className="text-xs text-muted-foreground">{profileMessage}</p> : null}

            {onDeleteAccount && typeof deletingAccount === 'boolean' && typeof deleteProgress === 'number' && typeof deleteStatusText === 'string' && (
                <div className="space-y-3 rounded-lg border border-destructive/40 bg-destructive/5 p-3">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-destructive">Delete account and data</p>
                        <p className="text-xs text-muted-foreground">This removes your saved demo data, balances, personas, and preferences. This cannot be undone.</p>
                    </div>

                    <AlertDialog
                        open={deleteDialogOpen}
                        onOpenChange={(open) => {
                            deleteStore.setState({ deleteDialogOpen: open })
                            if (!open) {
                                resetDeleteDialog()
                            }
                        }}
                    >
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto" onClick={() => deleteStore.setState({ deleteDialogOpen: true })}>
                                Delete my account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete your K3H4 data?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deleting your account will clear all data linked to this sign-in (bank balances, personas, arcade progress, preferences, and stored notes).
                                    This action is irreversible.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="space-y-3 text-sm">
                                <div className="space-y-2 rounded-md border border-border/80 bg-muted/40 p-3">
                                    <p className="font-medium text-foreground">Step 1: acknowledge the warning</p>
                                    <p className="text-xs text-muted-foreground">Click continue to confirm you understand this will permanently remove your saved data.</p>
                                    <Button variant="outline" onClick={() => deleteStore.setState({ deleteAcknowledged: true })} disabled={deleteAcknowledged}>
                                        {deleteAcknowledged ? 'Acknowledged' : 'I understand, continue'}
                                    </Button>
                                </div>

                                <div className="space-y-2 rounded-md border border-border/80 bg-muted/40 p-3">
                                    <label className="flex flex-col gap-1 text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Step 2: type the confirmation phrase</span>
                                        <Input
                                            placeholder={`Type ${ACCOUNT_DELETE_PHRASE}`}
                                            value={deleteConfirmText}
                                            disabled={!deleteAcknowledged || deletingAccount}
                                            onChange={(e) => deleteStore.setState({ deleteConfirmText: e.target.value })}
                                            autoComplete="off"
                                        />
                                        <span className="text-xs">Enter "{ACCOUNT_DELETE_PHRASE}" exactly to enable deletion.</span>
                                    </label>
                                </div>
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={resetDeleteDialog}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={!deleteAcknowledged || deleteConfirmText !== ACCOUNT_DELETE_PHRASE || deletingAccount}
                                    onClick={handleDeleteConfirm}
                                >
                                    {deletingAccount ? 'Deleting…' : 'Delete my data'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                            <div className="mt-3 space-y-1">
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                    <div className="h-full rounded-full bg-destructive transition-all" style={{ width: `${deleteProgress}%` }} />
                                </div>
                                <p className="text-xs text-muted-foreground">{deleteStatusText || (deletingAccount ? 'Working on your deletion…' : deleteProgress >= 100 ? 'Deletion finished. Signing you out…' : 'Waiting to start.')}</p>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    )
}
