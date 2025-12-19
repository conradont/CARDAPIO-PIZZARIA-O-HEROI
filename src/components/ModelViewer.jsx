import React, {
  Suspense,
  useMemo,
  useMemo as useReactMemo,
  useRef,
  useEffect,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Componente para carregar modelo GLB dinâmico
function DynamicModel({ modelPath, visible }) {
  const gltf = useGLTF(modelPath);

  // Clonar a cena para evitar problemas de referência compartilhada
  const clonedScene = useMemo(() => {
    return gltf.scene.clone();
  }, [gltf.scene]);

  // Escala ajustada para zoom médio
  const scale = 9;
  // Leve ajuste visual no eixo Y
  const position = [0, -0.35, 0];

  if (!visible) return null;

  return (
    <primitive
      object={clonedScene}
      scale={scale}
      position={position}
      visible={visible}
    />
  );
}

// Componente principal do visualizador
function ModelViewer({ selectedModel, compact = false }) {
  const height = compact ? "200px" : "500px";
  // Carrega enquadramento salvo pelo usuário
  const saved = useReactMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(window.localStorage.getItem("viewerCam") || "null");
    } catch {
      return null;
    }
  }, []);

  if (!selectedModel) {
    return (
      <div
        style={{
          width: "100%",
          height: height,
          position: "relative",
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#666" }}>Selecione um modelo</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: height, position: "relative" }}>
      <Canvas
        camera={{
          position: saved && saved.position ? saved.position : [0, 0, 2.2],
          fov: saved && saved.fov ? saved.fov : 40,
        }}
        style={{ background: "#1a1a1a" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <DynamicModel
            modelPath="/super_burguer.glb"
            visible={selectedModel === "/super_burguer.glb"}
          />
          <DynamicModel
            modelPath="/quarteto_fantastico.glb"
            visible={selectedModel === "/quarteto_fantastico.glb"}
          />
          <DynamicModel
            modelPath="/Duplo_Cheddar_Bacon.glb"
            visible={selectedModel === "/Duplo_Cheddar_Bacon.glb"}
          />
          <DynamicModel
            modelPath="/X_Frango.glb"
            visible={selectedModel === "/X_Frango.glb"}
          />
          <DynamicModel
            modelPath="/X_Bacon.glb"
            visible={selectedModel === "/X_Bacon.glb"}
          />
          <DynamicModel
            modelPath="/X_Calabresa.glb"
            visible={selectedModel === "/X_Calabresa.glb"}
          />
          <DynamicModel
            modelPath="/X_Presunto.glb"
            visible={selectedModel === "/X_Presunto.glb"}
          />
          <DynamicModel
            modelPath="/X_Egg.glb"
            visible={selectedModel === "/X_Egg.glb"}
          />
          <DynamicModel
            modelPath="/X_Burguer.glb"
            visible={selectedModel === "/X_Burguer.glb"}
          />
          <DynamicModel
            modelPath="/Autobot.glb"
            visible={selectedModel === "/Autobot.glb"}
          />
          <PersistedControls saved={saved} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ModelViewer;

// Controles com persistência de câmera/target
function PersistedControls({ saved }) {
  const controlsRef = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;
    // aplica target salvo
    if (saved && saved.target && Array.isArray(saved.target)) {
      controlsRef.current.target.set(
        saved.target[0],
        saved.target[1],
        saved.target[2]
      );
      controlsRef.current.update();
    }
  }, [saved]);

  const handleEnd = () => {
    if (!controlsRef.current) return;
    const camPos = camera.position.toArray();
    const target = controlsRef.current.target.toArray();
    const payload = { position: camPos, target, fov: camera.fov };
    try {
      window.localStorage.setItem("viewerCam", JSON.stringify(payload));
    } catch {}
  };

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={1.4}
      maxDistance={5}
      zoomSpeed={0.85}
      enableDamping
      dampingFactor={0.08}
      target={[0, 0, 0]}
      onEnd={handleEnd}
    />
  );
}
