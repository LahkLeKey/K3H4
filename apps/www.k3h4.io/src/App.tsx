import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { BankPage } from "./pages/BankPage";
import { MapPage } from "./pages/MapPage";
import { TelemetryPage } from "./pages/TelemetryPage";
import { useAuthStore } from "./react-hooks/auth";
import { PersonaPage } from "./pages/PersonaPage";
import { LogisticsPage } from "./pages/LogisticsPage";

const queryClient = new QueryClient();

export default function App() {
    const { session } = useAuthStore();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={session ? <HomePage /> : <MapPage showNav={false} />} />
                    <Route path="/map" element={session ? <MapPage /> : <Navigate to="/" replace />} />
                    <Route path="/bank" element={session ? <BankPage /> : <Navigate to="/" replace />} />
                    <Route path="/personas" element={session ? <PersonaPage /> : <Navigate to="/" replace />} />
                    <Route path="/logistics" element={session ? <LogisticsPage /> : <Navigate to="/" replace />} />
                    <Route path="/telemetry" element={session ? <TelemetryPage /> : <Navigate to="/" replace />} />
                    <Route path="/auth/*" element={<MapPage showNav={false} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
