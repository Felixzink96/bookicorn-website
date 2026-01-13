import { groq } from 'next-sanity'

// Get all blog posts for listing
export const postsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    content,
    "author": author->{name, image, role},
    "category": category->{title, slug, color}
  }
`

// Get a single blog post by slug
export const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    content,
    seoTitle,
    seoDescription,
    "author": author->{name, image, role, bio},
    "category": category->{_id, title, slug, color},
    "categoryId": category._ref
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "blogPost" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    content,
    "author": author->{name, image, role},
    "category": category->{title, slug, color}
  }
`

// Get all post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`

// Get related posts (same category, different post)
export const relatedPostsQuery = groq`
  *[_type == "blogPost" && category._ref == $categoryId && _id != $postId] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    content,
    "category": category->{title, slug, color}
  }
`
