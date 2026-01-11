import * as THREE from "three";

function applyPanelShader(material: THREE.MeshStandardMaterial, density = 18) {
    material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <fog_fragment>",
            `float panelGridX = sin(vUv.x * ${density.toFixed(1)} * 3.14159);
             float panelGridY = sin(vUv.y * ${density.toFixed(1)} * 3.14159);
             float panelLines = smoothstep(-0.02, 0.02, panelGridX * panelGridY);
             vec3 panelTint = vec3(0.06) * panelLines;
             gl_FragColor.rgb = max(vec3(0.0), gl_FragColor.rgb - panelTint);
             #include <fog_fragment>`
        );
    };
    material.needsUpdate = true;
    return material;
}

export function VaultShell() {
    return (
        <group>
            <mesh position={[0, 2.5, -10]} receiveShadow>
                <boxGeometry args={[24, 6, 0.4]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.32} roughness={0.42} envMapIntensity={0.35} onUpdate={(m) => applyPanelShader(m as THREE.MeshStandardMaterial, 22)} />
            </mesh>
            <mesh position={[-12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[20, 6, 0.4]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.46} envMapIntensity={0.32} onUpdate={(m) => applyPanelShader(m as THREE.MeshStandardMaterial, 20)} />
            </mesh>
            <mesh position={[12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[20, 6, 0.4]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.46} envMapIntensity={0.32} onUpdate={(m) => applyPanelShader(m as THREE.MeshStandardMaterial, 20)} />
            </mesh>
            <mesh position={[0, 5.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[24, 20]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.08} roughness={0.74} envMapIntensity={0.28} onUpdate={(m) => applyPanelShader(m as THREE.MeshStandardMaterial, 26)} />
            </mesh>
        </group>
    );
}
