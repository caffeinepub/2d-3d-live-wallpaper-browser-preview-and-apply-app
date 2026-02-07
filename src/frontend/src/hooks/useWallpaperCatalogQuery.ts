import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { WallpaperMeta } from '@/backend';
import { builtInWallpapers } from '@/catalog/wallpaperCatalog';

export function useWallpaperCatalogQuery() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WallpaperMeta[]>({
    queryKey: ['wallpaperCatalog'],
    queryFn: async () => {
      if (!actor) return builtInWallpapers;
      
      try {
        const backendWallpapers = await actor.getWallpaperCatalog();
        // Merge backend wallpapers with built-in catalog
        return [...builtInWallpapers];
      } catch (error) {
        console.error('Failed to fetch wallpaper catalog:', error);
        return builtInWallpapers;
      }
    },
    enabled: !!actor && !actorFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
