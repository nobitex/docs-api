const fs = require('fs')
const path = require('path')
const { slug: githubSlug } = require('github-slugger')

function cleanMarkdownText(text) {
  if (!text) return ''
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

function extractTextFromJSX(line) {
  if (!line) return ''
  // Simple heuristic: capture text inside double or single quotes
  // children={"OAuth 2.0 token endpoint"}  -> OAuth 2.0 token endpoint
  // children='Something' -> Something
  const matches = []
  const regex = /["']([^"']+)["']/g
  let m
  while ((m = regex.exec(line)) !== null) {
    matches.push(m[1])
  }
  return matches.join(' ')
}

function extractContentFromMarkdown(content) {
  const sections = []
  const lines = content.split('\n')

  let currentHeading = null
  let currentHeadingSlug = null
  let currentLevel = 0
  let currentContent = []
  let beforeFirstHeading = []
  let inCodeBlock = false
  let codeBlockContent = []
  let inTable = false
  let tableContent = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        const codeText = codeBlockContent.join(' ').trim()
        if (codeText) currentContent.push(codeText)
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

    // Check for <Heading> JSX component (MDX)
    const headingJSXMatch = line.match(
      /^<Heading[^>]*children=\{["']([^"']+)["']\}[^>]*>/
    )
    if (headingJSXMatch) {
      // push previous section
      if (currentHeading && currentContent.length > 0) {
        sections.push({
          level: currentLevel,
          headingText: currentHeading,
          headingSlug: currentHeadingSlug,
          content: currentContent.join(' ').trim(),
        })
      }

      const text = cleanMarkdownText(headingJSXMatch[1])
      const slug = githubSlug(text)

      currentHeading = text
      currentHeadingSlug = slug
      currentLevel = 1 // or derive from as={"h2"} if you want
      currentContent = []
      inTable = false
      tableContent = []
      continue
    }

    const headingMatch = line.match(
      /^(#{1,6})\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/
    )

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
      const customId = headingMatch[3]

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

    if (!line.trim()) continue

    if (line.trim().startsWith('|')) {
      if (!inTable) inTable = true
      const cells = line
        .split('|')
        .map((cell) => cleanMarkdownText(cell))
        .filter(Boolean)
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

    // Try to pull out JSX text (MDX)
    if (line.trim().startsWith('<')) {
      const jsxText = extractTextFromJSX(line)
      const cleaned = cleanMarkdownText(jsxText)
      if (cleaned) {
        if (currentHeading === null) {
          beforeFirstHeading.push(cleaned)
        } else {
          currentContent.push(cleaned)
        }
      }
      continue
    }

    if (
      line.trim() &&
      !line.trim().startsWith('---') &&
      !line.trim().startsWith(':::')
    ) {
      const cleanedLine = cleanMarkdownText(line)
      if (currentHeading === null) {
        beforeFirstHeading.push(cleanedLine)
      } else {
        currentContent.push(cleanedLine)
      }
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

  if (beforeFirstHeading.length > 0) {
    sections.unshift({
      level: 0,
      headingText: '',
      headingSlug: '',
      content: beforeFirstHeading.join(' ').trim(),
    })
  }

  return sections
}

function getAllMarkdownFiles(rootDir, subDir) {
  const dir = path.join(rootDir, subDir)
  const fileList = []

  if (!fs.existsSync(dir)) return fileList

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir)
    files.forEach((file) => {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          walk(filePath)
        }
      } else if (file.match(/\.(md|mdx)$/)) {
        fileList.push(filePath)
      }
    })
  }

  walk(dir)
  return fileList
}

function extractFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (frontMatterMatch) {
    const frontMatterContent = frontMatterMatch[1]
    const titleMatch = frontMatterContent.match(/title:\s*(.+)/)
    const slugMatch = frontMatterContent.match(/slug:\s*(.+)/)
    const descriptionMatch = frontMatterContent.match(/description:\s*(.+)/)

    return {
      title: titleMatch ? titleMatch[1].trim().replace(/^"|"$/g, '') : null,
      slug: slugMatch ? slugMatch[1].trim().replace(/^"|"$/g, '') : null,
      description: descriptionMatch
        ? descriptionMatch[1].trim().replace(/^"|"$/g, '')
        : null,
      contentWithoutFrontMatter: content
        .replace(frontMatterMatch[0], '')
        .trim(),
    }
  }
  return {
    title: null,
    slug: null,
    description: null,
    contentWithoutFrontMatter: content,
  }
}

function buildSearchIndex(siteDir) {
  const searchIndex = []

  const docsFiles = getAllMarkdownFiles(siteDir, 'docs')
  const blogFiles = getAllMarkdownFiles(siteDir, 'blog')
  const pageFiles = getAllMarkdownFiles(siteDir, 'src/pages')

  const allFiles = [
    ...docsFiles.map((file) => ({ file, type: 'docs' })),
    ...blogFiles.map((file) => ({ file, type: 'blog' })),
    ...pageFiles.map((file) => ({ file, type: 'pages' })),
  ]

  allFiles.forEach(({ file, type }) => {
    const content = fs.readFileSync(file, 'utf-8')
    const { title, slug, description, contentWithoutFrontMatter } =
      extractFrontMatter(content)

    const sections = extractContentFromMarkdown(contentWithoutFrontMatter)

    // Include description in the full page text
    const fullPageText = cleanMarkdownText(
      (description ? description + '\n\n' : '') + contentWithoutFrontMatter
    )

    if (!sections.length && fullPageText) {
      sections.push({
        level: 0,
        headingText: '',
        headingSlug: '',
        content: fullPageText,
      })
    }

    let relativePath = path.relative(siteDir, file).replace(/\\/g, '/')
    relativePath = relativePath.replace(/\.(md|mdx)$/, '')

    let routePath = relativePath
    let basePath = ''

    if (type === 'docs') {
      routePath = routePath.replace(/^docs\//, '')
    } else if (type === 'pages') {
      routePath = routePath.replace(/^src\/pages\//, '')
    } else if (type === 'blog') {
      basePath = '/blog'
      routePath = routePath.replace(/^blog\//, '')
    }

    if (routePath === 'index') {
      routePath = ''
    }

    let pageUrl
    if (slug) {
      pageUrl = slug.startsWith('/') ? slug : `/${slug}`
    } else {
      pageUrl = `${basePath}/${routePath}`.replace(/\/+/g, '/')
      if (pageUrl === '') pageUrl = '/'
    }

    pageUrl = pageUrl.replace(/\.api$/, '')

    const pageTitle = title || 'Untitled'

    sections.forEach((section) => {
      searchIndex.push({
        pageTitle,
        pageUrl,
        headingText: section.headingText,
        headingSlug: section.headingSlug,
        level: section.level,
        content: section.content,
        url: section.headingSlug
          ? `${pageUrl}#${section.headingSlug}`
          : pageUrl,
      })
    })
  })

  return searchIndex
}

module.exports = function pluginCustomSearch(context, options) {
  return {
    name: 'docusaurus-plugin-custom-search',

    async postBuild({ outDir }) {
      const siteDir = context.siteDir
      const searchIndex = buildSearchIndex(siteDir)

      const searchIndexPath = path.join(outDir, 'search-index.json')
      fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2))

      console.log(`indexed for custom search entries`)
    },

    async contentLoaded({ actions }) {
      const { setGlobalData } = actions
      const siteDir = context.siteDir
      const searchIndex = buildSearchIndex(siteDir)

      setGlobalData({ searchIndex })
    },
  }
}
