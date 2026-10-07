import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Radar, RotateCcw } from "lucide-react";

/**
 * 3D Drone Scene
 * Featuring the Aevion Autonomous LiDAR Drone model from drone.riotters.com
 */
function CommandScene() {
  const [lidarActive, setLidarActive] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const dragRef = useRef({ isDragging: false, prevX: 0, prevY: 0, rotX: 0.15, rotY: -0.35 });

  const handlePointerDown = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.prevX = e.clientX;
    dragRef.current.prevY = e.clientY;
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.prevX;
    const dy = e.clientY - dragRef.current.prevY;
    dragRef.current.prevX = e.clientX;
    dragRef.current.prevY = e.clientY;
    dragRef.current.rotY += dx * 0.008;
    dragRef.current.rotX += dy * 0.008;
    dragRef.current.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, dragRef.current.rotX));
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  const resetView = () => {
    dragRef.current.rotX = 0.15;
    dragRef.current.rotY = -0.35;
    setAutoRotate(false);
  };

  return (
    <div
      className="relative h-full w-full cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0.6, 1.4, 6.2], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 22]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 9, 5]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-5, 4, -3]} intensity={1.5} color="#00D4FF" />
        <pointLight position={[-4, 3, 2]} color="#00D4FF" intensity={3.5} />
        <pointLight position={[4, -2, 3]} color="#7C3AED" intensity={2.2} />
        <pointLight position={[0, -2, 0]} color="#00FFC2" intensity={lidarActive ? 3.0 : 0.6} />

        <Suspense fallback={null}>
          <DroneRig lidarActive={lidarActive} autoRotate={autoRotate} dragRef={dragRef} />
        </Suspense>

        <ParticleField />
        <LidarGround lidarActive={lidarActive} />
      </Canvas>

      {/* Drone Telemetry HUD Overlay */}
      <div className="pointer-events-none absolute bottom-6 right-4 z-20 flex flex-col items-end gap-3 sm:right-8">
        <div className="flex items-center gap-2 rounded-full border border-electric/40 bg-black/60 px-3.5 py-1.5 backdrop-blur-md text-xs font-mono tracking-wider text-electric shadow-glow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          <span>AEVION LIDAR DRONE // SYS ONLINE</span>
        </div>

        {/* Controls */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 p-1.5 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setLidarActive(!lidarActive)}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition ${
              lidarActive ? "bg-electric/20 text-electric border border-electric/40" : "text-white/60 hover:text-white"
            }`}
            title="Toggle LiDAR laser scan"
          >
            <Radar size={13} className={lidarActive ? "animate-spin" : ""} />
            LiDAR {lidarActive ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition ${
              autoRotate ? "bg-mint/20 text-mint border border-mint/40" : "text-white/60 hover:text-white"
            }`}
            title="Toggle 360 degree rotation"
          >
            <RotateCcw size={13} />
            360° {autoRotate ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={resetView}
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-mono text-white/50 hover:text-white transition"
            title="Reset view"
          >
            Reset
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-white/45 tracking-wider bg-black/40 px-3 py-1 border border-white/5 rounded">
          <span>ALT: 120M</span>
          <span>•</span>
          <span>SPEED: 4,520 RPM</span>
          <span>•</span>
          <span>ACC: ±2CM</span>
          <span>•</span>
          <span className="text-electric">DRAG TO ROTATE 3D</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Drone Assembly with DRACO Decompression
 */
function DroneRig({ lidarActive, autoRotate, dragRef }) {
  const groupRef = useRef();
  const motorsRef = useRef([]);
  const [droneScene, setDroneScene] = useState(null);
  const { scene: threeScene } = useThree();

  // Load environment reflection map
  useEffect(() => {
    const texLoader = new THREE.TextureLoader();
    const loadEnv = (url) => {
      texLoader.load(
        url,
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          threeScene.environment = texture;
        },
        undefined,
        () => {
          if (url === "/drone/drone-env.jpg") {
            loadEnv("https://drone.riotters.com/drone/drone-env.jpg");
          }
        }
      );
    };
    loadEnv("/drone/drone-env.jpg");
  }, [threeScene]);

  // Load GLB with Draco decompression
  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    // Try local draco first, fallback to google cdn
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const onModelLoaded = (gltf) => {
      const root = gltf.scene;

      // Center geometry around origin
      const box = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      root.position.sub(center);

      // Scale model
      root.scale.setScalar(0.086);

      // Register spinning propeller assemblies
      const motorNodes = [];
      root.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.envMapIntensity = 1.4;
            child.material.needsUpdate = true;
          }
        }

        const name = child.name || "";
        if (
          name.includes("FL_Motor_1") ||
          name.includes("FR_Motor_1") ||
          name.includes("RL_Motor") ||
          name.includes("RR_Motor_1") ||
          name.includes("FL_Propeller") ||
          name.includes("FR_Propeller") ||
          name.includes("RL_Propeller") ||
          name.includes("RR_Propeller")
        ) {
          const isCCW = name.includes("FL") || name.includes("RR");
          motorNodes.push({ object: child, isCCW, name });
        }
      });

      motorsRef.current = motorNodes;
      setDroneScene(root);
    };

    const loadDrone = (url) => {
      loader.load(
        url,
        onModelLoaded,
        undefined,
        (err) => {
          console.warn("Local drone load warning, trying remote source:", err);
          if (url === "/drone/drone.glb") {
            // Also switch draco decoder path to CDN as backup
            dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
            loadDrone("https://drone.riotters.com/drone/drone.glb");
          }
        }
      );
    };

    loadDrone("/drone/drone.glb");

    return () => {
      dracoLoader.dispose();
    };
  }, []);

  // Propeller spin + flight hovering + mouse attitude physics
  useFrame(({ clock, mouse }, delta) => {
    const time = clock.elapsedTime;

    // Spin propellers at 75 rad/s
    if (motorsRef.current.length > 0) {
      const speed = 75.4;
      motorsRef.current.forEach((motor) => {
        if (motor.object) {
          const dir = motor.isCCW ? 1 : -1;
          motor.object.rotation.y += dir * speed * delta;
        }
      });
    }

    if (!groupRef.current) return;

    // Hover turbulence
    const hoverY = Math.sin(time * 1.5) * 0.08 + Math.cos(time * 2.8) * 0.02;
    const hoverRoll = Math.sin(time * 1.1) * 0.02;
    const hoverPitch = Math.cos(time * 0.9) * 0.025;

    // Mouse follow banking
    const mouseRoll = -mouse.x * 0.12;
    const mousePitch = -mouse.y * 0.09;
    const mouseYaw = mouse.x * 0.18;

    // Auto rotate
    if (autoRotate) {
      dragRef.current.rotY += delta * 0.45;
    }

    const currentDrag = dragRef.current;

    // Position
    const targetX = 0.85 + mouse.x * 0.15;
    const targetY = 0.2 + hoverY - mouse.y * 0.1;
    const targetZ = 0;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.04);

    // Rotation
    const targetRotX = mousePitch + hoverPitch + currentDrag.rotX;
    const targetRotY = mouseYaw + currentDrag.rotY;
    const targetRotZ = mouseRoll + hoverRoll;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.06);
  });

  return (
    <group ref={groupRef} position={[0.85, 0.2, 0]}>
      {droneScene && <primitive object={droneScene} />}
      {lidarActive && <LidarProjector />}
    </group>
  );
}

