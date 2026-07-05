"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Features 66 + 67 + 98 — floating 3D momo built from primitives (no GLB)
 * with slow idle rotation, mouse parallax, and GPU steam particles via a
 * tiny custom shader. DPR capped at 1.5; the parent mounts this only when
 * idle + in view, and pauses rendering when the tab is hidden.
 */

/** Window-level pointer (the canvas itself is pointer-events-none). */
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

function MomoBody() {
  const group = useRef<THREE.Group>(null);

  // Lathe profile: plump dumpling silhouette.
  const bodyGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      // Bulbous base narrowing into a topknot.
      const radius =
        0.62 * Math.sin(Math.PI * Math.min(t * 1.12, 1)) * (1 - 0.28 * t * t) +
        0.02;
      points.push(new THREE.Vector2(Math.max(radius, 0.001), t * 0.92));
    }
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // Pleats: small rotated capsules fanned around the topknot.
  const pleats = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return {
          position: [
            Math.cos(angle) * 0.16,
            0.78,
            Math.sin(angle) * 0.16,
          ] as const,
          rotation: [Math.PI / 3.2, -angle, 0] as const,
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Slow idle spin + gentle pointer parallax (feature 66).
    group.current.rotation.y = clock.elapsedTime * 0.25 + pointer.x * 0.35;
    group.current.rotation.x = -0.15 + pointer.y * 0.18;
  });

  return (
    <group ref={group} position={[0, -0.42, 0]}>
      <mesh geometry={bodyGeometry} castShadow>
        <meshStandardMaterial color="#f2e9d8" roughness={0.55} metalness={0.02} />
      </mesh>
      {pleats.map((pleat, i) => (
        <mesh key={i} position={pleat.position as unknown as THREE.Vector3Tuple} rotation={pleat.rotation as unknown as THREE.EulerTuple}>
          <capsuleGeometry args={[0.035, 0.14, 3, 8]} />
          <meshStandardMaterial color="#ede2cd" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ede2cd" roughness={0.6} />
      </mesh>
    </group>
  );
}

const steamVertex = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    float t = mod(uTime * 0.22 + aSeed, 1.0);
    vec3 pos = position;
    pos.y += t * 2.4;
    pos.x += sin((t + aSeed) * 6.28) * 0.16 * t;
    vAlpha = smoothstep(0.0, 0.18, t) * (1.0 - smoothstep(0.55, 1.0, t));
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (14.0 + aSeed * 22.0) * (1.0 + t) / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const steamFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = smoothstep(0.5, 0.0, length(uv));
    gl_FragColor = vec4(vec3(0.96, 0.94, 0.90), d * vAlpha * 0.35);
  }
`;

function Steam({ count = 60 }: { count?: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = 0.4 + Math.random() * 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count]);

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={steamVertex}
        fragmentShader={steamFragment}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Stops the frameloop entirely while the tab is hidden (feature 98). */
function VisibilityGate() {
  const { clock } = useThree();
  useFrame(() => {
    if (document.hidden) clock.stop();
    else if (!clock.running) clock.start();
  });
  return null;
}

export default function MomoScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 2.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <ambientLight intensity={0.55} color="#f6f1e7" />
      <directionalLight position={[2.5, 3, 2]} intensity={1.6} color="#e8a13a" />
      <directionalLight position={[-2, 1, -1.5]} intensity={0.35} color="#d64533" />
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.5} floatingRange={[-0.08, 0.12]}>
        <MomoBody />
      </Float>
      <Steam />
      <VisibilityGate />
    </Canvas>
  );
}
