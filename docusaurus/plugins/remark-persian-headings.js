const { visit } = require('unist-util-visit')
const GithubSlugger = require('github-slugger').default

function persianToSlug(text) {
  const persianMap = {
    'آ': 'a', 'ا': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j',
    'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z',
    'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
    'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l',
    'م': 'm', 'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', 'ي': 'y', 'ئ': 'y',
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '؟': '', '،': '', '؛': '', '«': '', '»': ''
  }

  let slug = ''
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (persianMap[char]) {
      slug += persianMap[char]
    } else if (char.match(/[a-zA-Z0-9]/)) {
      slug += char.toLowerCase()
    } else if (char === ' ' || char === '-' || char === '_') {
      slug += '-'
    }
  }

  slug = slug
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'heading'
}

function getHeadingText(node) {
  let text = ''

  visit(node, (child) => {
    if (child.type === 'text') {
      text += child.value
    } else if (child.type === 'inlineCode') {
      text += child.value
    }
  })

  return text.trim()
}

function remarkPersianHeadings() {
  return (tree) => {
    const slugger = new GithubSlugger()

    visit(tree, 'heading', (node) => {
      if (node.data && node.data.hProperties && node.data.hProperties.id) {
        return
      }

      const text = getHeadingText(node)

      if (!text)
        return

      const hasPersian = /[\u0600-\u06FF]/.test(text)

      let slug
      if (hasPersian) {
        const transliteratedSlug = persianToSlug(text)
        slug = slugger.slug(transliteratedSlug)
      } else {
        slug = slugger.slug(text)
      }

      if (!node.data) {
        node.data = {}
      }
      if (!node.data.hProperties) {
        node.data.hProperties = {}
      }
      node.data.hProperties.id = slug

      node.data.hProperties['data-original-text'] = text
    })
  }
}

module.exports = remarkPersianHeadings
