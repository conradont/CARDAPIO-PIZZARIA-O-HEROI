# Script de Geração Automática de Lista de Modelos

Este script Node.js lê automaticamente todos os arquivos `.glb` da pasta `public` e gera um arquivo JSON com a lista dos modelos disponíveis.

## Como usar

### 1. Executar o script
```bash
npm run generate-models
```

### 2. O que o script faz
- Lê todos os arquivos da pasta `public`
- Filtra apenas arquivos com extensão `.glb`
- Gera um arquivo `src/models.json` com a estrutura:
```json
{
  "models": [
    {
      "name": "nome_do_modelo",
      "file": "nome_do_modelo.glb",
      "path": "/nome_do_modelo.glb"
    }
  ]
}
```

### 3. Como usar no React
```javascript
import modelsList from './models.json';

// Acessar a lista de modelos
modelsList.models.forEach(model => {
  console.log(`Modelo: ${model.name}`);
  console.log(`Arquivo: ${model.file}`);
  console.log(`Caminho: ${model.path}`);
});
```

## Vantagens

✅ **Automático**: Não precisa mais listar modelos manualmente  
✅ **Dinâmico**: Detecta novos modelos automaticamente  
✅ **Consistente**: Sempre gera a mesma estrutura  
✅ **Fácil**: Um comando só (`npm run generate-models`)  

## Quando executar

Execute o script sempre que:
- Adicionar novos arquivos `.glb` na pasta `public`
- Remover arquivos `.glb` da pasta `public`
- Renomear arquivos `.glb` na pasta `public`

## Estrutura do projeto

```
projeto/
├── public/
│   ├── modelo1.glb
│   ├── modelo2.glb
│   └── ...
├── scripts/
│   └── generate-models-list.js
├── src/
│   └── models.json (gerado automaticamente)
└── package.json
```
