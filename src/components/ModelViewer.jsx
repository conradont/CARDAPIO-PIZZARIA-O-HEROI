import React, {
  Suspense,
  useMemo,
  useMemo as useReactMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

// Componente de Loading
function LoadingSpinner() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(26, 26, 26, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <LoadingIndicator type="line-spinner" size="md" label="Loading..." />
    </div>
  );
}

// Componente para carregar modelo GLB dinâmico (otimizado - carrega apenas quando visível)
function DynamicModel({ modelPath, visible, onLoad }) {
  // useGLTF já faz cache automaticamente
  const gltf = useGLTF(modelPath);
  const hasNotified = useRef(false);

  // Clonar a cena para evitar problemas de referência compartilhada
  const clonedScene = useMemo(() => {
    if (!gltf?.scene) return null;
    return gltf.scene.clone();
  }, [gltf?.scene]);

  // Notificar quando o modelo estiver carregado e visível
  useEffect(() => {
    if (visible && onLoad && clonedScene && !hasNotified.current) {
      // Pequeno delay para garantir que o modelo está renderizado
      const timer = setTimeout(() => {
        onLoad();
        hasNotified.current = true;
      }, 100);
      return () => clearTimeout(timer);
    }
    if (!visible) {
      hasNotified.current = false;
    }
  }, [visible, onLoad, clonedScene]);

  // Escala ajustada para zoom médio
  const scale = 9;
  // Leve ajuste visual no eixo Y
  const position = [0, -0.35, 0];

  if (!visible || !clonedScene) return null;

  return (
    <primitive
      object={clonedScene}
      scale={scale}
      position={position}
      visible={visible}
    />
  );
}

// Lista de todos os modelos disponíveis
const ALL_MODELS = [
  "/super_burguer.glb",
  "/quarteto_fantastico.glb",
  "/Duplo_Cheddar_Bacon.glb",
  "/X_Frango.glb",
  "/X_Bacon.glb",
  "/X_Calabresa.glb",
  "/X_Presunto.glb",
  "/X_Egg.glb",
  "/X_Burguer.glb",
  "/Autobot.glb",
];

// Componente principal do visualizador (otimizado)
function ModelViewer({ selectedModel, compact = false }) {
  const height = compact ? "200px" : "500px";
  const [isLoading, setIsLoading] = useState(true);

  // Carrega enquadramento salvo pelo usuário
  const saved = useReactMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(window.localStorage.getItem("viewerCam") || "null");
    } catch {
      return null;
    }
  }, []);

  // Resetar loading quando o modelo mudar
  useEffect(() => {
    setIsLoading(true);
  }, [selectedModel]);

  const handleModelLoad = () => {
    setIsLoading(false);
  };

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

  // Renderizar apenas o modelo selecionado (muito mais eficiente)
  return (
    <div style={{ width: "100%", height: height, position: "relative" }}>
      {isLoading && <LoadingSpinner />}
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
          {/* Renderizar apenas o modelo selecionado */}
          {selectedModel && (
            <DynamicModel
              modelPath={selectedModel}
              visible={true}
              onLoad={handleModelLoad}
            />
          )}
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
