import { ref } from "vue";

const currentLang = ref(
  localStorage.getItem("s2k_lang") ||
    (typeof navigator !== "undefined" &&
    navigator.language &&
    navigator.language.toLowerCase().startsWith("pt")
      ? "pt"
      : "en"),
);

const messages = {
  pt: {
    nav: {
      brand: "Send to Kindle Fixer",
      tagline: "Reparador de EPUB",
      sendToKindle: "Amazon Send to Kindle",
      github: "GitHub",
      toggleTheme: "Alternar tema claro/escuro",
      switchLang: "Mudar para Inglês (EN)",
    },
    hero: {
      badge: "100% no Navegador • Seguro & Privado",
      titlePrefix: "Seus e-books perfeitos no ",
      titleHighlight: "Kindle",
      titleSuffix: "sem caracteres corrompidos.",
      subtitle:
        "Corrija na hora problemas de codificação UTF-8, caracteres estranhos como â€œ, links quebrados e metadados que fazem a Amazon recusar seus arquivos EPUB.",
      dropTitle: "Arraste seus arquivos .epub aqui",
      dropSubtitle: "ou clique para navegar no seu dispositivo",
      dropActive: "Solte os arquivos agora para iniciar!",
      multipleHint: "Suporta múltiplos arquivos simultâneos",
      privacyBadge:
        "Processamento 100% local — nenhum arquivo é enviado para servidores",
      selectFilesBtn: "Escolher arquivos .epub",
    },
    process: {
      title: "Arquivos Processados",
      processingAll: "Processando arquivos...",
      processingItem: "Processando...",
      doneAll: "Todos os arquivos foram processados com sucesso!",
      downloadAll: "Baixar todos em .zip",
      clearAll: "Limpar lista",
      preparingZip: "Compactando arquivos .zip...",
      fixedTitle: "Corrigido",
      repackedTitle: "Repacotado (Sem erros detectados)",
      errorTitle: "Erro no processamento",
      fixesApplied: "correções realizadas",
      noErrorsDetected:
        "Nenhum erro conhecido detectado. O arquivo foi repacotado com segurança e está disponível para download.",
      sysError:
        "Ocorreu uma falha ao ler ou reconstruir este EPUB. O arquivo pode estar corrompido ou protegido por DRM.",
      downloadSingle: "Baixar EPUB",
      showDetails: "Ver correções detalhadas",
      hideDetails: "Ocultar detalhes",
      recheckTip:
        "Envie para o Send to Kindle da Amazon para testar a leitura.",
    },
    langModal: {
      title: "Idioma do E-book Necessário",
      desc: 'O arquivo "{filename}" não possui tag de idioma definida ou o idioma atual ({lang}) não é suportado pelo Kindle. Escolha o idioma correto:',
      commonLangs: "Idiomas sugeridos:",
      customLabel:
        "Ou digite o código de idioma RFC 5646 (ex: pt, pt-BR, en, es):",
      confirm: "Confirmar e continuar",
      fallback: "Usar padrão (Inglês - en)",
      langs: {
        pt: "Português (pt)",
        "pt-BR": "Português Brasil (pt-BR)",
        en: "Inglês (en)",
        es: "Espanhol (es)",
        fr: "Francês (fr)",
        de: "Alemão (de)",
        it: "Italiano (it)",
      },
    },
    howItWorks: {
      badge: "Fluxo Simples",
      title: "Como funciona?",
      subtitle:
        "Três etapas rápidas para ter seus livros lendo perfeitamente no Kindle",
      step1Title: "1. Selecione seus EPUBs",
      step1Desc:
        "Arraste um ou mais arquivos .epub para a área de upload. O app aceita arquivos individuais ou lotes.",
      step2Title: "2. Reparo Automático",
      step2Desc:
        "Nosso algoritmo insere cabeçalhos UTF-8, remove âncoras inválidas de body, limpa tags órfãs e valida o idioma.",
      step3Title: "3. Envie para o Kindle",
      step3Desc:
        "Baixe os arquivos corrigidos e envie direto pelo serviço oficial da Amazon (web, app ou e-mail).",
    },
    fixes: {
      badge: "Diagnóstico & Reparo",
      title: "Quais problemas esta ferramenta corrige?",
      subtitle:
        "Entenda os erros mais comuns que ocorrem na conversão do Send to Kindle",
      issue1Title: "Codificação UTF-8 Ausente",
      issue1Desc:
        "Muitos geradores omitem a declaração XML de encoding. Sem ela, a Amazon assume Latin-1/ISO-8859-1, gerando caracteres estranhos como â€œ, Ã£ e Ã©.",
      issue2Title: "Links de Âncora no Body (#bodyID)",
      issue2Desc:
        "Quando o índice do livro aponta para âncoras dentro da tag <body>, o conversor da Amazon se perde e rejeita o e-book com erro de entrega.",
      issue3Title: "Idioma Ausente ou Não Suportado",
      issue3Desc:
        "O serviço Send to Kindle exige tags de idioma válidas nos metadados OPF. Esta ferramenta detecta e corrige tags faltantes.",
      issue4Title: 'Tags de Imagens Órfãs sem "src"',
      issue4Desc:
        "Tags <img> vazias ou corrompidas no código HTML original causam travamentos na conversão. Nós as removemos com segurança.",
    },
    privacy: {
      badge: "Privacidade Total",
      title: "Seus arquivos nunca saem do seu computador",
      subtitle:
        "Segurança absoluta: todo o processamento é executado no seu navegador",
      desc: "Diferente de conversores online convencionais, o Send to Kindle Fixer roda 100% via JavaScript no seu próprio dispositivo utilizando a API zip.js. Seus livros, documentos e dados pessoais não são enviados para nenhum servidor ou terceiro.",
      card1Title: "Zero Upload para Servidores",
      card1Desc: "Nenhum byte de texto ou capa é transmitido pela internet.",
      card2Title: "Rápido & Offline",
      card2Desc: "Sem filas de espera. O reparo é praticamente instantâneo.",
      card3Title: "Código Aberto",
      card3Desc:
        "Transparência total com código auditável hospedado no GitHub.",
    },
    faq: {
      badge: "Dúvidas",
      title: "Perguntas Frequentes",
      q1: 'Por que o Kindle mostra caracteres como "â€œ" no lugar de aspas e travessões?',
      a1: 'Isso acontece devido a um conflito de encoding chamado "mojibake". O arquivo de texto está em UTF-8, mas não declara isso no cabeçalho XML. O conversor da Amazon então assume ISO-8859-1 (Latin-1), interpretando cada byte de forma errônea.',
      q2: "Por que a Amazon envia um e-mail dizendo que não conseguiu entregar o documento?",
      a2: "Geralmente acontece por causa de hiperlinks quebrados que apontam para o identificador da tag <body> no XHTML, metadados de idioma ausentes ou tags de mídia corrompidas. Esta ferramenta corrige exatamente esses pontos críticos.",
      q3: "A ferramenta altera a formatação visual ou texto do livro?",
      a3: "Não. O conteúdo textual, estilos CSS, capítulos e imagens permanecem exatamente como no arquivo original. Apenas as diretivas estruturais de conformidade são consertadas.",
      q4: "Onde encontro o serviço oficial Send to Kindle da Amazon?",
      a4: "Você pode enviar diretamente pelo navegador acessando amazon.com/sendtokindle, pelo aplicativo oficial Kindle para PC/Mac ou pelo seu endereço de e-mail Kindle autorizado.",
    },
    footer: {
      disclaimer:
        "Send to Kindle Fixer é uma ferramenta independente de código aberto. Não possui afiliação, patrocínio ou endosso da Amazon.com, Inc. ou de suas marcas.",
      madeWith: "Desenvolvido com Vue 3, Tailwind CSS.",
      githubLink: "Repositório no GitHub",
      amazonLink: "Acessar Amazon Send to Kindle",
    },
  },
  en: {
    nav: {
      brand: "Send to Kindle Fixer",
      tagline: "EPUB Repair Tool",
      sendToKindle: "Amazon Send to Kindle",
      github: "GitHub",
      toggleTheme: "Toggle light/dark theme",
      switchLang: "Mudar para Português (PT-BR)",
    },
    hero: {
      badge: "100% In-Browser • Safe & Private",
      titlePrefix: "Flawless e-books on your ",
      titleHighlight: "Kindle",
      titleSuffix: "without encoding artifacts.",
      subtitle:
        "Instantly fix missing UTF-8 declarations, corrupted characters like â€œ, broken hyperlinks, and invalid metadata that cause Amazon to reject or scramble your EPUBs.",
      dropTitle: "Drag & drop your .epub files here",
      dropSubtitle: "or click to browse from your device",
      dropActive: "Drop files now to start fixing!",
      multipleHint: "Supports multiple files simultaneously",
      privacyBadge:
        "100% client-side processing — no files are uploaded to any server",
      selectFilesBtn: "Select .epub files",
    },
    process: {
      title: "Processed Files",
      processingAll: "Processing files...",
      processingItem: "Processing...",
      doneAll: "All files have been successfully processed!",
      downloadAll: "Download all as .zip",
      clearAll: "Clear list",
      preparingZip: "Compressing .zip archive...",
      fixedTitle: "Fixed",
      repackedTitle: "Repacked (No known errors)",
      errorTitle: "Processing Error",
      fixesApplied: "fixes applied",
      noErrorsDetected:
        "No known issues detected. The EPUB has been cleanly repacked and is available for download.",
      sysError:
        "An error occurred while reading or rebuilding this EPUB. The file might be corrupted or DRM-protected.",
      downloadSingle: "Download EPUB",
      showDetails: "Show detailed fixes",
      hideDetails: "Hide details",
      recheckTip:
        "Send to Amazon Send to Kindle to verify your reading experience.",
    },
    langModal: {
      title: "Book Language Required",
      desc: 'The file "{filename}" lacks a valid language tag or the current language ({lang}) is not supported by Kindle. Please pick a supported language:',
      commonLangs: "Suggested languages:",
      customLabel: "Or enter RFC 5646 code (e.g. en, pt, es, fr):",
      confirm: "Confirm and continue",
      fallback: "Use default (English - en)",
      langs: {
        en: "English (en)",
        pt: "Portuguese (pt)",
        "pt-BR": "Portuguese Brazil (pt-BR)",
        es: "Spanish (es)",
        fr: "French (fr)",
        de: "German (de)",
        it: "Italian (it)",
      },
    },
    howItWorks: {
      badge: "Easy Workflow",
      title: "How does it work?",
      subtitle:
        "Three simple steps to read your favorite books smoothly on Kindle",
      step1Title: "1. Select your EPUBs",
      step1Desc:
        "Drag and drop one or multiple .epub files with font or encoding issues into the upload zone.",
      step2Title: "2. Instant Automatic Repair",
      step2Desc:
        "Our engine adds missing UTF-8 headers, repairs body ID anchors, cleans orphan tags, and validates metadata.",
      step3Title: "3. Send to your Kindle",
      step3Desc:
        "Download your repaired books and deliver them via Amazon Send to Kindle (web page, app, or email).",
    },
    fixes: {
      badge: "Diagnostic & Repair",
      title: "What issues does this tool fix?",
      subtitle:
        "The 4 most common causes behind Kindle rejection and formatting bugs",
      issue1Title: "Missing UTF-8 Declaration",
      issue1Desc:
        "When XML files omit explicit encoding headers, Amazon assumes ISO-8859-1 (Latin-1), producing garbled symbols like â€œ, Ã¡, and Ã©.",
      issue2Title: "Body ID Hyperlink Anchors (#bodyID)",
      issue2Desc:
        "When the NCX table of contents links to <body> tags with ID hash anchors, Amazon's engine trips and rejects the document entirely.",
      issue3Title: "Missing or Invalid Language Metadata",
      issue3Desc:
        "Amazon Send to Kindle requires a valid language tag in the OPF metadata. We detect missing or unsupported tags and allow setting the proper RFC 5646 code.",
      issue4Title: 'Orphan Image Tags without "src"',
      issue4Desc:
        "Corrupted or empty <img> tags in the original source code cause parser failures. We cleanly remove them without altering valid content.",
    },
    privacy: {
      badge: "Total Privacy",
      title: "Your files never leave your device",
      subtitle:
        "Absolute security: all operations run directly in your web browser",
      desc: "Unlike traditional online converters, Send to Kindle Fixer runs 100% via client-side JavaScript using the zip.js API. Your books, private documents, and personal reading materials are never sent to any server.",
      card1Title: "Zero Server Uploads",
      card1Desc:
        "No byte of text, cover, or file content is ever transmitted across the network.",
      card2Title: "Fast & Private",
      card2Desc:
        "No waiting in queue. File repairs are virtually instantaneous.",
      card3Title: "Open Source",
      card3Desc:
        "Fully transparent with publicly auditable source code on GitHub.",
    },
    faq: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      q1: 'Why does Kindle display strange symbols like "â€œ" instead of quotes and dashes?',
      a1: 'This is a character encoding mismatch known as "mojibake". The underlying text is UTF-8 encoded, but lacks the XML declaration. Amazon assumes Latin-1, resulting in broken punctuation.',
      q2: "Why did Amazon send an email stating it could not deliver my document?",
      a2: "The most frequent culprits are unresolved body ID hyperlinks, missing language tags in OPF metadata, or malformed image tags. This tool automatically patches these exact flaws.",
      q3: "Does this modify book formatting or typography?",
      a3: "No. Book text, CSS stylesheets, chapters, fonts, and images are fully preserved. Only underlying structural standards are normalized.",
      q4: "Where can I find the official Send to Kindle service?",
      a4: "You can access Amazon's official web portal at amazon.com/sendtokindle, or use the official Kindle apps for PC, Mac, and mobile.",
    },
    footer: {
      disclaimer:
        "Send to Kindle Fixer is an independent open source utility. It is not affiliated, sponsored, or endorsed by Amazon.com, Inc. or the Kindle brand.",
      madeWith: "Built with Vue 3, Tailwind CSS.",
      githubLink: "View on GitHub",
      amazonLink: "Open Amazon Send to Kindle",
    },
  },
};

export function useI18n() {
  const t = (path, params = {}) => {
    const keys = path.split(".");
    let current = messages[currentLang.value] || messages.en;
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = messages.en;
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current === "string") {
      let str = current;
      for (const [pKey, pVal] of Object.entries(params)) {
        str = str.replaceAll(`{${pKey}}`, pVal);
      }
      return str;
    }
    return current;
  };

  const toggleLang = () => {
    currentLang.value = currentLang.value === "pt" ? "en" : "pt";
    localStorage.setItem("s2k_lang", currentLang.value);
  };

  const setLang = (lang) => {
    if (messages[lang]) {
      currentLang.value = lang;
      localStorage.setItem("s2k_lang", lang);
    }
  };

  return {
    currentLang,
    t,
    toggleLang,
    setLang,
  };
}
