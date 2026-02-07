import { useFavoritesQuery } from '@/hooks/useFavoritesQuery';
import { useWallpaperCatalogQuery } from '@/hooks/useWallpaperCatalogQuery';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import WallpaperCard from '@/components/wallpapers/WallpaperCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, AlertCircle } from 'lucide-react';

export default function FavoritesScreen() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: favoriteIds, isLoading: favoritesLoading } = useFavoritesQuery();
  const { data: wallpapers, isLoading: catalogLoading } = useWallpaperCatalogQuery();

  const isAuthenticated = !!identity;
  const isLoading = favoritesLoading || catalogLoading;

  const favoriteWallpapers = wallpapers?.filter((w) => favoriteIds?.includes(w.id)) || [];

  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-accent flex items-center justify-center">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Sign in to view favorites</h2>
            <p className="text-muted-foreground">
              Log in with Internet Identity to save and access your favorite wallpapers.
            </p>
          </div>
          <Button onClick={login} disabled={isLoggingIn} size="lg">
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Your Favorites</h1>
        <p className="text-muted-foreground">
          {isLoading ? 'Loading...' : `${favoriteWallpapers.length} wallpaper${favoriteWallpapers.length !== 1 ? 's' : ''} saved`}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : favoriteWallpapers.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6">
            Start exploring and save your favorite wallpapers to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteWallpapers.map((wallpaper) => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
          ))}
        </div>
      )}
    </div>
  );
}
