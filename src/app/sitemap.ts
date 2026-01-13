import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bookicorn.com'

  // Static pages
  const staticPages = [
    '',
    '/features',
    '/pricing',
    '/blog',
    '/docs',
    '/about',
    '/contact',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/features' || route === '/pricing' ? 0.9 : 0.8,
  }))

  // TODO: Add dynamic blog posts from Sanity
  // const posts = await getBlogPosts()
  // const blogEntries = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }))

  return staticEntries
}
