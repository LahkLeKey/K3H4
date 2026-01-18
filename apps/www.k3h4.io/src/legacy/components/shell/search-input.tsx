import { Search } from "lucide-react";

import { Input } from "../ui/input";

export type SearchInputProps = {
    placeholder?: string;
    disabled?: boolean;
};

export function SearchInput({ placeholder = "Search", disabled = false }: SearchInputProps) {
    return (
        <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 w-56 pl-9" placeholder={placeholder} aria-label={placeholder} disabled={disabled} />
        </div>
    );
}
