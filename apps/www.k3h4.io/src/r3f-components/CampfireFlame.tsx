import React, { useMemo, useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CampfireFlameMaterial = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 1.25,
    uBaseColor: new THREE.Color("#ff3b1a"),
    uTipColor: new THREE.Color("#ffd28a"),
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uBaseColor;
  uniform vec3 uTipColor;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    float t = uTime;
    float rise = uv.y;

    float n = fbm(vec2(uv.x * 2.8, uv.y * 2.8 - t * 1.2));
    float sway = (n - 0.5) * 0.55 * pow(rise, 1.35);
    p.x += sway;

    float width = mix(0.55, 0.06, pow(rise, 1.2));
    float core = 1.0 - smoothstep(width, width + 0.12, abs(p.x));

    float licks = fbm(vec2(uv.x * 3.5 + t * 0.15, uv.y * 4.0 - t * 1.8));
    float breakup = smoothstep(0.20, 0.95, licks + rise * 0.6);
    float topFade = smoothstep(1.05, 0.20, uv.y);
    float flame = core * breakup * topFade;

    float hotCore = smoothstep(0.55, 0.0, length(vec2(p.x * 1.3, (uv.y - 0.15) * 1.4)));
    hotCore *= (1.0 - uv.y);

    vec3 col = mix(uBaseColor, uTipColor, pow(uv.y, 0.8));
    float glow = flame * (1.35 + hotCore * 2.0) * uIntensity;
    float alpha = flame * 0.85;
    vec3 outCol = col * glow;
    gl_FragColor = vec4(outCol, alpha);
  }
  `
);

extend({ CampfireFlameMaterial });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      campfireFlameMaterial: any;
    }
  }
}

export function CampfireFlame({ size = 1, intensity = 1.2, lightIntensity = 2.2 }: { size?: number; intensity?: number; lightIntensity?: number }) {
  const mat = useRef<any>(null);
  const light = useRef<THREE.PointLight>(null);
  const planes = useMemo(() => [0, Math.PI / 3, (2 * Math.PI) / 3], []);
  const growth = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mat.current) mat.current.uTime = t;

    if (light.current) {
      const fast = 0.6 + 0.4 * Math.sin(t * 18.0);
      const slow = 0.7 + 0.3 * Math.sin(t * 3.2 + 1.7);
      light.current.intensity = 2.2 * fast * slow;
    }

    // gentle growth on first seconds
    growth.current = Math.min(1, growth.current + state.clock.getDelta() * 0.9);
  });

  return (
    <group scale={size * (0.6 + growth.current * 0.6)}>
            <pointLight ref={light} position={[0, 0.45, 0]} distance={6} decay={2} intensity={lightIntensity} color={"#ffb35c"} />

      {planes.map((ry, i) => (
        <mesh key={ry} rotation={[0, ry, 0]} position={[0, 0.5, 0]}>
          <planeGeometry args={[0.7, 1.3, 1, 1]} />
          <campfireFlameMaterial
            ref={i === 0 ? mat : undefined}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uIntensity={intensity}
            uBaseColor={new THREE.Color("#ff3b1a")}
            uTipColor={new THREE.Color("#ffd28a")}
          />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.35, 48]} />
        <meshStandardMaterial color={"#1a0b06"} emissive={"#ff3b1a"} emissiveIntensity={0.75} roughness={1} />
      </mesh>
    </group>
  );
}
