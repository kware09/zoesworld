import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zoe's World",
    short_name: "Zoe's World",
    description: 'A calm, playful phonics practice world',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FFF8F0',
    theme_color: '#FFF8F0',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
