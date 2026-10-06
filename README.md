# Send to Kindle Fixer 📖 ✨

Uma ferramenta moderna, elegante e 100% privada para reparar arquivos EPUB antes de enviá-los para o Amazon Kindle via [Send to Kindle](https://www.amazon.com/sendtokindle).

🌐 **Disponível online no Vercel**: [https://send-to-kindle-fixer.vercel.app](https://send-to-kindle-fixer.vercel.app)

---

## 🚀 Sobre o Projeto (About)

Ao utilizar o serviço **Send to Kindle** da Amazon para enviar e-books `.epub`, você pode se deparar com problemas graves de caracteres corrompidos (*mojibake*, como `â€œ` ou `Ã£`) ou até mesmo e-mails da Amazon recusando o arquivo com erro de entrega.

Isso acontece porque:
1. Muitos arquivos EPUB não incluem a declaração explícita de codificação UTF-8 no cabeçalho XML (`<?xml version="1.0" encoding="utf-8"?>`). A Amazon assume ISO-8859-1 (Latin-1) por padrão e corrompe a acentuação.
2. Hiperlinks no índice NCX que apontam para IDs na tag `<body>` (`#bodyID`) causam falha crítica no conversor da Amazon.
3. Metadados de idioma ausentes ou incompatíveis com a lista oficial da Amazon.
4. Tags `<img>` vazias sem o atributo `src`.

Esta aplicação resolve esses 4 problemas de forma rápida, automática e segura.

---

## ✨ Recursos & Melhorias da Versão 2.0

- ⚡ **Single Page Application moderna**: Construída com **Vue 3** (Composition API) e **Vite**.
- 🎨 **Design refinado**: Estilização completa com **Tailwind CSS**, tipografia apurada e ícones **Lucide**.
- 🌓 **Dark & Light Mode**: Alternância suave de temas claro e escuro com persistência local e detecção automática do sistema.
- 🌐 **Bilingue (PT-BR / EN)**: Interface completa em Português e Inglês com troca instantânea.
- 📥 **Drag & Drop Avançado**: Suporte a múltiplos arquivos EPUB em lote com feedback visual.
- 🔍 **Detalhamento das correções**: Visualização expansível de cada alteração aplicada em cada arquivo.
- 📦 **Download em lote (.zip)**: Baixe todos os EPUBs corrigidos de uma única vez.
- 🛡️ **100% no navegador (Zero servidor)**: Nenhum arquivo é enviado pela internet. Todo o descompactamento, correção e remontagem do ZIP ocorre na memória do seu navegador através da biblioteca `@zip.js/zip.js`.

---

## 🛠️ Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [@zip.js/zip.js](https://gildas-lormeau.github.io/zip.js/)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

---

## 💻 Como Rodar Localmente (Development)

Certifique-se de ter o [Node.js](https://nodejs.org/) (v18+) instalado:

```bash
# Instalar dependências
npm install

# Iniciar servidor local de desenvolvimento
npm run dev

# Gerar build de produção otimizado para deploy (Vercel, Netlify, GitHub Pages)
npm run build

# Pré-visualizar o build de produção localmente
npm run preview
```

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.
