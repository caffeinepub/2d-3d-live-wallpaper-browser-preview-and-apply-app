import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function AbstractOrbitScene() {
  const group = useRef<any>(null);
  const sphere1 = useRef<Mesh>(null);
  const sphere2 = useRef<Mesh>(null);
  const sphere3 = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (group.current) {
      group.current.rotation.y = t * 0.2;
    }

    if (sphere1.current) {
      sphere1.current.position.x = Math.sin(t) * 2;
      sphere1.current.position.y = Math.cos(t * 0.8) * 1.5;
    }

    if (sphere2.current) {
      sphere2.current.position.x = Math.cos(t * 1.2) * 2;
      sphere2.current.position.z = Math.sin(t * 1.2) * 2;
    }

    if (sphere3.current) {
      sphere3.current.position.y = Math.sin(t * 1.5) * 1.5;
      sphere3.current.position.z = Math.cos(t * 1.5) * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />

      <group ref={group}>
        <mesh ref={sphere1}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ee6c4d" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh ref={sphere2}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#f4a261" metalness={0.6} roughness={0.3} />
        </mesh>

        <mesh ref={sphere3}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#e76f51" metalness={0.7} roughness={0.25} />
        </mesh>

        <mesh>
          <torusGeometry args={[2, 0.1, 16, 100]} />
          <meshStandardMaterial color="#264653" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </>
  );
}
