"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Features 66 + 67 + 98 / bug A4 — an appetizing 3D momo from primitives:
 * squashed-sphere body with 12 pleats swirling into a top knot,
 * meshPhysicalMaterial dough (sheen for the flour-matte look, a whisper of
 * clearcoat for steam sheen, warm emissive faking subsurface), procedural
 * bump so it reads as dough — under a warm Lightformer environment (no
 * network fetch), ACES tone mapping and soft contact shadows.
 * DPR capped at 1.5; mounted lazily; frameloop pauses when the tab hides.
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

/** Deterministic PRNG (mulberry32) — stable textures/particles across
 *  re-renders, and keeps render-phase code pure. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DOUGH = {
  color: "#ebd9b4",
  roughness: 0.55,
  metalness: 0,
  clearcoat: 0.12,
  clearcoatRoughness: 0.65,
  sheen: 0.4,
  sheenColor: "#f6e8c8",
  sheenRoughness: 0.6,
  emissive: "#3a2a18",
  emissiveIntensity: 0.18,
} as const;

/** Soft value-noise canvas → bump map (dough, not plastic). */
function useDoughBump(): THREE.CanvasTexture {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const img = ctx.createImageData(size, size);
    const rand = mulberry32(20260705);
    for (let i = 0; i < size * size; i++) {
      const v = 92 + rand() * 64;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    // One soft self-blend smooths white noise into doughy undulation
    // without flattening the contrast the bump map needs.
    ctx.globalAlpha = 0.55;
    ctx.filter = "blur(1.5px)";
    ctx.drawImage(canvas, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 2);
    return tex;
  }, []);
}

const PLEAT_COUNT = 12;

function MomoBody() {
  const group = useRef<THREE.Group>(null);
  const bump = useDoughBump();

  // Pleats: ridge tubes that HUG the squashed-sphere surface from the
  // shoulder up to the knot, swirling ~50° — straight capsules would chord
  // through the dome and vanish inside the dough.
  const pleatGeometry = useMemo(() => {
    const RX = 0.72; // body radius
    const SY = 0.72; // body y-squash
    const surface = (phi: number, theta: number, lift: number) =>
      new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * RX * lift,
        Math.cos(phi) * RX * SY * lift,
        Math.sin(phi) * Math.sin(theta) * RX * lift,
      );
    const geometries = Array.from({ length: PLEAT_COUNT }, (_, i) => {
      const a0 = (i / PLEAT_COUNT) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 10; s++) {
        const t = s / 10;
        const phi = 0.86 - t * 0.72; // shoulder → near pole
        const theta = a0 + t * 0.9; // the swirl
        // Ride slightly proud of the dough mid-way, melt in at both ends.
        const lift = 0.985 + 0.055 * Math.sin(Math.PI * t);
        pts.push(surface(phi, theta, lift));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      return new THREE.TubeGeometry(curve, 14, 0.05, 8);
    });
    return geometries;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Slow idle spin + gentle pointer parallax (feature 66). Tilted toward
    // the camera so the pleat crown — the momo's identity — stays visible.
    group.current.rotation.y = clock.elapsedTime * 0.22 + pointer.x * 0.35;
    group.current.rotation.x = 0.42 - pointer.y * 0.15;
  });

  return (
    <group ref={group} position={[0, -0.18, 0]} scale={0.82}>
      {/* Body — squashed sphere, never a lathe spinning-top. */}
      <mesh scale={[1, 0.72, 1]} castShadow>
        <sphereGeometry args={[0.72, 64, 48]} />
        <meshPhysicalMaterial {...DOUGH} bumpMap={bump} bumpScale={0.9} />
      </mesh>

      {/* Pleats — surface-hugging ridges swirling to the crown. */}
      {pleatGeometry.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshPhysicalMaterial {...DOUGH} bumpMap={bump} bumpScale={0.7} />
        </mesh>
      ))}

      {/* Top knot. */}
      <mesh position={[0, 0.56, 0]} scale={[1, 0.72, 1]}>
        <sphereGeometry args={[0.13, 24, 18]} />
        <meshPhysicalMaterial {...DOUGH} bumpMap={bump} bumpScale={0.7} />
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
    const rand = mulberry32(4242);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 0.5;
      positions[i * 3 + 1] = 0.4 + rand() * 0.2;
      positions[i * 3 + 2] = (rand() - 0.5) * 0.5;
      seeds[i] = rand();
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

/** Soft grounding shadow — a radial-gradient sprite instead of drei's
 *  ContactShadows (whose blur shader trips D3D compiler warnings and
 *  re-renders); this is one static textured plane. */
function BlobShadow() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 64);
    g.addColorStop(0, "rgba(0, 0, 0, 0.42)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.74, 0]}>
      <planeGeometry args={[2.1, 2.1]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
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
      camera={{ position: [0, 0.35, 2.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      {/* Warm-key / cool-rim / bounce light rig — all local, no HDR
          download (GitHub Pages + offline PWA safe). A plain rig instead
          of drei's <Environment>: PMREM's blur shader trips D3D compiler
          warnings on Windows/ANGLE. */}
      <ambientLight intensity={0.5} color="#f6ecdc" />
      <directionalLight position={[2.5, 3, 2]} intensity={1.9} color="#ffcf87" />
      <directionalLight position={[-2.4, 1.2, -1.8]} intensity={0.55} color="#9db4ff" />
      <directionalLight position={[0, -2, 2.5]} intensity={0.35} color="#ffe9c9" />
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.5} floatingRange={[-0.08, 0.12]}>
        <MomoBody />
      </Float>
      <Steam />
      <BlobShadow />
      <VisibilityGate />
    </Canvas>
  );
}
