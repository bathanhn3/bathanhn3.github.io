import {existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync} from 'node:fs'
import path from 'node:path'

const projectId = process.env.SANITY_PROJECT_ID || 'zscb93sq'
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'
const postsDir = '_posts'

const query = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  _createdAt,
  _updatedAt,
  layout,
  title,
  "slug": slug.current,
  permalink,
  publishedAt,
  description,
  excerpt,
  readTime,
  category,
  track,
  trackLabel,
  tags,
  pillar,
  featured,
  body
}`

const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`

const response = await fetch(url)

if (!response.ok) {
  throw new Error(`Sanity API request failed: ${response.status} ${response.statusText}`)
}

const payload = await response.json()
const posts = payload.result || []

mkdirSync(postsDir, {recursive: true})

let written = 0
let skipped = 0

for (const post of posts) {
  if (!post._id || !post.title || !post.slug) {
    skipped += 1
    console.warn(`Skipped incomplete Sanity post: ${post._id || '(missing id)'}`)
    continue
  }

  const date = toDateOnly(post.publishedAt || post._createdAt)
  const filename = `${date}-${post.slug}.md`
  const targetPath = path.join(postsDir, filename)
  const currentPath = findExistingSanityPost(post._id) || targetPath

  if (existsSync(targetPath) && targetPath !== currentPath && !isSanityPost(targetPath)) {
    skipped += 1
    console.warn(`Skipped ${post.slug}: ${targetPath} already exists and is not managed by Sanity`)
    continue
  }

  const markdown = buildMarkdown(post, date)

  if (existsSync(currentPath) && currentPath !== targetPath) {
    renameSync(currentPath, targetPath)
  }

  if (!existsSync(targetPath) || readFileSync(targetPath, 'utf8') !== markdown) {
    writeFileSync(targetPath, markdown, 'utf8')
    written += 1
  }
}

console.log(`Sanity sync complete. Posts fetched: ${posts.length}. Files changed: ${written}. Skipped: ${skipped}.`)

function buildMarkdown(post, date) {
  const description = post.description || post.excerpt || firstText(post.body) || ''
  const body = portableTextToMarkdown(post.body)
  const permalink = normalizePermalink(post.permalink || `/${post.slug}/`)
  const frontMatter = [
    ['layout', yamlString(post.layout || 'post')],
    ['title', yamlString(post.title)],
    ['slug', post.slug],
    ['permalink', permalink],
    ['description', yamlString(description)],
    ['date', date],
    ['readTime', numberOrDefault(post.readTime, 8)],
    ['category', post.category || 'technical-seo'],
    ['track', post.track || 'phan-tich'],
    ['track_label', yamlString(post.trackLabel || 'Phân Tích')],
    ['tags', yamlArray(post.tags || [])],
    ['pillar', booleanOrDefault(post.pillar, false)],
    ['featured', booleanOrDefault(post.featured, false)],
    ['author', 'Thanh'],
    ['sanity_id', yamlString(post._id)],
    ['sanity_updated_at', yamlString(post._updatedAt || '')],
  ]
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  return `---
${frontMatter}
---

${body}
`
}

function portableTextToMarkdown(blocks = []) {
  return blocks
    .map((block) => blockToMarkdown(block))
    .filter(Boolean)
    .join('\n\n')
    .trim()
}

function blockToMarkdown(block) {
  if (block._type !== 'block') {
    return ''
  }

  const text = spansToMarkdown(block.children || [], block.markDefs || []).trim()

  if (!text) {
    return ''
  }

  if (block.listItem) {
    const indent = '  '.repeat(Math.max((block.level || 1) - 1, 0))
    const marker = block.listItem === 'number' ? '1. ' : '- '
    return `${indent}${marker}${text}`
  }

  switch (block.style) {
    case 'h1':
      return `# ${text}`
    case 'h2':
      return `## ${text}`
    case 'h3':
      return `### ${text}`
    case 'h4':
      return `#### ${text}`
    case 'blockquote':
      return `> ${text}`
    default:
      return text
  }
}

function spansToMarkdown(children, markDefs) {
  const markDefMap = new Map(markDefs.map((mark) => [mark._key, mark]))

  return children
    .map((child) => {
      if (child._type !== 'span') {
        return ''
      }

      let text = child.text || ''

      for (const mark of child.marks || []) {
        if (mark === 'code') {
          text = `\`${text.replaceAll('`', '\\`')}\``
        } else if (mark === 'strong') {
          text = `**${text}**`
        } else if (mark === 'em') {
          text = `*${text}*`
        } else {
          const markDef = markDefMap.get(mark)
          if (markDef?._type === 'link' && markDef.href) {
            text = `[${text}](${markDef.href})`
          }
        }
      }

      return text
    })
    .join('')
}

function firstText(blocks = []) {
  const block = blocks.find((item) => item._type === 'block' && item.children?.length)
  const text = block?.children?.map((child) => child.text || '').join('').trim()

  if (!text) {
    return ''
  }

  return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text
}

function toDateOnly(value) {
  const date = new Date(value)

  if (Number.isNaN(date.valueOf())) {
    throw new Error(`Invalid Sanity post date: ${value}`)
  }

  return date.toISOString().slice(0, 10)
}

function yamlString(value) {
  return JSON.stringify(String(value || ''))
}

function yamlArray(values) {
  const cleanValues = values.map((value) => String(value || '').trim()).filter(Boolean)
  return `[${cleanValues.map((value) => yamlString(value)).join(', ')}]`
}

function numberOrDefault(value, fallback) {
  return Number.isFinite(value) ? value : fallback
}

function booleanOrDefault(value, fallback) {
  return typeof value === 'boolean' ? value : fallback
}

function normalizePermalink(value) {
  const permalink = String(value || '').trim()

  if (!permalink) {
    return '/'
  }

  const withLeadingSlash = permalink.startsWith('/') ? permalink : `/${permalink}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function findExistingSanityPost(id) {
  if (!existsSync(postsDir)) {
    return null
  }

  const marker = `sanity_id: ${yamlString(id)}`

  for (const file of readdirSync(postsDir)) {
    if (!file.endsWith('.md')) {
      continue
    }

    const filePath = path.join(postsDir, file)
    const content = readFileSync(filePath, 'utf8')

    if (content.includes(marker)) {
      return filePath
    }
  }

  return null
}

function isSanityPost(filePath) {
  return existsSync(filePath) && readFileSync(filePath, 'utf8').includes('sanity_id:')
}
