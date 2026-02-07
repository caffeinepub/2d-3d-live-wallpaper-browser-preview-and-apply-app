import { WallpaperMeta, WallpaperType } from '@/backend';

export const builtInWallpapers: WallpaperMeta[] = [
  {
    id: 'sand-dunes',
    title: 'Desert Dunes',
    wType: WallpaperType.twoD,
    thumbnail: '/assets/wallpapers/2d/sand-dunes.thumb.jpg',
    preview: '/assets/wallpapers/2d/sand-dunes.jpg',
  },
  {
    id: 'neon-waves',
    title: 'Neon Waves',
    wType: WallpaperType.live,
    thumbnail: '/assets/wallpapers/live/neon-waves.thumb.jpg',
    preview: '/assets/wallpapers/live/neon-waves.mp4',
  },
  {
    id: 'abstract-orbit',
    title: 'Abstract Orbit',
    wType: WallpaperType.threeD,
    thumbnail: '/assets/wallpapers/3d/abstract-orbit.thumb.jpg',
    preview: 'scene_abstract_orbit',
  },
  {
    id: 'particle-field',
    title: 'Particle Field',
    wType: WallpaperType.threeD,
    thumbnail: '/assets/wallpapers/3d/particle-field.thumb.jpg',
    preview: 'scene_particle_field',
  },
];
