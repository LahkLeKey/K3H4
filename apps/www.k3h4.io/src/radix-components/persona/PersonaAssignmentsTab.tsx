import { useMemo } from "react";
import { Badge, Button, Grid, MetricTile, Pill, SectionHeader, Stack } from "../../radix-primitives";
import { useAuthStore } from "../../react-hooks/auth";
import { useAssignmentState } from "../../react-hooks/assignments";
import { EndpointList } from "../EndpointList";
import { TableCard } from "../TableCard";
import { AssignmentBoard } from "../AssignmentBoard";

const assignmentEndpoints = [
    { method: "GET", path: "/assignments", description: "List assignments with nested timecards and payouts." },
    { method: "POST", path: "/assignments", description: "Create a new assignment linked to a persona with an hourly rate." },
    { method: "POST", path: "/assignments/{id}/timecards", description: "Append a timecard entry with hours worked and an optional note." },
    { method: "POST", path: "/assignments/{id}/pay", description: "Mark a timecard as paid and record the payout with an optional note." },
];

export function PersonaAssignmentsTab() {
    const { session } = useAuthStore();
    const { metrics, status, error, assignments, fetchAssignments } = useAssignmentState();

    const statusMessage = useMemo(() => {
        if (error) return error;
        if (status === "loading") return "Loading assignments...";
        if (status === "ready") return `${assignments.length} loaded`;
        return "Waiting for auth...";
    }, [status, error, assignments.length]);

    return (
        <Stack gap="md">
            <SectionHeader
                kicker="Assignments"
                title="Assignments and tasks"
                description="Live assignment ledger plus the HTTP endpoints to list work, log hours, and issue payouts."
                status={statusMessage}
                actions={(
                    <>
                        <Button
                            variant="outline"
                            accent="#22d3ee"
                            onClick={() => fetchAssignments()}
                            disabled={!session?.accessToken || status === "loading"}
                        >
                            {status === "loading" ? "Refreshing..." : "Refresh data"}
                        </Button>
                        <Pill tone="slate">Auth required: Bearer token</Pill>
                    </>
                )}
            />

            <Grid gap="md" smCols={2} lgCols={4}>
                <MetricTile label="Assignments" value={metrics.count.toString()} hint="GET /assignments" accent="#22d3ee" />
                <MetricTile label="Total hours" value={metrics.hours.toFixed(1)} hint="Sum of timecards" accent="#a78bfa" />
                <MetricTile label="Payouts" value={`₭${metrics.payouts.toFixed(2)}`} hint="POST /assignments/{id}/pay" accent="#f59e0b" />
                <MetricTile label="Create" value="POST /assignments" hint="Persona + rate" accent="#34d399" />
            </Grid>

            <EndpointList endpoints={assignmentEndpoints} tag="Assignments" />

            <TableCard title="Assignments board" subtitle="Interactive UI backed by the endpoints above" actions={<Badge accent="#22d3ee">Live</Badge>}>
                <AssignmentBoard />
            </TableCard>
        </Stack>
    );
}
