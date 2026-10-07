import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CommandScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 8.2], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 18]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} color="#00D4FF" intensity={3.3} />
      <pointLight position={[-4, 2, 3]} color="#7C3AED" intensity={2.5} />
      <SceneRig>
        <ParticleField />
        <CommandCore />
        <CodePanels />
        <DataGrid />
      </SceneRig>
    </Canvas>
  );
}

function SceneRig({ children }) {
  const group = useRef();

  useFrame(({ mouse, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.13, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 0.09, 0.04);
    group.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.08;
  });

  return <group ref={group}>{children}</group>;
}

function ParticleField() {
  const pointsRef = useRef();
  const particles = useMemo(() => {
    const count = 1300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.018;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.025;
  });

  return (
    <points ref={pointsRef} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial transparent color="#00D4FF" size={0.027} sizeAttenuation depthWrite={false} opacity={0.55} />
    </points>
  );
}

function CommandCore() {
  const groupRef = useRef();
  const ringRef = useRef();
  const floatOrigin = useRef(0.2);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current || !ringRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.22 + mouse.x * 0.22;
    groupRef.current.position.y = floatOrigin.current + Math.sin(clock.elapsedTime * 1.1) * 0.12;
    ringRef.current.rotation.z = -clock.elapsedTime * 0.42;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.08, 3]} />
        <meshStandardMaterial color="#050505" emissive="#00D4FF" emissiveIntensity={0.28} metalness={0.65} roughness={0.18} wireframe />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.72, 0.012, 16, 160]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.4} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.6, Math.PI / 2]}>
        <torusGeometry args={[2.16, 0.008, 16, 160]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.1} />
      </mesh>
      <StatusBars />
    </group>
  );
}

function StatusBars() {
  return (
    <group position={[-0.78, -1.9, 0.2]}>
      {[0.88, 0.54, 1.18, 0.72].map((width, index) => (
        <mesh key={width} position={[0, -index * 0.14, 0]}>
          <boxGeometry args={[width, 0.035, 0.018]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#00D4FF" : "#7CFFCB"} emissive={index % 2 === 0 ? "#00D4FF" : "#7CFFCB"} emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

function CodePanels() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((panel, index) => {
      panel.position.y += Math.sin(clock.elapsedTime + index) * 0.0008;
    });
  });

  return (
    <group ref={groupRef}>
      <HoloPanel position={[-3.25, 1.2, -0.8]} rotation={[0, 0.34, 0]} variant={0} />
      <HoloPanel position={[3.15, 0.9, -1.2]} rotation={[0, -0.36, 0]} variant={1} />
      <HoloPanel position={[2.25, -1.45, 0.15]} rotation={[0, -0.2, 0]} variant={2} />
    </group>
  );
}

function HoloPanel({ position, rotation, variant }) {
  const lineWidths = [
    [1.42, 0.92, 1.76, 1.12],
    [1.28, 1.7, 0.84, 1.46],
    [1.58, 1.02, 1.3, 0.78]
  ][variant];

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[2.35, 1.28, 0.035]} />
        <meshStandardMaterial color="#071017" transparent opacity={0.38} emissive="#00D4FF" emissiveIntensity={0.12} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.38, 1.31, 0.04)]} />
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.68} />
      </lineSegments>
      {lineWidths.map((width, index) => (
        <group key={`${width}-${index}`} position={[-0.92, 0.42 - index * 0.28, 0.05]}>
          <mesh position={[width / 2, 0, 0]}>
            <boxGeometry args={[width, 0.035, 0.018]} />
            <meshStandardMaterial
              color={index === 1 ? "#7CFFCB" : "#ffffff"}
              emissive={index === 1 ? "#7CFFCB" : "#00D4FF"}
              emissiveIntensity={index === 1 ? 1 : 0.42}
            />
          </mesh>
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DataGrid() {
  const positions = useMemo(() => {
    const grid = [];
    for (let i = -8; i <= 8; i += 1) {
      grid.push(i, -2.85, -5.6, i, -2.85, 5.6);
      grid.push(-8, -2.85, i * 0.7, 8, -2.85, i * 0.7);
    }
    return new Float32Array(grid);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#133D52" transparent opacity={0.5} />
    </lineSegments>
  );
}

export default CommandScene;
