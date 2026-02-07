import { useState } from 'react';
import { WallpaperMeta, WallpaperType } from '@/backend';
import { Button } from '@/components/ui/button';
import { Download, Maximize, Camera } from 'lucide-react';
import { downloadFile, downloadBlob } from '@/utils/download';
import { captureThreeDSnapshot } from '@/components/three/ThreeDSnapshot';
import FullscreenPreviewModal from '@/components/wallpapers/FullscreenPreviewModal';
import { toast } from 'sonner';

interface ApplyActionsProps {
  wallpaper: WallpaperMeta;
}

export default function ApplyActions({ wallpaper }: ApplyActionsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleDownload = () => {
    if (wallpaper.wType === WallpaperType.twoD || wallpaper.wType === WallpaperType.live) {
      downloadFile(wallpaper.preview, `${wallpaper.title}.${wallpaper.wType === WallpaperType.live ? 'mp4' : 'jpg'}`);
      toast.success('Download started');
    }
  };

  const handleSnapshot = async () => {
    if (wallpaper.wType === WallpaperType.threeD) {
      setIsCapturing(true);
      try {
        const blob = await captureThreeDSnapshot(wallpaper.preview);
        downloadBlob(blob, `${wallpaper.title}-snapshot.png`);
        toast.success('Snapshot captured and downloaded');
      } catch (error) {
        toast.error('Failed to capture snapshot');
        console.error('Snapshot error:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Apply Wallpaper</h3>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setIsFullscreen(true)}
            size="lg"
            className="gap-2"
          >
            <Maximize className="w-4 h-4" />
            Full Screen Preview
          </Button>

          {(wallpaper.wType === WallpaperType.twoD || wallpaper.wType === WallpaperType.live) && (
            <Button
              onClick={handleDownload}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}

          {wallpaper.wType === WallpaperType.threeD && (
            <Button
              onClick={handleSnapshot}
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={isCapturing}
            >
              <Camera className="w-4 h-4" />
              {isCapturing ? 'Capturing...' : 'Export Snapshot'}
            </Button>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {wallpaper.wType === WallpaperType.twoD &&
            'Download the image and set it as your wallpaper in your device settings.'}
          {wallpaper.wType === WallpaperType.live &&
            'Download the animated wallpaper and use a live wallpaper app to apply it.'}
          {wallpaper.wType === WallpaperType.threeD &&
            'View in full screen or export a snapshot of the 3D scene.'}
        </p>
      </div>

      <FullscreenPreviewModal
        wallpaper={wallpaper}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      />
    </>
  );
}
