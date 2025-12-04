# Visualizador de Modelos 3D GLB

Uma aplicação React moderna para visualizar modelos 3D no formato GLB com controles interativos.

## 🚀 Funcionalidades

- **Upload de arquivos GLB**: Arraste e solte ou clique para selecionar arquivos GLB
- **Visualização 3D interativa**: Rotação, zoom e movimento com mouse
- **Interface moderna**: Design responsivo e intuitivo
- **Tratamento de erros**: Mensagens de erro amigáveis
- **Loading states**: Indicadores de carregamento

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool e servidor de desenvolvimento
- **Three.js**: Biblioteca para renderização 3D
- **React Three Fiber**: Integração React com Three.js
- **React Three Drei**: Utilitários para Three.js
- **React Error Boundary**: Tratamento de erros

## 📦 Instalação

1. Clone ou baixe o projeto
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 🎮 Como Usar

1. **Carregar um modelo**: 
   - Arraste e solte um arquivo GLB na área de upload
   - Ou clique na área para selecionar um arquivo

2. **Controles de visualização**:
   - **Botão esquerdo do mouse**: Rotacionar o modelo
   - **Botão direito do mouse**: Mover o modelo
   - **Scroll**: Zoom in/out

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ModelViewer.jsx    # Componente principal para exibir modelos 3D
│   └── FileUpload.jsx     # Componente para upload de arquivos
├── App.jsx               # Componente principal da aplicação
├── App.css              # Estilos da aplicação
├── index.css            # Estilos globais
└── main.jsx             # Ponto de entrada da aplicação
```

## 🔧 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria build de produção
- `npm run preview`: Visualiza o build de produção
- `npm run lint`: Executa o linter

## 📝 Formatos Suportados

- **GLB**: Formato binário do glTF (recomendado)

## 🎨 Personalização

Você pode personalizar a aplicação modificando:

- **Cores**: Edite as variáveis CSS em `src/App.css`
- **Controles**: Modifique os parâmetros do `OrbitControls` em `ModelViewer.jsx`
- **Iluminação**: Ajuste as luzes no componente `ModelViewer.jsx`

## 🐛 Solução de Problemas

### Modelo não carrega
- Verifique se o arquivo é um GLB válido
- Confirme que o arquivo não está corrompido
- Verifique o console do navegador para erros

### Performance lenta
- Use modelos com menos polígonos
- Otimize texturas antes de converter para GLB
- Considere usar LOD (Level of Detail) para modelos complexos

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.