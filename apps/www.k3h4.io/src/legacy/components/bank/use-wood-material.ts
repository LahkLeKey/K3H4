import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type WoodMaterialOptions = {
    light?: string | number;
    dark?: string | number;
    scale?: number;
    ringScale?: number;
    plank?: boolean;
};

type WoodUniforms = {
    uTime: { value: number };
    uScale: { value: number };
    uRingScale: { value: number };
    uLightColor: { value: THREE.Color };
    uDarkColor: { value: THREE.Color };
    uPlank: { value: number };
};

const woodShader = {
    uniforms: {
        uTime: { value: 0 as number },
        uScale: { value: 4 as number },
        uRingScale: { value: 20 as number },
        uLightColor: { value: new THREE.Color(0xdeb887) },
        uDarkColor: { value: new THREE.Color(0x8b5a2b) },
        uPlank: { value: 0 as number },
    } satisfies WoodUniforms,
    vertexShader: `
        varying vec3 vPos;
        void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vPos;
        uniform float uTime;
        uniform float uScale;
        uniform float uRingScale;
        uniform vec3 uLightColor;
        uniform vec3 uDarkColor;
        uniform float uPlank;

        float hash(vec3 p) {
            p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f*f*(3.0 - 2.0*f);
            return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                           mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                       mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                           mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }

        void main() {
            vec3 p = vPos * uScale;
            float n = noise(p + uTime * 0.12);

            float radialFlow = length(vPos.xz);
            float linearFlow = vPos.x;
            float flow = mix(radialFlow, linearFlow, step(0.5, uPlank));

            float wobble = sin(vPos.z * 2.0 + n * 4.0) * 0.25;
            float bands = sin(uRingScale * 0.6 * (flow + wobble) + n * 2.0);
            float fine = sin(uRingScale * 1.8 * flow + n * 6.0) * 0.15;

            float grain = 0.55 + 0.3 * bands + fine + n * 0.08;
            grain = clamp(grain, 0.0, 1.0);

            vec3 color = mix(uDarkColor, uLightColor, grain);
            gl_FragColor = vec4(color, 1.0);
        }
    `,
} as const;

export const WOOD_MATERIAL_PRESETS = {
    default: { light: 0xe3c9a5, dark: 0xb0763b, scale: 3.8, ringScale: 18, plank: false },
    tableTop: { light: 0xe8cfa9, dark: 0xb57a42, scale: 3.4, ringScale: 8, plank: true },
    tableLeg: { light: 0xd6b183, dark: 0x9c6a34, scale: 5.2, ringScale: 22, plank: false },
    palePlank: { light: 0xf3e2c7, dark: 0xc08f52, scale: 3.0, ringScale: 6, plank: true },
} satisfies Record<string, WoodMaterialOptions>;

export type WoodMaterialPreset = keyof typeof WOOD_MATERIAL_PRESETS;

function createWoodMaterial(options?: WoodMaterialOptions) {
    const uniforms: WoodUniforms = {
        uTime: { value: 0 },
        uScale: { value: options?.scale ?? 3.8 },
        uRingScale: { value: options?.ringScale ?? 18 },
        uLightColor: { value: new THREE.Color(options?.light ?? 0xe3c9a5) },
        uDarkColor: { value: new THREE.Color(options?.dark ?? 0xb0763b) },
        uPlank: { value: options?.plank ? 1 : 0 },
    };

    return new THREE.ShaderMaterial({
        uniforms,
        vertexShader: woodShader.vertexShader,
        fragmentShader: woodShader.fragmentShader,
    });
}

export function useWoodMaterial({ preset = "default", overrides, animate = true }: { preset?: WoodMaterialPreset; overrides?: WoodMaterialOptions; animate?: boolean } = {}) {
    const config = { ...WOOD_MATERIAL_PRESETS[preset], ...overrides } as WoodMaterialOptions;
    const { light, dark, scale, ringScale, plank } = config;

    const material = useMemo(() => createWoodMaterial(config), [light, dark, scale, ringScale, plank]);

    useFrame((state) => {
        if (!animate) return;
        material.uniforms.uTime.value = state.clock.getElapsedTime();
    });

    useEffect(() => () => material.dispose(), [material]);

    return material;
}
