import { Tabs } from "../radix-primitives";
import { useLogisticsStore, type LogisticsTab } from "../../zustand-stores/logistics";
import { FreightBoard } from "./FreightBoard";
import { WarehouseBoard } from "./WarehouseBoard";
import { AgricultureBoard } from "./AgricultureBoard";
import { UsdaBoard } from "./UsdaBoard";
import { Stack } from "../ui";

export function LogisticsDashboard() {
    const { activeTab, setActiveTab } = useLogisticsStore();

    return (
        <Stack gap="lg">
            <Tabs
                value={activeTab}
                onValueChange={(tab) => setActiveTab(tab as LogisticsTab)}
                tabs={[
                    { key: "warehouse", label: "Warehouse", content: <WarehouseBoard /> },
                    { key: "freight", label: "Freight", content: <FreightBoard /> },
                    { key: "agriculture", label: "Agriculture", content: <AgricultureBoard /> },
                    { key: "usda", label: "USDA", content: <UsdaBoard /> },
                ]}
                className="w-full"
            />
        </Stack>
    );
}
