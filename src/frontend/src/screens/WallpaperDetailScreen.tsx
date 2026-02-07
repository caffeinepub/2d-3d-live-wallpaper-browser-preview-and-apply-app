import { useParams, useNavigate } from '@tanstack/react-router';
import { useWallpaperCatalogQuery } from '@/hooks/useWallpaperCatalogQuery';
import WallpaperPreview from '@/components/wallpapers/WallpaperPreview';
import ApplyActions from '@/components/wallpapers/ApplyActions';
import FavoriteToggleButton from '@/components/favorites/FavoriteToggleButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { WallpaperType } from '@/backend';

export default function WallpaperDetailScreen() {
  const { wallpaperId } = useParams({ from: '/wallpaper/$wallpaperId' });
  const navigate = useNavigate();
  const { data: wallpapers, isLoading } = useWallpaperCatalogQuery();

  const wallpaper = wallpapers?.find((w) => w.id === wallpaperId);

  const getTypeLabel = (type: WallpaperType) => {
    switch (type) {
      case WallpaperType.twoD:
        return '2D Image';
      case WallpaperType.live:
        return 'Live';
      case WallpaperType.threeD:
        return '3D Scene';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!wallpaper) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Wallpaper not found</h2>
        <Button onClick={() => navigate({ to: '/' })}>Back to Browse</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/' })}
        className="mb-6 -ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Preview */}
        <div className="relative">
          <WallpaperPreview wallpaper={wallpaper} />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{wallpaper.title}</h1>
              <FavoriteToggleButton wallpaperId={wallpaper.id} />
            </div>
            <Badge variant="secondary" className="text-sm">
              {getTypeLabel(wallpaper.wType)}
            </Badge>
          </div>

          <div className="prose prose-sm dark:prose-invert">
            <p className="text-muted-foreground">
              {wallpaper.wType === WallpaperType.twoD &&
                'A stunning high-resolution image perfect for your desktop or mobile device.'}
              {wallpaper.wType === WallpaperType.live &&
                'An animated wallpaper that brings your screen to life with smooth, looping motion.'}
              {wallpaper.wType === WallpaperType.threeD &&
                'An interactive 3D scene that responds to your interactions and animates in real-time.'}
            </p>
          </div>

          <ApplyActions wallpaper={wallpaper} />
        </div>
      </div>
    </div>
  );
}
