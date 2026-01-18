export type ZoneId = "bank" | "arcade" | "agriculture" | "warehouse" | "laplace" | "persona" | "agency" | "freight" | "culinary" | "pos" | "graphics" | "rpg";

export type ZoneCameraPose = {
    position: [number, number, number];
    target: [number, number, number];
};

export type ZoneEnvironment = {
    background: string;
    fogColor: string;
    fogNear: number;
    fogFar: number;
    keyLight: { color: string; intensity: number; position: [number, number, number] };
    fillLight?: { color: string; intensity: number; position: [number, number, number] };
    rimLight?: { color: string; intensity: number; position: [number, number, number] };
};

export type ZoneDefinition = {
    id: ZoneId;
    label: string;
    description: string;
    accent: string;
    glyph?: string;
    spawn: ZoneCameraPose;
    anchor: [number, number, number];
    environment: ZoneEnvironment;
};
