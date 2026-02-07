import { WallpaperMeta, WallpaperType } from '@/backend';
import ThreeDPreviewCanvas from '@/components/three/ThreeDPreviewCanvas';
import LiveWallpaperPreview from '@/components/live/LiveWallpaperPreview';

interface WallpaperPreviewProps {
  wallpaper: WallpaperMeta;
}

export default function WallpaperPreview({ wallpaper }: WallpaperPreviewProps) {
  if (wallpaper.wType === WallpaperType.threeD) {
    return <ThreeDPreviewCanvas sceneKey={wallpaper.preview} />;
  }

  if (wallpaper.wType === WallpaperType.live) {
    return <LiveWallpaperPreview src={wallpaper.preview} />;
  }

  // 2D Image
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted">
      <img
        src={wallpaper.preview}
        alt={wallpaper.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
