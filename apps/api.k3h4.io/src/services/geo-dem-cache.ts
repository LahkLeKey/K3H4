export const TERRAIN_PROVIDER = 'maptiler';

export const demSignature =
    (provider: string, z: number, x: number, y: number, format: string) =>
        `${provider}:${z}/${x}/${y}:${format}`;
