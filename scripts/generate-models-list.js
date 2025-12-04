import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta public (relativo ao diretório do projeto)
const publicDir = path.join(__dirname, '..', 'public');

try {
  // Lê todos os arquivos da pasta public
  const files = fs.readdirSync(publicDir);
  
  // Filtra apenas arquivos .glb
  const glbFiles = files.filter(file => file.toLowerCase().endsWith('.glb'));
  
  // Cria o objeto com os modelos
  const modelsList = {
    models: glbFiles.map(file => ({
      name: path.parse(file).name, // Remove a extensão .glb
      file: file,
      path: `/${file}` // Caminho relativo para uso no React
    }))
  };
  
  // Gera o JSON formatado
  const jsonContent = JSON.stringify(modelsList, null, 2);
  
  // Salva o arquivo models.json na pasta src
  const outputPath = path.join(__dirname, '..', 'src', 'models.json');
  fs.writeFileSync(outputPath, jsonContent);
  
  console.log('✅ Lista de modelos gerada com sucesso!');
  console.log(`📁 Arquivo salvo em: ${outputPath}`);
  console.log(`📊 ${glbFiles.length} modelo(s) encontrado(s):`);
  
  glbFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  
} catch (error) {
  console.error('❌ Erro ao gerar lista de modelos:', error.message);
  process.exit(1);
}
