import imageUrlBuilder from '@sanity/image-url'
import { client, isSanityConfigured } from './client'

// Create builder only if client is available
const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder) {
    // Return a placeholder object with width/height/url methods
    return {
      width: () => ({ url: () => '', height: () => ({ url: () => '' }) }),
      height: () => ({ url: () => '' }),
      url: () => '',
    }
  }
  return builder.image(source)
}
