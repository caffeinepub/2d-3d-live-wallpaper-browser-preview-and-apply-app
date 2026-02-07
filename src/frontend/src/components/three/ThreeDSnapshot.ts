import { getSceneComponent } from '@/catalog/threeDScenes';

export async function captureThreeDSnapshot(sceneKey: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Find the canvas element
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        reject(new Error('Canvas not found'));
        return;
      }

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      }, 'image/png');
    } catch (error) {
      reject(error);
    }
  });
}
