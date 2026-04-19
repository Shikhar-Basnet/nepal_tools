import { tools } from '@/lib/tools'

export default function sitemap() {
  const base = 'https://shikharbasnet.com.np'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...tools.map(t => ({
      url: `${base}/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}