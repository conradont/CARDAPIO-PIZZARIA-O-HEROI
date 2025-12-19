import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

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

/**
 * Hook para pré-carregar modelos 3D em segundo plano
 * Prioriza modelos próximos ao modelo atual e carrega os demais progressivamente
 *
 * Usa fetch para pré-carregar os arquivos no cache do navegador,
 * tornando o carregamento via useGLTF muito mais rápido
 */
export function useModelPreloader(currentModel) {
  const preloadedRef = useRef(new Set());
  const timeoutRefs = useRef([]);

  useEffect(() => {
    // Limpar todos os timeouts anteriores
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Função para pré-carregar um modelo
    const preloadModel = (modelPath) => {
      if (preloadedRef.current.has(modelPath)) {
        return; // Já foi pré-carregado
      }

      // Marcar como pré-carregando para evitar duplicatas
      preloadedRef.current.add(modelPath);

      // Usar fetch para pré-carregar o arquivo no cache do navegador
      // Quando useGLTF for chamado, o arquivo já estará em cache
      fetch(modelPath)
        .then(() => {
          // Tentar usar useGLTF.preload se disponível (para cache interno do drei)
          try {
            if (useGLTF && typeof useGLTF.preload === "function") {
              useGLTF.preload(modelPath);
            }
          } catch (error) {
            // Ignorar erros - o fetch já colocou no cache do navegador
          }
        })
        .catch(() => {
          // Ignorar erros silenciosamente - o modelo será carregado quando necessário
        });
    };

    // Pré-carregar o modelo atual imediatamente (se ainda não foi)
    if (currentModel && !preloadedRef.current.has(currentModel)) {
      preloadModel(currentModel);
    }

    // Aguardar um pouco antes de começar a pré-carregar outros modelos
    // para não interferir com o carregamento do modelo atual
    const mainTimeout = setTimeout(() => {
      const currentIndex = ALL_MODELS.indexOf(currentModel);

      // Priorizar modelos próximos ao atual
      const priorityOrder = [];

      // Adicionar modelos próximos primeiro (antes e depois do atual)
      for (let i = 1; i < ALL_MODELS.length; i++) {
        const beforeIndex = currentIndex - i;
        const afterIndex = currentIndex + i;

        if (beforeIndex >= 0) {
          priorityOrder.push(ALL_MODELS[beforeIndex]);
        }
        if (afterIndex < ALL_MODELS.length) {
          priorityOrder.push(ALL_MODELS[afterIndex]);
        }
      }

      // Pré-carregar modelos próximos primeiro (com pequeno delay entre cada)
      priorityOrder.forEach((modelPath, index) => {
        if (modelPath !== currentModel) {
          const timeout = setTimeout(() => {
            preloadModel(modelPath);
          }, index * 150); // 150ms entre cada modelo para não sobrecarregar
          timeoutRefs.current.push(timeout);
        }
      });

      // Pré-carregar modelos restantes depois (com delay maior)
      ALL_MODELS.forEach((modelPath, index) => {
        if (modelPath !== currentModel && !priorityOrder.includes(modelPath)) {
          const timeout = setTimeout(() => {
            preloadModel(modelPath);
          }, priorityOrder.length * 150 + index * 250);
          timeoutRefs.current.push(timeout);
        }
      });
    }, 800); // Aguardar 800ms antes de começar pré-carregamento em background

    timeoutRefs.current.push(mainTimeout);

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, [currentModel]);
}
