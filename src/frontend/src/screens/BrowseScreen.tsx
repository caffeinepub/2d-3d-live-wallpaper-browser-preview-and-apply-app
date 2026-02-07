import { useState } from 'react';
import { WallpaperType } from '@/backend';
import { useWallpaperCatalogQuery } from '@/hooks/useWallpaperCatalogQuery';
import WallpaperCard from '@/components/wallpapers/WallpaperCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function BrowseScreen() {
  const [selectedType, setSelectedType] = useState<WallpaperType | 'all'>('all');
  const { data: wallpapers, isLoading, error } = useWallpaperCatalogQuery();

  const filteredWallpapers =
    selectedType === 'all'
      ? wallpapers || []
      : (wallpapers || []).filter((w) => w.wType === selectedType);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-muted">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1600x900.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Discover Beautiful Wallpapers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Explore our curated collection of 2D images, animated live wallpapers, and interactive 3D scenes.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container py-8">
        <Tabs
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as WallpaperType | 'all')}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value={WallpaperType.twoD}>2D</TabsTrigger>
            <TabsTrigger value={WallpaperType.live}>Live</TabsTrigger>
            <TabsTrigger value={WallpaperType.threeD}>3D</TabsTrigger>
          </TabsList>

          {/* Content */}
          <TabsContent value={selectedType} className="mt-0">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load wallpapers. Please try again later.
                </AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredWallpapers.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No wallpapers found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredWallpapers.map((wallpaper) => (
                  <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
