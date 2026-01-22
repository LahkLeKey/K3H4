import { Badge } from "./Badge";
import { Button } from "./Button";
import { Stack } from "./Stack";

export type TablePaginationProps = {
    page: number;
    totalPages: number;
    pageSize?: number;
    totalItems?: number;
    onPageChange: (page: number) => void;
    className?: string;
};

export function TablePagination({ page, totalPages, pageSize, totalItems, onPageChange, className = "" }: TablePaginationProps) {
    const prevDisabled = page <= 0;
    const nextDisabled = page >= totalPages - 1;

    const label = (() => {
        if (pageSize && typeof totalItems === "number") {
            const start = Math.min(totalItems, page * pageSize + 1);
            const end = Math.min(totalItems, (page + 1) * pageSize);
            return `Page ${page + 1} / ${totalPages} · Showing ${start}-${end} of ${totalItems}`;
        }
        return `Page ${page + 1} / ${totalPages}`;
    })();

    return (
        <Stack direction="row" align="center" justify="between" className={className}>
            <Badge accent="#cbd5e1">{label}</Badge>
            <Stack direction="row" align="center" gap="sm">
                <Button accent="#94a3b8" variant="subtle" onClick={() => onPageChange(Math.max(0, page - 1))} disabled={prevDisabled}>
                    Prev
                </Button>
                <Button accent="#94a3b8" variant="subtle" onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))} disabled={nextDisabled}>
                    Next
                </Button>
            </Stack>
        </Stack>
    );
}
