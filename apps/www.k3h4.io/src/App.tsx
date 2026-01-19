import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "./radix-primitives/AppShell";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppShell />
        </QueryClientProvider>
    );
}
