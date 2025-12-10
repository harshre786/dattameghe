import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://astro-vision.com',
      lastModified: new Date(),
    },
    {
      url: 'https://astro-vision.com/launches',
      lastModified: new Date(),
    },
    {
      url: 'https://astro-vision.com/space-weather',
      lastModified: new Date(),
    },
    {
      url: 'https://astro-vision.com/astronomy',
      lastModified: new Date(),
    },
    {
      url: 'https://astro-vision.com/asteroids',
      lastModified: new Date(),
    },
    {
      url: 'https://astro-vision.com/news',
      lastModified: new Date(),
    },
    {
      url: 'https://astro-vision.com/bookmarks',
      lastModified: new Date(),
    },
  ];
}
