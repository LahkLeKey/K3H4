import { useEffect, useMemo } from "react";
import * as THREE from "three";

export type CoinMaterialOptions = {
    baseColor?: THREE.ColorRepresentation;
    bandColor?: THREE.ColorRepresentation;
    pipColor?: THREE.ColorRepresentation;
    faceTextureSize?: number;
    sideTextureSize?: number;
};

function toCss(color: THREE.ColorRepresentation) {
    return new THREE.Color(color).getStyle();
}

function makeFaceTexture({
    size,
    base,
    band,
    pip,
}: {
    size: number;
    base: THREE.ColorRepresentation;
    band: THREE.ColorRepresentation;
    pip: THREE.ColorRepresentation;
}) {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = toCss(base);
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.translate(size / 2, size / 2);

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = toCss(band);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = toCss(base);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = toCss(pip);
    const pipR = size * 0.025;
    const ringR = size * 0.42;
    const count = 10;
    for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * ringR, Math.sin(a) * ringR, pipR, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.anisotropy = 2;
    tex.needsUpdate = true;
    return tex;
}

function makeSideTexture({ size, base, band }: { size: number; base: THREE.ColorRepresentation; band: THREE.ColorRepresentation }) {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = toCss(base);
    ctx.fillRect(0, 0, size, size);

    const stripeW = size * 0.12;
    ctx.fillStyle = toCss(band);
    for (let x = 0; x < size; x += stripeW * 2) {
        ctx.fillRect(x, 0, stripeW, size);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(3, 1);
    tex.anisotropy = 2;
    tex.needsUpdate = true;
    return tex;
}

export function useCoinMaterials(options: CoinMaterialOptions = {}) {
    const {
        baseColor = "#d92c2c",
        bandColor = "#f8fafc",
        pipColor = "#f8fafc",
        faceTextureSize = 256,
        sideTextureSize = 128,
    } = options;

    const faceMap = useMemo(() => makeFaceTexture({ size: faceTextureSize, base: baseColor, band: bandColor, pip: pipColor }), [bandColor, baseColor, faceTextureSize, pipColor]);
    const sideMap = useMemo(() => makeSideTexture({ size: sideTextureSize, base: baseColor, band: bandColor }), [bandColor, baseColor, sideTextureSize]);

    const { topMaterial, sideMaterial } = useMemo(() => {
        const top = new THREE.MeshStandardMaterial({
            color: new THREE.Color(baseColor),
            metalness: 0.05,
            roughness: 0.42,
            map: faceMap ?? undefined,
            emissive: new THREE.Color("#3f1a1a"),
            emissiveIntensity: 0.08,
        });

        const side = new THREE.MeshStandardMaterial({
            color: new THREE.Color(baseColor),
            metalness: 0.05,
            roughness: 0.38,
            map: sideMap ?? undefined,
            emissive: new THREE.Color("#3f1a1a"),
            emissiveIntensity: 0.08,
        });

        return { topMaterial: top, sideMaterial: side };
    }, [bandColor, baseColor, faceMap, pipColor, sideMap]);

    useEffect(() => {
        return () => {
            topMaterial.dispose();
            sideMaterial.dispose();
            faceMap?.dispose();
            sideMap?.dispose();
        };
    }, [faceMap, sideMap, topMaterial, sideMaterial]);

    const materials = useMemo(() => [sideMaterial, topMaterial, sideMaterial], [sideMaterial, topMaterial]);

    return { materials, topMaterial, sideMaterial, faceMap, sideMap };
}
