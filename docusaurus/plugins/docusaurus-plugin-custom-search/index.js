const fs = require('fs')
const path = require('path')
const { slug: githubSlug } = require('github-slugger')

function cleanMarkdownText(text) {
  text = text.replace(/`([^`]+)`/g, '$1')
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1')
  text = text.replace(/\*([^*]+)\*/g, '$1')
  text = text.replace(/__([^_]+)__/g, '$1')
  text = text.replace(/_([^_]+)_/g, '$1')
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
  text = text.replace(/<[^>]+>/g, '')

  return text.trim()
}

function extractContentFromMarkdown(content, filePath) {
  const sections = []
  const lines = content.split('\n')

  let currentHeading = null
  let currentHeadingSlug = null
  let currentLevel = 0
  let currentContent = []
  let inCodeBlock = false
  let codeBlockContent = []
  let inTable = false
  let tableContent = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        const codeText = codeBlockContent.join(' ').trim()
        if (codeText) {
          currentContent.push(codeText)
        }
        codeBlockContent = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(cleanMarkdownText(line))
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/)

    if (headingMatch) {
      if (currentHeading && currentContent.length > 0) {
        sections.push({
          level: currentLevel,
          headingText: currentHeading,
          headingSlug: currentHeadingSlug,
          content: currentContent.join(' ').trim(),
        })
      }

      const level = headingMatch[1].length
      let text = headingMatch[2].trim()
      let customId = headingMatch[3]

      text = cleanMarkdownText(text)
      const slug = customId || githubSlug(text)

      currentHeading = text
      currentHeadingSlug = slug
      currentLevel = level
      currentContent = []
      inTable = false
      tableContent = []
      continue
    }

    if (!line.trim()) {
      continue
    }

    if (line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true
      }

      const cells = line.split('|').map(cell => cleanMarkdownText(cell)).filter(cell => cell)
      tableContent.push(...cells)
      continue
    } else if (inTable) {
      if (tableContent.length > 0) {
        currentContent.push(tableContent.join(' '))
        tableContent = []
      }
      inTable = false
    }

    const listMatch = line.match(/^[\s]*[-*+]\s+(.+)$/)
    if (listMatch) {
      currentContent.push(cleanMarkdownText(listMatch[1]))
      continue
    }

    const numberedListMatch = line.match(/^[\s]*\d+\.\s+(.+)$/)
    if (numberedListMatch) {
      currentContent.push(cleanMarkdownText(numberedListMatch[1]))
      continue
    }

    if (line.trim() && !line.trim().startsWith('---') && !line.trim().startsWith(':::')) {
      currentContent.push(cleanMarkdownText(line))
    }
  }

  if (currentHeading && currentContent.length > 0) {
    sections.push({
      level: currentLevel,
      headingText: currentHeading,
      headingSlug: currentHeadingSlug,
      content: currentContent.join(' ').trim(),
    })
  }

  return sections
}

function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        getAllMarkdownFiles(filePath, fileList)
      }
    } else if (file.match(/\.(md|mdx)$/)) {
      fileList.push(filePath)
    }
  })

  return fileList
}

function extractFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (frontMatterMatch) {
    const frontMatterContent = frontMatterMatch[1]
    const titleMatch = frontMatterContent.match(/title:\s*(.+)/)
    const slugMatch = frontMatterContent.match(/slug:\s*(.+)/)
    return {
      title: titleMatch ? titleMatch[1].trim() : null,
      slug: slugMatch ? slugMatch[1].trim() : null,
      contentWithoutFrontMatter: content.replace(frontMatterMatch[0], '').trim()
    }
  }
  return {
    title: null,
    slug: null,
    contentWithoutFrontMatter: content
  }
}

function buildSearchIndex(docsDir) {
  const markdownFiles = getAllMarkdownFiles(docsDir)
  const searchIndex = []

  markdownFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { title, slug, contentWithoutFrontMatter } = extractFrontMatter(content)

    const sections = extractContentFromMarkdown(contentWithoutFrontMatter, filePath)

    const relativePath = path.relative(docsDir, filePath)
      .replace(/\.(md|mdx)$/, '')
      .replace(/\\/g, '/')

    let pageUrl
    if (slug) {
      pageUrl = slug
    } else {
      pageUrl = `/${relativePath}`
    }

    const pageTitle = title || 'Untitled'

    sections.forEach(section => {
      searchIndex.push({
        pageTitle,
        pageUrl,
        headingText: section.headingText,
        headingSlug: section.headingSlug,
        level: section.level,
        content: section.content,
        url: `${pageUrl}#${section.headingSlug}`
      })
    })
  })

  return searchIndex
}

module.exports = function pluginCustomSearch(context, options) {
  return {
    name: 'docusaurus-plugin-custom-search',

    async postBuild({ outDir }) {
      const docsDir = path.join(context.siteDir, 'docs')
      const searchIndex = buildSearchIndex(docsDir)

      const searchIndexPath = path.join(outDir, 'search-index.json')
      fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2))

      console.log(`✅ Custom search index created with ${searchIndex.length} entries`)
    },

    async contentLoaded({ actions }) {
      const { setGlobalData } = actions
      const docsDir = path.join(context.siteDir, 'docs')
      const searchIndex = buildSearchIndex(docsDir)

      setGlobalData({ searchIndex })
    },
  }
}
