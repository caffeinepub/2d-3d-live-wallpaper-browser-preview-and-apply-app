import { ComponentType } from 'react';
import AbstractOrbitScene from '@/components/three/scenes/AbstractOrbitScene';
import ParticleFieldScene from '@/components/three/scenes/ParticleFieldScene';

const sceneRegistry: Record<string, ComponentType> = {
  scene_abstract_orbit: AbstractOrbitScene,
  scene_particle_field: ParticleFieldScene,
  scene_starfield: ParticleFieldScene, // Fallback for backend data
};

export function getSceneComponent(sceneKey: string): ComponentType | null {
  return sceneRegistry[sceneKey] || null;
}
