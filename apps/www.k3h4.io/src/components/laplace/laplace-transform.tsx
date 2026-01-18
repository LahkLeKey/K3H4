import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { Section } from "../section";
import { SectionCard } from "../shell/section-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

type SignalSamples = {
    times: number[];
    values: number[];
    dt: number;
};

type LaplaceSurface = {
    heights: Float32Array;
    resolution: number;
    sigmaRange: [number, number];
    omegaRange: [number, number];
    maxMagnitude: number;
    heightScale: number;
    peakSigma: number;
    peakOmega: number;
};

type LaplacePoint = {
    magnitude: number;
    real: number;
    imag: number;
};

const sigmaRange: [number, number] = [-1.2, 2.4];
const omegaRange: [number, number] = [0, 18];
const surfaceResolution = 40;
const contourLevels = [0.25, 0.5, 0.75];
const colorRampStops = [0, 0.25, 0.5, 0.75, 1];

const presets = [
    { id: "damped", label: "Under-damped", decay: 0.32, frequency: 4.2 },
    { id: "ringing", label: "Ringing", decay: 0.18, frequency: 7.2 },
    { id: "snubbed", label: "Critically damped", decay: 0.68, frequency: 5.6 },
];

const crossSectionSteps = 80;

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function buildSignalSamples(decay: number, frequency: number, gain: number): SignalSamples {
    const count = 320;
    const dt = 0.035;
    const times = new Array<number>(count);
    const values = new Array<number>(count);
    for (let i = 0; i < count; i += 1) {
        const t = i * dt;
        const envelope = Math.exp(-decay * t);
        const base = gain * envelope * Math.sin(frequency * t);
        const overtone = 0.12 * Math.exp(-0.08 * t) * Math.sin(2 * frequency * t + 0.4);
        values[i] = base + overtone;
        times[i] = t;
    }
    return { times, values, dt };
}

function laplaceAt(samples: SignalSamples, sigma: number, omega: number): LaplacePoint {
    const { times, values, dt } = samples;
    let real = 0;
    let imag = 0;
    for (let i = 0; i < times.length; i += 1) {
        const t = times[i];
        const f = values[i];
        const decay = Math.exp(-sigma * t);
        const angle = omega * t;
        real += f * decay * Math.cos(angle) * dt;
        imag -= f * decay * Math.sin(angle) * dt;
    }
    const magnitude = Math.sqrt(real * real + imag * imag);
    return { magnitude, real, imag };
}

function buildCrossSectionOverOmega(samples: SignalSamples, sigma: number) {
    const values: number[] = [];
    const domain: number[] = [];
    for (let i = 0; i < crossSectionSteps; i += 1) {
        const omega = lerp(omegaRange[0], omegaRange[1], i / (crossSectionSteps - 1));
        values.push(laplaceAt(samples, sigma, omega).magnitude);
        domain.push(omega);
    }
    return { values, domain, label: "omega" as const };
}

function buildCrossSectionOverSigma(samples: SignalSamples, omega: number) {
    const values: number[] = [];
    const domain: number[] = [];
    for (let i = 0; i < crossSectionSteps; i += 1) {
        const sigma = lerp(sigmaRange[0], sigmaRange[1], i / (crossSectionSteps - 1));
        values.push(laplaceAt(samples, sigma, omega).magnitude);
        domain.push(sigma);
    }
    return { values, domain, label: "sigma" as const };
}

function computeLaplaceSurface(samples: SignalSamples): LaplaceSurface {
    const resolution = surfaceResolution;
    const heightsRaw = new Float32Array(resolution * resolution);
    let maxMagnitude = 1e-6;
    let peakSigma = sigmaRange[0];
    let peakOmega = omegaRange[0];

    for (let zi = 0; zi < resolution; zi += 1) {
        const omega = lerp(omegaRange[0], omegaRange[1], zi / (resolution - 1));
        for (let xi = 0; xi < resolution; xi += 1) {
            const sigma = lerp(sigmaRange[0], sigmaRange[1], xi / (resolution - 1));
            const { magnitude } = laplaceAt(samples, sigma, omega);
            const idx = zi * resolution + xi;
            heightsRaw[idx] = magnitude;
            if (magnitude > maxMagnitude) {
                maxMagnitude = magnitude;
                peakSigma = sigma;
                peakOmega = omega;
            }
        }
    }

    const heightScale = maxMagnitude > 0 ? 2.6 / Math.log1p(maxMagnitude) : 1;
    const heights = new Float32Array(heightsRaw.length);
    for (let i = 0; i < heightsRaw.length; i += 1) {
        heights[i] = Math.log1p(heightsRaw[i]) * heightScale;
    }

    return { heights, resolution, sigmaRange, omegaRange, maxMagnitude, heightScale, peakSigma, peakOmega };
}

