import * as zip from '@zip.js/zip.js'

// Critical: Disable Web Workers to prevent bundling/asset-loading deadlocks in Vite
zip.configure({
  useWebWorkers: false
})

// Supported Kindle languages list (from Amazon KDP guidelines)
export const KINDLE_ALLOWED_LANGUAGES = [
  // ISO 639-1
  'af', 'gsw', 'ar', 'eu', 'nb', 'br', 'ca', 'zh', 'kw', 'co', 'da', 'nl', 'stq', 'en', 'fi', 'fr', 'fy', 'gl',
  'de', 'gu', 'hi', 'is', 'ga', 'it', 'ja', 'lb', 'mr', 'ml', 'gv', 'frr', 'nn', 'pl', 'pt', 'oc', 'rm',
  'sco', 'gd', 'es', 'sv', 'ta', 'cy',
  // ISO 639-2
  'afr', 'ara', 'eus', 'baq', 'nob', 'bre', 'cat', 'zho', 'chi', 'cor', 'cos', 'dan', 'nld', 'dut', 'eng', 'fin',
  'fra', 'fre', 'fry', 'glg', 'deu', 'ger', 'guj', 'hin', 'isl', 'ice', 'gle', 'ita', 'jpn', 'ltz', 'mar', 'mal',
  'glv', 'nor', 'nno', 'por', 'oci', 'roh', 'gla', 'spa', 'swe', 'tam', 'cym', 'wel'
]

function basename(path) {
  return path.split('/').pop()
}

function simplifyLanguage(lang) {
  if (!lang) return ''
  return lang.split('-').shift().toLowerCase().trim()
}

export class EPUBBook {
  constructor() {
    this.entries = []
    this.files = {}
    this.binary_files = {}
    this.fixedProblems = []
  }

