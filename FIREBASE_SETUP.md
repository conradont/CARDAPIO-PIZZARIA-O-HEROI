# 🔥 Guia de Configuração do Firebase

Este guia explica passo a passo como configurar o Firebase no seu app React.

## 📋 Pré-requisitos

- Conta Google (para acessar o Firebase Console)
- Projeto React já criado

---

## 🚀 Passo 1: Criar um Projeto no Firebase Console

1. **Acesse o Firebase Console**
   - Vá para [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Faça login com sua conta Google

2. **Adicionar um Novo Projeto**
   - Clique em "Adicionar projeto" ou "Add project"
   - Digite um nome para o projeto (ex: "o-heroi-pizzaria")
   - Clique em "Continuar" ou "Continue"

3. **Configurar Google Analytics (Opcional)**
   - Você pode desabilitar o Google Analytics se não precisar
   - Ou deixar ativado se quiser análises
   - Clique em "Continuar" ou "Continue"

4. **Aguardar a Criação do Projeto**
   - Aguarde alguns segundos enquanto o projeto é criado
   - Clique em "Continuar" ou "Continue" quando aparecer "Seu projeto está pronto"

---

## 🗄️ Passo 2: Criar o Banco de Dados Firestore

1. **Acessar o Firestore**
   - No menu lateral esquerdo, clique em "Firestore Database"
   - Clique em "Criar banco de dados"

2. **Escolher Modo de Segurança**
   - Selecione **"Modo de teste"** (para desenvolvimento)
   - Isso permitirá leitura/escrita durante 30 dias
   - Clique em "Próximo"

3. **Escolher a Localização**
   - Selecione a região mais próxima (ex: us-east1, southamerica-east1)
   - Clique em "Habilitar"

4. **Aguardar a Configuração**
   - Aguarde o banco de dados ser configurado
   - Pode levar alguns minutos

---

## 📱 Passo 3: Registrar o App Web no Firebase

1. **Adicionar App Web**
   - No painel do projeto, clique no ícone `</>` (Web)
   - Ou vá em "Configurações do projeto" > "Adicionar app"

2. **Configurar o App**
   - Registre um apelido para o app (ex: "O Herói Web")
   - Marque a opção "Configurar também o Firebase Hosting" (opcional)
   - Clique em "Registrar app"

3. **Copiar as Credenciais**
   - Você verá um código JavaScript com as configurações
   - **IMPORTANTE:** Copie essas configurações! Elas serão necessárias no próximo passo

   Exemplo de configuração:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "seu-projeto.firebaseapp.com",
     projectId: "seu-projeto",
     storageBucket: "seu-projeto.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

---

## 🔧 Passo 4: Configurar o Firebase no Código

1. **Editar o Arquivo de Configuração**
   - Abra o arquivo `src/firebase/config.js`
   - Substitua os valores de exemplo pelas SUAS credenciais:

   ```javascript
   const firebaseConfig = {
     apiKey: "COLE_SUA_API_KEY_AQUI",
     authDomain: "SEU_AUTH_DOMAIN_AQUI",
     projectId: "SEU_PROJECT_ID_AQUI",
     storageBucket: "SEU_STORAGE_BUCKET_AQUI",
     messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
     appId: "SEU_APP_ID_AQUI"
   };
   ```

2. **Salvar o Arquivo**
   - Salve o arquivo `config.js`

---

## 🔒 Passo 5: Configurar Regras de Segurança do Firestore

1. **Acessar Regras de Segurança**
   - No menu Firestore Database, clique na aba "Regras"
   
2. **Editar as Regras**
   - Cole o seguinte código:
   
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Permitir leitura e escrita para qualquer pessoa
       // ATENÇÃO: Isso é apenas para desenvolvimento!
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   
   ⚠️ **IMPORTANTE:** Estas regras permitem acesso total a qualquer pessoa. 
   São apenas para desenvolvimento. Para produção, você deve implementar 
   autenticação e regras mais restritivas.

3. **Publicar as Regras**
   - Clique em "Publicar"

---

## ✅ Passo 6: Testar a Conexão

1. **Iniciar o App**
   ```bash
   npm run dev
   ```

2. **Testar o Sistema de Avaliações**
   - Clique em um produto
   - Clique em "Avaliações"
   - Adicione uma avaliação de teste
   - Verifique se os dados aparecem no Firebase Console

3. **Verificar no Firebase Console**
   - Vá para Firestore Database
   - Você deve ver uma coleção chamada `ratings`
   - Os dados da avaliação devem aparecer lá

---

## 🎯 Estrutura de Dados

O sistema criará automaticamente a seguinte estrutura no Firestore:

```
ratings (coleção)
  └── [documento único]
      ├── productId: "bolo_cenoura"
      ├── author: "João Silva"
      ├── stars: 5
      ├── date: "15 de dezembro de 2024"
      ├── comment: "Muito bom!"
      └── timestamp: "2024-12-15T10:30:00.000Z"
```

---

## 🐛 Solução de Problemas

### Erro: "Permission denied"
- Verifique se as regras do Firestore estão corretas
- Certifique-se de ter publicado as regras

### Erro: "Firebase not initialized"
- Verifique se substituiu todas as credenciais no arquivo `config.js`
- Certifique-se de ter instalado o Firebase: `npm install firebase`

### Não consigo ver os dados
- Verifique a aba "Regras" do Firestore
- Verifique o console do navegador para erros

### Erro de CORS
- É um problema comum em desenvolvimento
- Certifique-se de que está usando as credenciais corretas
- Limpe o cache do navegador

---

## 🔐 Próximos Passos (Produção)

Para usar em produção, você deve:

1. **Implementar Autenticação**
   - Adicionar login de usuários
   - Modificar as regras do Firestore para exigir autenticação

2. **Regras de Segurança Avançadas**
   ```javascript
   match /ratings/{ratingId} {
     allow read: if request.auth != null;
     allow write: if request.auth != null;
   }
   ```

3. **Monitoramento**
   - Usar o Firebase Analytics
   - Configurar alertas

---

## 📚 Recursos Úteis

- [Documentação oficial do Firebase](https://firebase.google.com/docs)
- [Guia de Firestore](https://firebase.google.com/docs/firestore)
- [Guia de Regras de Segurança](https://firebase.google.com/docs/firestore/security/get-started)

---

## ✅ Checklist

- [ ] Projeto criado no Firebase Console
- [ ] Banco de dados Firestore criado
- [ ] App web registrado
- [ ] Credenciais copiadas e configuradas no código
- [ ] Regras de segurança configuradas
- [ ] App testado e funcionando
- [ ] Dados aparecendo no Firebase Console

---

**🎉 Parabéns! Seu app está conectado ao Firebase!**