function normalizedHeight(magnitude: number, surface: LaplaceSurface) {
    return Math.log1p(Math.max(0, magnitude)) * surface.heightScale;
}

function LaplaceSurfaceMesh({ surface, wireframe }: { surface: LaplaceSurface; wireframe?: boolean }) {
    const geometry = useMemo(() => new THREE.BufferGeometry(), []);

    useEffect(() => {
        const { resolution, heights, sigmaRange: sigmaBounds, omegaRange: omegaBounds } = surface;
        const positions = new Float32Array(resolution * resolution * 3);
        const colors = new Float32Array(resolution * resolution * 3);
        let ptr = 0;
        let cptr = 0;
        let maxHeight = 0;
        for (let zi = 0; zi < resolution; zi += 1) {
            const omega = lerp(omegaBounds[0], omegaBounds[1], zi / (resolution - 1));
            for (let xi = 0; xi < resolution; xi += 1) {
                const sigma = lerp(sigmaBounds[0], sigmaBounds[1], xi / (resolution - 1));
                const height = heights[zi * resolution + xi];
                positions[ptr] = sigma; ptr += 1;
                positions[ptr] = height; ptr += 1;
                positions[ptr] = omega; ptr += 1;
                if (height > maxHeight) maxHeight = height;
            }
        }

        const tintFromRatio = (ratio: number) => {
            const r = 0.18 + 0.75 * ratio;
            const g = 0.65 * (1 - Math.abs(0.5 - ratio) * 1.6);
            const b = 0.9 - 0.55 * ratio;
            return [Math.max(0, Math.min(1, r)), Math.max(0, Math.min(1, g)), Math.max(0, Math.min(1, b))];
        };

        for (let zi = 0; zi < resolution; zi += 1) {
            for (let xi = 0; xi < resolution; xi += 1) {
                const height = heights[zi * resolution + xi];
                const ratio = maxHeight > 0 ? height / maxHeight : 0;
                const [r, g, b] = tintFromRatio(ratio);
                colors[cptr] = r; cptr += 1;
                colors[cptr] = g; cptr += 1;
                colors[cptr] = b; cptr += 1;
            }
        }

        const indices: number[] = [];
        for (let zi = 0; zi < resolution - 1; zi += 1) {
            for (let xi = 0; xi < resolution - 1; xi += 1) {
                const a = zi * resolution + xi;
                const b = a + 1;
                const c = a + resolution;
                const d = c + 1;
                indices.push(a, c, b, b, c, d);
            }
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
    }, [geometry, surface]);

    useEffect(() => () => geometry.dispose(), [geometry]);

    return (
        <mesh geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial vertexColors roughness={0.36} metalness={0.12} transparent opacity={0.92} wireframe={wireframe} />
        </mesh>
    );
}

function MiniMap({
    probeSigma,
    probeOmega,
    poleSigma,
    poleOmega,
    peakSigma,
    peakOmega,
    showPeak,
}: {
    probeSigma: number;
    probeOmega: number;
    poleSigma: number;
    poleOmega: number;
    peakSigma: number;
    peakOmega: number;
    showPeak: boolean;
}) {
    const width = 260;
    const height = 180;
    const toX = (sigma: number) => ((sigma - sigmaRange[0]) / (sigmaRange[1] - sigmaRange[0])) * width;
    const toY = (omega: number) => height - ((omega - omegaRange[0]) / (omegaRange[1] - omegaRange[0])) * height;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Top-down s-plane map">
            <defs>
                <linearGradient id="planeFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity={0.4} />
                </linearGradient>
            </defs>
            <rect x={0} y={0} width={width} height={height} fill="url(#planeFill)" rx={12} />
            <line x1={0} y1={toY(0)} x2={width} y2={toY(0)} stroke="#a855f7" strokeWidth={1.3} strokeDasharray="6 5" />
            <line x1={toX(0)} y1={0} x2={toX(0)} y2={height} stroke="#38bdf8" strokeWidth={1.3} strokeDasharray="6 5" />
            <circle cx={toX(probeSigma)} cy={toY(probeOmega)} r={7} fill="#fb923c" opacity={0.9} />
            <circle cx={toX(poleSigma)} cy={toY(poleOmega)} r={6} fill="#facc15" opacity={0.9} />
            {showPeak ? <circle cx={toX(peakSigma)} cy={toY(peakOmega)} r={5} fill="#22d3ee" opacity={0.9} /> : null}
            <text x={8} y={18} className="fill-white text-[10px] font-semibold" opacity={0.8}>s-plane overview</text>
            <text x={width - 10} y={toY(0) - 6} textAnchor="end" className="fill-white text-[10px]" opacity={0.7}>omega</text>
            <text x={toX(0) + 8} y={height - 8} className="fill-white text-[10px]" opacity={0.7}>sigma</text>
        </svg>
    );
}