/**
 * Animated LiDAR Scanner Beam projecting downward
 */
function LidarProjector() {
  const coneRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coneRef.current) {
      coneRef.current.rotation.y = t * 2.5;
      coneRef.current.material.opacity = 0.16 + Math.sin(t * 8) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 1.5;
      const scale = 1 + (t % 1.2) * 0.8;
      ringRef.current.scale.set(scale, scale, 1);
      ringRef.current.material.opacity = Math.max(0, 1 - (t % 1.2) / 1.2);
    }
  });

  return (
    <group position={[0, -0.35, 0]}>
      <mesh ref={coneRef} position={[0, -1.3, 0]}>
        <coneGeometry args={[1.65, 2.6, 32, 1, true]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={1.8}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>

      <mesh ref={ringRef} position={[0, -2.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.35, 32]} />
        <meshBasicMaterial color="#00FFC2" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      <pointLight position={[0, -0.2, 0]} color="#00D4FF" intensity={2.5} distance={4} />
    </group>
  );
}

/**
 * Holographic Ground Grid & Radar Ring System
 */
function LidarGround({ lidarActive }) {
  const radarSweepRef = useRef();

  useFrame(({ clock }) => {
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = clock.elapsedTime * 1.8;
    }
  });

  return (
    <group position={[0.85, -2.4, 0]}>
      <gridHelper args={[16, 24, "#00D4FF", "#112635"]} />

      {[1.2, 2.4, 3.8, 5.2].map((radius, i) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.02, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00D4FF" : "#00FFC2"}
            transparent
            opacity={lidarActive ? 0.35 - i * 0.06 : 0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {lidarActive && (
        <group ref={radarSweepRef} rotation={[Math.PI / 2, 0, 0]}>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, 5.2, 0, 0])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00FFC2" transparent opacity={0.7} />
          </lineSegments>
        </group>
      )}
    </group>
  );
}

/**
 * Ambient background star / particle field
 */
function ParticleField() {
  const pointsRef = useRef();
  const particles = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial transparent color="#00D4FF" size={0.024} sizeAttenuation depthWrite={false} opacity={0.45} />
    </points>
  );
}

export default CommandScene;
