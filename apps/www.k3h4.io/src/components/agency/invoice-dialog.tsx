import { FileText, HandCoins } from "lucide-react";

import type { Assignment, AssignmentPayout, AssignmentPersona } from "../../hooks/use-assignment-queries";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";

export type InvoiceDialogProps = {
    payout: AssignmentPayout;
    assignment: Assignment;
    persona: AssignmentPersona;
};

export function InvoiceDialog({ payout, assignment, persona }: InvoiceDialogProps) {
    const issuedAt = payout.createdAt ? new Date(payout.createdAt) : null;
    const invoiceId = payout.id.slice(0, 8).toUpperCase();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="link" className="px-0 text-primary">
                    Invoice
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5" /> Invoice #{invoiceId}
                    </DialogTitle>
                    <DialogDescription>Timecard payout for {assignment.title}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-semibold">Billed to</div>
                            <div>{persona.alias}</div>
                            <div className="text-muted-foreground">{persona.account}</div>
                            {persona.handle ? <div className="text-muted-foreground">{persona.handle}</div> : null}
                        </div>
                        <div className="text-right text-muted-foreground">
                            <div>{issuedAt ? issuedAt.toLocaleDateString() : ""}</div>
                            <div>Assignment: {assignment.title}</div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-[2fr,1fr] gap-2">
                        <div className="font-semibold">Description</div>
                        <div className="text-right font-semibold">Amount</div>
                        <div className="text-muted-foreground">{payout.note || "Timecard payout"}</div>
                        <div className="text-right font-mono">{payout.amount} k3h4c</div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-muted-foreground">
                            <HandCoins className="h-4 w-4" /> Paid status
                        </div>
                        <div className="font-semibold">{payout.status}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
