# Correções para Tailwind CSS v4 no Vercel

## Problema Identificado

O erro ocorre porque o Tailwind CSS v4 mudou a forma como o plugin PostCSS funciona. O plugin foi movido para um pacote separado `@tailwindcss/postcss`.

## Correções Aplicadas

### 1. ✅ postcss.config.js

**ANTES:**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**DEPOIS:**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

### 2. ✅ src/index.css

**ANTES:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**DEPOIS:**

```css
@import "tailwindcss";

@theme {
  --color-fg-brand-primary: var(--fg-brand-primary, #fff);
  --color-text-secondary: var(--text-secondary, rgba(255, 255, 255, 0.7));
  --color-bg-tertiary: var(--bg-tertiary, rgba(255, 255, 255, 0.1));
}
```

### 3. ✅ package.json

Adicionada a dependência `@tailwindcss/postcss`:

```json
"devDependencies": {
  "@tailwindcss/postcss": "^4.1.18",
  // ... outras dependências
}
```

## Instruções de Instalação

### Passo 1: Instalar a dependência necessária

Execute no terminal:

```bash
npm install -D @tailwindcss/postcss@^4.1.18
```

Ou se preferir atualizar todas as dependências do Tailwind:

```bash
npm install -D @tailwindcss/postcss@^4.1.18 tailwindcss@^4.1.18
```

### Passo 2: Verificar dependências instaladas

Certifique-se de que você tem:

- ✅ `tailwindcss`: `^4.1.18`
- ✅ `@tailwindcss/postcss`: `^4.1.18`
- ✅ `postcss`: `^8.5.6`
- ✅ `autoprefixer`: `^10.4.23`

### Passo 3: Build local para testar

```bash
npm run build
```

Se o build local funcionar, o build no Vercel também funcionará.

## Arquivos Modificados

1. ✅ `postcss.config.js` - Atualizado para usar `@tailwindcss/postcss`
2. ✅ `src/index.css` - Atualizado para usar `@import "tailwindcss"` e `@theme`
3. ✅ `package.json` - Adicionada dependência `@tailwindcss/postcss`
4. ✅ `tailwind.config.js` - Mantido (ainda funciona no v4, mas opcional)

## Notas Importantes

- O `tailwind.config.js` ainda funciona no Tailwind v4, mas a forma recomendada é usar `@theme` no CSS (já implementado)
- As cores customizadas estão definidas tanto no `tailwind.config.js` quanto no `@theme` do CSS para máxima compatibilidade
- O Vercel detectará automaticamente as mudanças no `package.json` e instalará as dependências durante o build

## Verificação Final

Após instalar as dependências, verifique:

1. ✅ `npm run build` funciona localmente
2. ✅ O projeto compila sem erros
3. ✅ As classes do Tailwind funcionam corretamente
4. ✅ O build no Vercel será bem-sucedido
