# Como Adicionar Seu Próprio Modelo GLB

## 📁 Adicionando um Modelo GLB Personalizado

Para usar seu próprio modelo GLB na aplicação, siga estes passos:

### 1. Coloque o arquivo GLB na pasta `public`

```
public/
├── vite.svg
└── seu-modelo.glb  ← Seu arquivo aqui
```

### 2. Modifique o componente ModelViewer

Substitua o conteúdo de `src/components/ModelViewer.jsx` por:

```jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';

// Componente para carregar seu modelo GLB
function YourModel() {
  const { scene } = useGLTF('/seu-modelo.glb');
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

// Componente de loading
function LoadingFallback() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '18px'
    }}>
      Carregando modelo 3D...
    </div>
  );
}

// Componente de erro
function ErrorFallback({ error }) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'red',
      fontSize: '16px',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderRadius: '8px'
    }}>
      <h3>Erro ao carregar modelo</h3>
      <p>{error.message}</p>
    </div>
  );
}

// Componente principal do visualizador
function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: '#1a1a1a' }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <YourModel />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

export default ModelViewer;
```

### 3. Simplifique o App.jsx

Atualize `src/App.jsx` para:

```jsx
import ModelViewer from './components/ModelViewer'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Visualizador de Modelo 3D</h1>
        <p>Seu modelo GLB personalizado</p>
      </header>
      
      <main className="app-main">
        <div className="viewer-section">
          <ModelViewer />
        </div>
        
        <div className="controls-info">
          <h3>Controles:</h3>
          <ul>
            <li><strong>Botão esquerdo:</strong> Rotacionar modelo</li>
            <li><strong>Botão direito:</strong> Mover modelo</li>
            <li><strong>Scroll:</strong> Zoom in/out</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
```

## 🎨 Personalizações Adicionais

### Ajustar Tamanho do Modelo
```jsx
<primitive object={scene} scale={2} position={[0, 0, 0]} />
```

### Ajustar Posição
```jsx
<primitive object={scene} scale={1} position={[0, -1, 0]} />
```

### Adicionar Rotação Automática
```jsx
<primitive 
  object={scene} 
  scale={1} 
  position={[0, 0, 0]}
  rotation={[0, Math.PI / 4, 0]}
/>
```

### Múltiplos Modelos
Para carregar múltiplos modelos, você pode criar vários componentes:

```jsx
function Model1() {
  const { scene } = useGLTF('/modelo1.glb');
  return <primitive object={scene} position={[-2, 0, 0]} />;
}

function Model2() {
  const { scene } = useGLTF('/modelo2.glb');
  return <primitive object={scene} position={[2, 0, 0]} />;
}
```

## 📝 Dicas Importantes

1. **Tamanho do arquivo**: Mantenha os arquivos GLB pequenos para melhor performance
2. **Otimização**: Use ferramentas como gltf-pipeline para otimizar seus modelos
3. **Texturas**: Certifique-se de que as texturas estão incluídas no arquivo GLB
4. **Escala**: Ajuste a propriedade `scale` conforme necessário para seu modelo
5. **Iluminação**: Experimente diferentes configurações de luz para melhor visualização

## 🔧 Solução de Problemas

- **Modelo não aparece**: Verifique se o arquivo está na pasta `public` e o caminho está correto
- **Modelo muito grande/pequeno**: Ajuste a propriedade `scale`
- **Performance lenta**: Otimize o modelo ou reduza a qualidade das texturas
