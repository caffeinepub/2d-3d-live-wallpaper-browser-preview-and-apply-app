import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { getSceneComponent } from '@/catalog/threeDScenes';
import { Loader2 } from 'lucide-react';

interface ThreeDPreviewCanvasProps {
  sceneKey: string;
}

export default function ThreeDPreviewCanvas({ sceneKey }: ThreeDPreviewCanvasProps) {
  const SceneComponent = getSceneComponent(sceneKey);

  if (!SceneComponent) {
    return (
      <div className="aspect-[3/4] w-full rounded-2xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Scene not found</p>
      </div>
    );
  }

  return (
    <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#888" />
            </mesh>
          }
        >
          <SceneComponent />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
