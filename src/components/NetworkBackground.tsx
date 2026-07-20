import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECT_DIST = 2.6;

function NetworkNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.006;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return arr;
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(NODE_COUNT * NODE_COUNT * 6),
    []
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * viewport.width;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * viewport.height;
    },
    [viewport]
  );

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pointermove", handlePointerMove);
    }
  }, [handlePointerMove]);

  useFrame(() => {
    if (!pointsRef.current || !lineRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      pos[ix] += velocities[ix];
      pos[ix + 1] += velocities[ix + 1];
      pos[ix + 2] += velocities[ix + 2];

      if (pos[ix] > 8 || pos[ix] < -8) velocities[ix] *= -1;
      if (pos[ix + 1] > 4.5 || pos[ix + 1] < -4.5) velocities[ix + 1] *= -1;
      if (pos[ix + 2] > 3 || pos[ix + 2] < -3) velocities[ix + 2] *= -1;

      // gentle attraction toward mouse for interactivity
      const dx = mouse.current.x - pos[ix];
      const dy = mouse.current.y - pos[ix + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        pos[ix] += dx * 0.0009;
        pos[ix + 1] += dy * 0.0009;
      }
    }
    posAttr.needsUpdate = true;

    // rebuild connecting edges between nearby nodes
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const ix = i * 3;
        const jx = j * 3;
        const dx = pos[ix] - pos[jx];
        const dy = pos[ix + 1] - pos[jx + 1];
        const dz = pos[ix + 2] - pos[jx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECT_DIST) {
          linePositions[lineIdx++] = pos[ix];
          linePositions[lineIdx++] = pos[ix + 1];
          linePositions[lineIdx++] = pos[ix + 2];
          linePositions[lineIdx++] = pos[jx];
          linePositions[lineIdx++] = pos[jx + 1];
          linePositions[lineIdx++] = pos[jx + 2];
        }
      }
    }
    const lineAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    (lineAttr.array as Float32Array).fill(0);
    (lineAttr.array as Float32Array).set(linePositions.subarray(0, lineIdx));
    lineRef.current.geometry.setDrawRange(0, lineIdx / 3);
    lineAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={NODE_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00F5FF" size={0.06} sizeAttenuation transparent opacity={0.85} />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} count={NODE_COUNT * NODE_COUNT} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#2563EB" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

export default function NetworkBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <NetworkNodes />
      </Canvas>
    </div>
  );
}