function ProbeMarker({ sigma, omega, height, label }: { sigma: number; omega: number; height: number; label: string; }) {
    return (
        <group position={[sigma, height, omega]}>
            <mesh>
                <sphereGeometry args={[0.1, 26, 26]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.8} />
            </mesh>
            <Line
                points={[[0, -height, 0], [0, -height - 0.6, 0]]}
                color="#f97316"
                lineWidth={1.2}
                dashed
                dashSize={0.2}
                gapSize={0.2}
            />
            <Html position={[0, 0.38, 0]} center className="pointer-events-none select-none">
                <div className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold shadow">
                    {label}
                </div>
            </Html>
        </group>
    );
}

function PoleMarker({ sigma, omega, surface, label, samples }: { sigma: number; omega: number; surface: LaplaceSurface; label: string; samples: SignalSamples; }) {
    const polePoint = useMemo(() => laplaceAt(samples, sigma, omega), [samples, sigma, omega]);
    const height = normalizedHeight(polePoint.magnitude, surface);
    return (
        <group position={[sigma, height, omega]}>
            <mesh>
                <boxGeometry args={[0.18, 0.18, 0.18]} />
                <meshStandardMaterial color="#facc15" emissive="#fbbf24" emissiveIntensity={0.6} />
            </mesh>
            <Html position={[0, 0.32, 0]} center className="pointer-events-none select-none">
                <div className="rounded-full bg-background/85 px-2 py-1 text-[10px] font-semibold shadow">
                    {label}
                </div>
            </Html>
        </group>
    );
}

function PeakMarker({ surface }: { surface: LaplaceSurface }) {
    const height = normalizedHeight(surface.maxMagnitude, surface);
    return (
        <group position={[surface.peakSigma, height, surface.peakOmega]}>
            <mesh>
                <octahedronGeometry args={[0.17, 0]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} />
            </mesh>
            <Html position={[0, 0.34, 0]} center className="pointer-events-none select-none">
                <div className="rounded-full bg-background/80 px-2 py-1 text-[10px] font-semibold shadow">
                    Dominant peak
                </div>
            </Html>
        </group>
    );
}

function ContourLines({ surface }: { surface: LaplaceSurface }) {
    const { resolution, heights } = surface;
    const lines: [number, number, number][][] = [];
    contourLevels.forEach((level) => {
        const pts: [number, number, number][] = [];
        for (let zi = 0; zi < resolution; zi += 1) {
            for (let xi = 0; xi < resolution; xi += 1) {
                const idx = zi * resolution + xi;
                const h = heights[idx];
                if (h >= level * surface.heightScale * Math.log1p(surface.maxMagnitude)) {
                    const sigma = lerp(surface.sigmaRange[0], surface.sigmaRange[1], xi / (resolution - 1));
                    const omega = lerp(surface.omegaRange[0], surface.omegaRange[1], zi / (resolution - 1));
                    pts.push([sigma, h, omega]);
                }
            }
        }
        if (pts.length) lines.push(pts);
    });

    return (
        <group>
            {lines.map((pts, idx) => (
                <Line key={idx} points={pts} color="#e5e7eb" lineWidth={1} dashed dashSize={0.15} gapSize={0.12} />
            ))}
        </group>
    );
}

