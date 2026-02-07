import { useNavigate } from '@tanstack/react-router';
import { WallpaperMeta, WallpaperType } from '@/backend';
import FavoriteToggleButton from '@/components/favorites/FavoriteToggleButton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image, Video, Box } from 'lucide-react';

interface WallpaperCardProps {
  wallpaper: WallpaperMeta;
}

export default function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  const navigate = useNavigate();

  const getTypeIcon = () => {
    switch (wallpaper.wType) {
      case WallpaperType.twoD:
        return <Image className="w-3 h-3" />;
      case WallpaperType.live:
        return <Video className="w-3 h-3" />;
      case WallpaperType.threeD:
        return <Box className="w-3 h-3" />;
    }
  };

  const getTypeLabel = () => {
    switch (wallpaper.wType) {
      case WallpaperType.twoD:
        return '2D';
      case WallpaperType.live:
        return 'Live';
      case WallpaperType.threeD:
        return '3D';
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate({ to: '/wallpaper/$wallpaperId', params: { wallpaperId: wallpaper.id } })}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(/assets/generated/thumb-bg.dim_512x512.png)',
              backgroundSize: 'cover',
            }}
          />
          
          {/* Thumbnail */}
          <img
            src={wallpaper.thumbnail}
            alt={wallpaper.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="gap-1.5 backdrop-blur-sm bg-background/80">
              {getTypeIcon()}
              {getTypeLabel()}
            </Badge>
          </div>

          {/* Favorite button */}
          <div
            className="absolute top-3 right-3"
            onClick={(e) => e.stopPropagation()}
          >
            <FavoriteToggleButton wallpaperId={wallpaper.id} compact />
          </div>
        </div>

        {/* Title */}
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{wallpaper.title}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
