import { useMemo } from "react";
import { TABLE_HEIGHT, TABLE_THICKNESS, VAULT_TABLES } from "./bank-constants";
import { useWoodMaterial } from "./use-wood-material";

export function TablesLayer() {
    const topMaterial = useWoodMaterial({ preset: "tableTop" });
    const legMaterial = useWoodMaterial({ preset: "tableLeg" });

    return (
        <group>
            {VAULT_TABLES.map((table, idx) => {
                const legOffsetX = table.w / 2 - 0.2;
                const legOffsetZ = table.d / 2 - 0.2;
                return (
                    <group key={`table-${idx}`} position={[table.x, 0, table.z]}>
                        <mesh position={[0, table.baseY - TABLE_THICKNESS / 2, 0]} castShadow receiveShadow material={topMaterial}>
                            <boxGeometry args={[table.w, TABLE_THICKNESS, table.d]} />
                        </mesh>
                        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map((pair, legIdx) => (
                            <mesh
                                key={`table-${idx}-leg-${legIdx}`}
                                position={[pair[0] * legOffsetX, (TABLE_HEIGHT - 0.6) / 2, pair[1] * legOffsetZ]}
                                castShadow
                                receiveShadow
                                material={legMaterial}
                            >
                                <cylinderGeometry args={[0.07, 0.07, TABLE_HEIGHT - 0.6, 18]} />
                            </mesh>
                        ))}
                    </group>
                );
            })}
        </group>
    );
}