function LaplaceScene({
    surface,
    probeSigma,
    probeOmega,
    probeHeight,
    wireframe,
    autoRotate,
    poleSigma,
    poleOmega,
    samples,
    showContours,
    probeTrail,
    showProbeTrail,
    showIsoPlane,
    isoHeight,
    showPeak,
}: {
    surface: LaplaceSurface;
    probeSigma: number;
    probeOmega: number;
    probeHeight: number;
    wireframe: boolean;
    autoRotate: boolean;
    poleSigma: number;
    poleOmega: number;
    samples: SignalSamples;
    showContours: boolean;
    probeTrail: [number, number, number][];
    showProbeTrail: boolean;
    showIsoPlane: boolean;
    isoHeight: number;
    showPeak: boolean;
}) {
    const probeLines: [number, number, number][][] = useMemo(() => ([
        [[probeSigma, 0, probeOmega], [probeSigma, probeHeight, probeOmega]],
        [[surface.sigmaRange[0], 0, probeOmega], [surface.sigmaRange[1], 0, probeOmega]],
        [[probeSigma, 0, surface.omegaRange[0]], [probeSigma, 0, surface.omegaRange[1]]],
    ]), [probeSigma, probeOmega, probeHeight, surface]);
    return (
        <Canvas shadows camera={{ position: [6.5, 4.8, 8], fov: 42 }}>
            <color attach="background" args={["#060710"]} />
            <hemisphereLight intensity={0.6} color="#dbeafe" groundColor="#0b1224" />
            <directionalLight position={[7, 8, 6]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <Suspense fallback={<Html center className="text-sm text-muted-foreground">Solving integral...</Html>}>
                <Grid args={[24, 24]} sectionSize={1.5} infiniteFade cellColor="#0f172a" sectionColor="#1f2937" position={[0, 0, 0]} />
                <LaplaceSurfaceMesh surface={surface} wireframe={wireframe} />
                {showContours ? <ContourLines surface={surface} /> : null}
                {showIsoPlane ? (
                    <mesh
                        position={[(sigmaRange[0] + sigmaRange[1]) / 2, isoHeight, (omegaRange[0] + omegaRange[1]) / 2]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <planeGeometry args={[sigmaRange[1] - sigmaRange[0], omegaRange[1] - omegaRange[0]]} />
                        <meshStandardMaterial color="#22d3ee" transparent opacity={0.18} side={THREE.DoubleSide} />
                    </mesh>
                ) : null}
                <Line points={[[sigmaRange[0], 0, 0], [sigmaRange[1], 0, 0]]} color="#38bdf8" lineWidth={2} />
                <Line points={[[0, 0, omegaRange[0]], [0, 0, omegaRange[1]]]} color="#a855f7" lineWidth={2} />
                <Line points={[[sigmaRange[0], 0, 0], [0, 0, omegaRange[1]]]} color="#0ea5e9" lineWidth={1} dashed dashSize={0.3} gapSize={0.25} />
                {probeLines.map((pts, idx) => (
                    <Line key={idx} points={pts} color="#f97316" lineWidth={1} dashed dashSize={0.18} gapSize={0.14} />
                ))}
                {showProbeTrail && probeTrail.length > 1 ? (
                    <Line points={probeTrail} color="#f97316" lineWidth={2} dashed dashSize={0.12} gapSize={0.1} />
                ) : null}
                <ProbeMarker sigma={probeSigma} omega={probeOmega} height={probeHeight} label="|F(s)|" />
                <PoleMarker sigma={poleSigma} omega={poleOmega} surface={surface} samples={samples} label="Expected pole" />
                {showPeak ? <PeakMarker surface={surface} /> : null}
                <Html position={[sigmaRange[1] + 0.2, 0.2, 0]} className="pointer-events-none select-none text-xs text-muted-foreground">
                    sigma (real)
                </Html>
                <Html position={[0.25, 0.2, omegaRange[1] + 0.4]} className="pointer-events-none select-none text-xs text-muted-foreground">
                    omega (imag)
                </Html>
                <OrbitControls enablePan minDistance={4.5} maxDistance={16} target={[0, 1.1, 4]} autoRotate={autoRotate} autoRotateSpeed={0.6} />
            </Suspense>
        </Canvas>
    );
}

function Sparkline({ samples }: { samples: SignalSamples }) {
    const path = useMemo(() => {
        const { values } = samples;
        const width = 240;
        const height = 64;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const span = max - min || 1;
        return values
            .map((value, idx) => {
                const x = (idx / (values.length - 1)) * width;
                const y = height - ((value - min) / span) * height;
                return `${idx === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ");
    }, [samples]);

    return (
        <svg viewBox="0 0 240 64" className="h-20 w-full text-primary">
            <path d={path} fill="none" stroke="currentColor" strokeWidth={2} />
        </svg>
    );
}

function CrossSectionChart({
    title,
    domainLabel,
    series,
}: {
    title: string;
    domainLabel: string;
    series: { domain: number[]; values: number[] };
}) {
    const path = useMemo(() => {
        const width = 240;
        const height = 90;
        const maxVal = Math.max(...series.values, 1e-6);
        return series.values
            .map((value, idx) => {
                const x = (idx / Math.max(series.values.length - 1, 1)) * width;
                const y = height - (value / maxVal) * height;
                return `${idx === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ");
    }, [series]);

    const last = series.values.at(-1) ?? 0;
    const peak = Math.max(...series.values, 0);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{title}</span>
                <span>{domainLabel}</span>
            </div>
            <svg viewBox="0 0 240 90" className="h-24 w-full text-primary">
                <path d={path} fill="none" stroke="currentColor" strokeWidth={2} />
            </svg>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Peak {peak.toFixed(2)}</span>
                <span>Last {last.toFixed(2)}</span>
            </div>
        </div>
    );
}

function ColorRampLegend() {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Surface tint</span>
                <span>|F(s)| scale</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full border bg-gradient-to-r from-[#2e3a5f] via-[#3fa7d6] to-[#fbcfe8]" />
            <div className="flex justify-between text-[10px] text-muted-foreground">
                {colorRampStops.map((stop) => (
                    <span key={stop}>{Math.round(stop * 100)}%</span>
                ))}
            </div>
        </div>
    );
}

export function LaplaceTransformModule({ userEmail }: { userEmail: string | null }) {
    const [decay, setDecay] = useState(0.32);
    const [frequency, setFrequency] = useState(4.2);
    const [gain, setGain] = useState(1);
    const [probeSigma, setProbeSigma] = useState(0.35);
    const [probeOmega, setProbeOmega] = useState(6.2);
    const [wireframe, setWireframe] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const [autoSweep, setAutoSweep] = useState(false);
    const [sweepSpeed, setSweepSpeed] = useState(1);
    const [showContours, setShowContours] = useState(false);
    const [showProbeTrail, setShowProbeTrail] = useState(true);
    const [showIsoPlane, setShowIsoPlane] = useState(false);
    const [showPeak, setShowPeak] = useState(true);
    const [holdTrail, setHoldTrail] = useState(false);
    const [showMiniMap, setShowMiniMap] = useState(true);
    const [probeTrail, setProbeTrail] = useState<[number, number, number][]>([]);

    const samples = useMemo(() => buildSignalSamples(decay, frequency, gain), [decay, frequency, gain]);
    const surface = useMemo(() => computeLaplaceSurface(samples), [samples]);
    const probe = useMemo(() => laplaceAt(samples, probeSigma, probeOmega), [samples, probeSigma, probeOmega]);
    const poleSigma = useMemo(() => -decay, [decay]);
    const poleOmega = useMemo(() => frequency, [frequency]);
    const crossOmega = useMemo(() => buildCrossSectionOverOmega(samples, probeSigma), [samples, probeSigma]);
    const crossSigma = useMemo(() => buildCrossSectionOverSigma(samples, probeOmega), [samples, probeOmega]);
    const phase = useMemo(() => Math.atan2(probe.imag, probe.real), [probe.imag, probe.real]);
    const dbMagnitude = useMemo(() => 20 * Math.log10(Math.max(probe.magnitude, 1e-6)), [probe.magnitude]);
    const poleDistance = useMemo(() => Math.hypot(probeSigma - poleSigma, probeOmega - poleOmega), [probeSigma, probeOmega, poleSigma, poleOmega]);
    const qFactor = useMemo(() => (frequency > 0 && decay > 0 ? frequency / (2 * decay) : 0), [decay, frequency]);
    const probeHeight = useMemo(() => normalizedHeight(probe.magnitude, surface), [probe.magnitude, surface]);
    const isoHeight = useMemo(() => Math.log1p(surface.maxMagnitude * 0.65) * surface.heightScale, [surface.heightScale, surface.maxMagnitude]);
    const formulaPreview = useMemo(() => `F(s) = \u222b f(t) e^{-s t} dt | s = ${probeSigma.toFixed(2)} + j${probeOmega.toFixed(2)}`, [probeSigma, probeOmega]);

    const handleCopyCrossSections = useCallback(async () => {
        const payload = {
            probe: { sigma: probeSigma, omega: probeOmega, magnitude: probe.magnitude, phase },
            crossSections: {
                omega: { domain: crossOmega.domain, values: crossOmega.values },
                sigma: { domain: crossSigma.domain, values: crossSigma.values },
            },
        };
        const text = JSON.stringify(payload, null, 2);
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        }
    }, [crossOmega.domain, crossOmega.values, crossSigma.domain, crossSigma.values, phase, probe.imag, probe.magnitude, probe.real, probeOmega, probeSigma]);

    const energy = useMemo(() => {
        const sum = samples.values.reduce((acc, value) => acc + value * value, 0);
        return Math.sqrt(sum / samples.values.length);
    }, [samples]);

    const peakTime = useMemo(() => {
        let idx = 0;
        let maxValue = -Infinity;
        samples.values.forEach((value, i) => {
            if (value > maxValue) {
                maxValue = value;
                idx = i;
            }
        });
        return samples.times[idx] ?? 0;
    }, [samples]);

    useEffect(() => {
        if (!autoSweep) return undefined;
        let frame = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const elapsed = (now - start) / 1000;
            const omegaSpan = omegaRange[1] - omegaRange[0];
            const sigmaSpan = sigmaRange[1] - sigmaRange[0];
            setProbeOmega(omegaRange[0] + ((elapsed * 1.1 * sweepSpeed) % omegaSpan));
            setProbeSigma(sigmaRange[0] + ((elapsed * 0.45 * sweepSpeed) % sigmaSpan));
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [autoSweep, sweepSpeed]);

    useEffect(() => {
        setProbeTrail((prev) => {
            if (holdTrail) return prev;
            const next: [number, number, number][] = [...prev, [probeSigma, probeHeight, probeOmega]];
            const maxLen = 140;
            if (next.length > maxLen) next.splice(0, next.length - maxLen);
            return next;
        });
    }, [holdTrail, probeHeight, probeOmega, probeSigma]);

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Transform analysis"
                title="Laplace transform lab"
                description="Visualize how damped time signals map into the s-plane. The surface height tracks |F(s)| so you can spot dominant poles and damping choices."
                actions={<Badge variant="secondary">User: {userEmail ?? "guest"}</Badge>}
            >
                <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
                    <div className="space-y-3">
                        <div className="relative h-[500px] overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                            <LaplaceScene
                                surface={surface}
                                probeSigma={probeSigma}
                                probeOmega={probeOmega}
                                probeHeight={probeHeight}
                                wireframe={wireframe}
                                autoRotate={autoRotate}
                                poleSigma={poleSigma}
                                poleOmega={poleOmega}
                                samples={samples}
                                showContours={showContours}
                                probeTrail={probeTrail}
                                showProbeTrail={showProbeTrail}
                                showIsoPlane={showIsoPlane}
                                isoHeight={isoHeight}
                                showPeak={showPeak}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/5 to-transparent" />
                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                <Badge variant="outline">sigma {probeSigma.toFixed(2)}</Badge>
                                <Badge variant="outline">omega {probeOmega.toFixed(1)} rad/s</Badge>
                                <Badge variant="secondary">|F(s)| {probe.magnitude.toFixed(2)}</Badge>
                                <Badge variant="outline">angle {phase.toFixed(2)} rad</Badge>
                                <Badge variant="outline">pole at ({poleSigma.toFixed(2)}, {poleOmega.toFixed(1)})</Badge>
                                <Badge variant="outline">|F(s)| {dbMagnitude.toFixed(1)} dB</Badge>
                                <Badge variant="outline">dist to pole {poleDistance.toFixed(2)}</Badge>
                                <Badge variant="secondary">Q {qFactor.toFixed(2)}</Badge>
                                <Badge variant="outline">peak ({surface.peakSigma.toFixed(2)}, {surface.peakOmega.toFixed(1)})</Badge>
                            </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <SectionCard tone="muted" className="space-y-1 p-4">
                                <div className="text-xs uppercase tracking-wide text-muted-foreground">Peak height</div>
                                <div className="text-base font-semibold">{surface.maxMagnitude.toFixed(2)}</div>
                                <Badge variant="outline">sigma window {sigmaRange[0]} to {sigmaRange[1]}</Badge>
                            </SectionCard>
                            <SectionCard tone="muted" className="space-y-1 p-4">
                                <div className="text-xs uppercase tracking-wide text-muted-foreground">Energy (RMS)</div>
                                <div className="text-base font-semibold">{energy.toFixed(3)}</div>
                                <Badge variant="secondary">t to s-domain bridge</Badge>
                            </SectionCard>
                            <SectionCard tone="muted" className="space-y-1 p-4">
                                <div className="text-xs uppercase tracking-wide text-muted-foreground">First crest</div>
                                <div className="text-base font-semibold">t = {peakTime.toFixed(2)}s</div>
                                <Badge variant="outline">Align omega to crest</Badge>
                            </SectionCard>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SectionCard className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Signal controls</p>
                                <div className="text-lg font-semibold">Damping & oscillation</div>
                                <p className="text-sm text-muted-foreground">Adjust decay and frequency to see how the s-plane surface tilts and where the response concentrates.</p>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                                        <span>Damping sigma</span>
                                        <span>{decay.toFixed(2)}</span>
                                    </div>
                                    <Slider value={[decay]} min={0.08} max={0.9} step={0.01} onValueChange={(value) => setDecay(value[0] ?? decay)} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                                        <span>Oscillation omega</span>
                                        <span>{frequency.toFixed(2)} rad/s</span>
                                    </div>
                                    <Slider value={[frequency]} min={2} max={9.5} step={0.05} onValueChange={(value) => setFrequency(value[0] ?? frequency)} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                                        <span>Gain</span>
                                        <span>{gain.toFixed(2)}</span>
                                    </div>
                                    <Slider value={[gain]} min={0.5} max={1.6} step={0.05} onValueChange={(value) => setGain(value[0] ?? gain)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {presets.map((preset) => (
                                    <Button
                                        key={preset.id}
                                        variant={Math.abs(decay - preset.decay) < 0.02 && Math.abs(frequency - preset.frequency) < 0.1 ? "default" : "outline"}
                                        className="w-full"
                                        onClick={() => {
                                            setDecay(preset.decay);
                                            setFrequency(preset.frequency);
                                        }}
                                    >
                                        {preset.label}
                                    </Button>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">View options</p>
                                <div className="text-lg font-semibold">Surface feel</div>
                                <p className="text-sm text-muted-foreground">Animate the camera, show a wireframe, or let the probe sweep the s-plane hands-free.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant={autoRotate ? "default" : "outline"} onClick={() => setAutoRotate((v) => !v)}>Auto rotate</Button>
                                <Button variant={wireframe ? "default" : "outline"} onClick={() => setWireframe((v) => !v)}>Wireframe overlay</Button>
                                <Button variant={autoSweep ? "default" : "outline"} onClick={() => setAutoSweep((v) => !v)}>Auto sweep probe</Button>
                                <Button variant="outline" onClick={() => { setProbeSigma(0.35); setProbeOmega(6.2); }}>Reset probe</Button>
                                <Button variant={showContours ? "default" : "outline"} onClick={() => setShowContours((v) => !v)}>Contours</Button>
                                <Button variant="outline" onClick={() => { setProbeSigma(poleSigma); setProbeOmega(poleOmega); }}>Snap to pole</Button>
                                <Button variant={showProbeTrail ? "default" : "outline"} onClick={() => setShowProbeTrail((v) => !v)}>Probe trail</Button>
                                <Button variant={showIsoPlane ? "default" : "outline"} onClick={() => setShowIsoPlane((v) => !v)}>Iso-height plane</Button>
                                <Button variant={showPeak ? "default" : "outline"} onClick={() => setShowPeak((v) => !v)}>Dominant peak marker</Button>
                                <Button variant="outline" onClick={() => { setProbeSigma(surface.peakSigma); setProbeOmega(surface.peakOmega); }}>Snap to peak</Button>
                                <Button variant={showMiniMap ? "default" : "outline"} onClick={() => setShowMiniMap((v) => !v)}>Mini s-plane map</Button>
                                <Button variant={holdTrail ? "default" : "outline"} onClick={() => setHoldTrail((v) => !v)}>Hold trail</Button>
                                <Button variant="outline" onClick={() => setProbeTrail([])}>Clear trail</Button>
                            </div>
                            <div className="pt-2">
                                <div className="mb-1 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                                    <span>Sweep speed</span>
                                    <span>{sweepSpeed.toFixed(2)}x</span>
                                </div>
                                <Slider value={[sweepSpeed]} min={0.25} max={2} step={0.05} onValueChange={(value) => setSweepSpeed(value[0] ?? sweepSpeed)} />
                            </div>
                        </SectionCard>

                        <SectionCard className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Probe F(s)</p>
                                <div className="text-lg font-semibold">Place a cursor in the s-plane</div>
                                <p className="text-sm text-muted-foreground">Drag sigma and omega to sample the transform. The probe marker rides the surface height for |F(s)|.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground"><span>sigma (real)</span><span>{probeSigma.toFixed(2)}</span></div>
                                    <Slider value={[probeSigma]} min={sigmaRange[0]} max={sigmaRange[1]} step={0.02} onValueChange={(value) => setProbeSigma(value[0] ?? probeSigma)} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground"><span>omega (imag)</span><span>{probeOmega.toFixed(2)} rad/s</span></div>
                                    <Slider value={[probeOmega]} min={omegaRange[0]} max={omegaRange[1]} step={0.1} onValueChange={(value) => setProbeOmega(value[0] ?? probeOmega)} />
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/40 p-3 text-sm">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary">{"F(s) = Integral f(t) e^{-s t} dt"}</Badge>
                                    <Badge variant="outline">Real {probe.real.toFixed(3)}</Badge>
                                    <Badge variant="outline">Imag {probe.imag.toFixed(3)}</Badge>
                                    <Badge variant="outline">Phase {Math.atan2(probe.imag, probe.real).toFixed(2)} rad</Badge>
                                    <Badge variant="outline">{formulaPreview}</Badge>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">{"Try scanning sigma near zero to see how lightly damped signals spike. Increasing sigma flattens the response because e^{-sigma t} suppresses later energy."}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline" onClick={handleCopyCrossSections}>Copy slices JSON</Button>
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard className="space-y-3">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Cross sections</p>
                                <div className="text-lg font-semibold">Slice the surface</div>
                                <p className="text-sm text-muted-foreground">See magnitude along omega at the current sigma, and along sigma at the current omega.</p>
                            </div>
                            <CrossSectionChart
                                title="|F(s)| vs omega"
                                domainLabel={`sigma fixed at ${probeSigma.toFixed(2)}`}
                                series={crossOmega}
                            />
                            <CrossSectionChart
                                title="|F(s)| vs sigma"
                                domainLabel={`omega fixed at ${probeOmega.toFixed(2)} rad/s`}
                                series={crossSigma}
                            />
                            <ColorRampLegend />
                            {showMiniMap ? (
                                <div className="rounded-lg border bg-muted/40 p-3">
                                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Top-down s-plane</span>
                                        <span>Probe / pole / peak</span>
                                    </div>
                                    <MiniMap
                                        probeSigma={probeSigma}
                                        probeOmega={probeOmega}
                                        poleSigma={poleSigma}
                                        poleOmega={poleOmega}
                                        peakSigma={surface.peakSigma}
                                        peakOmega={surface.peakOmega}
                                        showPeak={showPeak}
                                    />
                                </div>
                            ) : null}
                        </SectionCard>

                        <SectionCard className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold">Input waveform</div>
                                    <p className="text-xs text-muted-foreground">Damped sinusoid feeding the transform engine.</p>
                                </div>
                                <Badge variant="outline">{samples.values.length} samples</Badge>
                            </div>
                            <Sparkline samples={samples} />
                            <div className="grid gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>Envelope</span>
                                    <span>{"e^{-sigma t} * sin(omega t)"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Sampling window</span>
                                    <span>t in [0, {(samples.times.at(-1) ?? 0).toFixed(1)}] s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Integrator step</span>
                                    <span>Delta t = {samples.dt.toFixed(3)} s</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Bandwidth sweep</span>
                                    <span>{omegaRange[0]} to {omegaRange[1]} rad/s</span>
                                </div>
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </Section>
        </div>
    );
}