  // 1. Add UTF-8 encoding declaration if missing
  fixEncoding() {
    const encoding = '<?xml version="1.0" encoding="utf-8"?>'
    const regex = /^<\?xml\s+version=["'][\d.]+["']\s+encoding=["'][a-zA-Z\d-.]+["'].*?\?>/i
    let count = 0

    for (const filename in this.files) {
      const ext = filename.split('.').pop().toLowerCase()
      if (ext === 'html' || ext === 'xhtml') {
        let html = this.files[filename].trimStart()
        if (!regex.test(html)) {
          html = encoding + '\n' + html
          this.files[filename] = html
          count++
        }
      }
    }

    if (count > 0) {
      this.fixedProblems.push({
        type: 'encoding',
        count,
        summary: `Adicionada declaração de codificação UTF-8 em ${count} arquivo(s)`,
        summaryEn: `Added UTF-8 encoding header to ${count} file(s)`
      })
    }
  }

  // 2. Fix linking to body ID showing up as unresolved hyperlink
  fixBodyIdLink() {
    const bodyIDList = []
    const parser = new DOMParser()

    // Collect body ID attributes
    for (const filename in this.files) {
      const ext = filename.split('.').pop().toLowerCase()
      if (ext === 'html' || ext === 'xhtml') {
        const html = this.files[filename]
        const dom = parser.parseFromString(html, 'text/html')
        const body = dom.getElementsByTagName('body')[0]
        if (body && body.id && body.id.trim().length > 0) {
          const linkTarget = basename(filename) + '#' + body.id.trim()
          bodyIDList.push([linkTarget, basename(filename)])
        }
      }
    }

    let linkFixCount = 0
    // Replace invalid anchor links
    for (const filename in this.files) {
      for (const [src, target] of bodyIDList) {
        if (this.files[filename].includes(src)) {
          this.files[filename] = this.files[filename].replaceAll(src, target)
          linkFixCount++
        }
      }
    }

    if (linkFixCount > 0) {
      this.fixedProblems.push({
        type: 'body-id',
        count: linkFixCount,
        summary: `Removidas ${linkFixCount} referências a âncoras no body (#id) que quebram o Kindle`,
        summaryEn: `Removed ${linkFixCount} body-anchor links (#id) that break Kindle conversion`
      })
    }
  }

  // 3. Fix language field not defined or not available
  async fixBookLanguage(onPromptLanguage) {
    const parser = new DOMParser()

    if (!('META-INF/container.xml' in this.files)) {
      return
    }

    const metaInfStr = this.files['META-INF/container.xml']
    const metaInf = parser.parseFromString(metaInfStr, 'text/xml')
    let opfFilename = ''
    for (const rootfile of metaInf.getElementsByTagName('rootfile')) {
      if (rootfile.getAttribute('media-type') === 'application/oebps-package+xml') {
        opfFilename = rootfile.getAttribute('full-path')
      }
    }

    if (!opfFilename || !(opfFilename in this.files)) {
      return
    }

    const opfStr = this.files[opfFilename]
    try {
      const opf = parser.parseFromString(opfStr, 'text/xml')
      const languageTags = opf.getElementsByTagName('dc:language')
      let language = 'en'
      let originalLanguage = ''

      if (languageTags.length === 0) {
        if (typeof onPromptLanguage === 'function') {
          language = await onPromptLanguage({
            reason: 'missing',
            current: 'en'
          })
        }
      } else {
        originalLanguage = languageTags[0].textContent?.trim() || ''
        language = originalLanguage
      }

      if (!KINDLE_ALLOWED_LANGUAGES.includes(simplifyLanguage(language))) {
        if (typeof onPromptLanguage === 'function') {
          language = await onPromptLanguage({
            reason: 'unsupported',
            current: language
          })
        } else {
          language = 'en'
        }
      }

      if (languageTags.length === 0) {
        const metadataTag = opf.getElementsByTagName('metadata')[0]
        if (metadataTag) {
          const langTag = opf.createElement('dc:language')
          langTag.textContent = language || 'en'
          metadataTag.appendChild(langTag)
          this.files[opfFilename] = new XMLSerializer().serializeToString(opf)
          this.fixedProblems.push({
            type: 'language',
            count: 1,
            summary: `Inserida metatag de idioma definida para "${language}"`,
            summaryEn: `Inserted missing language metadata tag set to "${language}"`
          })
        }
      } else if (language !== originalLanguage && language) {
        languageTags[0].textContent = language
        this.files[opfFilename] = new XMLSerializer().serializeToString(opf)
        this.fixedProblems.push({
          type: 'language',
          count: 1,
          summary: `Atualizado idioma de "${originalLanguage || 'indefinido'}" para "${language}"`,
          summaryEn: `Updated document language from "${originalLanguage || 'undefined'}" to "${language}"`
        })
      }
    } catch (e) {
      console.error('Error modifying OPF language:', e)
    }
  }

  // 4. Remove stray img tags with no source attribute
  fixStrayIMG() {
    const parser = new DOMParser()
    let strayCount = 0

    for (const filename in this.files) {
      const ext = filename.split('.').pop().toLowerCase()
      if (ext === 'html' || ext === 'xhtml') {
        const html = parser.parseFromString(this.files[filename], ext === 'xhtml' ? 'application/xhtml+xml' : 'text/html')
        const strayImgs = []
        for (const img of html.getElementsByTagName('img')) {
          if (!img.getAttribute('src')) {
            strayImgs.push(img)
          }
        }

        if (strayImgs.length > 0) {
          for (const img of strayImgs) {
            img.parentElement?.removeChild(img)
            strayCount++
          }
          this.files[filename] = new XMLSerializer().serializeToString(html)
        }
      }
    }

    if (strayCount > 0) {
      this.fixedProblems.push({
        type: 'stray-img',
        count: strayCount,
        summary: `Removidas ${strayCount} tags <img> vazias sem atributo "src"`,
        summaryEn: `Removed ${strayCount} empty <img> tags missing "src" attribute`
      })
    }
  }

  // Read EPUB archive
  async readEPUB(blob) {
    const reader = new zip.ZipReader(new zip.BlobReader(blob))
    this.entries = await reader.getEntries()
    this.files = {}
    this.binary_files = {}

    for (const entry of this.entries) {
      if (entry.directory) continue
      const filename = entry.filename
      const ext = filename.split('.').pop().toLowerCase()
      if (filename === 'mimetype' || ['html', 'xhtml', 'htm', 'xml', 'svg', 'css', 'opf', 'ncx'].includes(ext)) {
        this.files[filename] = await entry.getData(new zip.TextWriter('utf-8'))
      } else {
        this.binary_files[filename] = await entry.getData(new zip.Uint8ArrayWriter())
      }
    }

    await reader.close()
  }

  // Write rebuilt EPUB archive conforming to specifications
  async writeEPUB() {
    const blobWriter = new zip.BlobWriter('application/epub+zip')
    const writer = new zip.ZipWriter(blobWriter, { extendedTimestamp: false })

    // Mimetype MUST be first and uncompressed (level: 0)
    if ('mimetype' in this.files) {
      await writer.add('mimetype', new zip.TextReader(this.files['mimetype']), { level: 0 })
    }

    // Add text files
    for (const file in this.files) {
      if (file === 'mimetype') continue
      await writer.add(file, new zip.TextReader(this.files[file]))
    }

    // Add binary assets (images, fonts, etc.)
    for (const file in this.binary_files) {
      if (file.endsWith('/') || !this.binary_files[file]) continue
      await writer.add(file, new zip.Uint8ArrayReader(this.binary_files[file]))
    }

    await writer.close()
    return blobWriter.getData()
  }
}

// Helper to trigger browser file download natively without external dependencies
export function downloadBlob(blob, filename) {
  if (typeof window === 'undefined') return
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

// Helper to batch compress all repaired epubs into a zip file
export async function createBatchZip(files) {
  const blobWriter = new zip.BlobWriter('application/zip')
  const writer = new zip.ZipWriter(blobWriter, { extendedTimestamp: false })

  for (const item of files) {
    if (item.blob && item.outputFilename) {
      await writer.add(item.outputFilename, new zip.BlobReader(item.blob))
    }
  }

  await writer.close()
  return blobWriter.getData()
}
