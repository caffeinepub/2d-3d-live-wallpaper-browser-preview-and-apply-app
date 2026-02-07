import { WallpaperMeta } from '@/backend';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import WallpaperPreview from '@/components/wallpapers/WallpaperPreview';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FullscreenPreviewModalProps {
  wallpaper: WallpaperMeta;
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenPreviewModal({
  wallpaper,
  isOpen,
  onClose,
}: FullscreenPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 border-0">
        <div className="relative w-full h-full bg-black">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <div className="w-full h-full flex items-center justify-center">
            <WallpaperPreview wallpaper={wallpaper} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
