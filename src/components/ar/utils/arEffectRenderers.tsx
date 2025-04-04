
import React from 'react';
import {
  TrailConfig,
  ParticleConfig,
  SuccessParticleConfig,
  WeatherParticleConfig,
  EntityConfig,
  createTrailEffectConfig,
  createParticleSystemConfig,
  createSuccessEffectConfig,
  createWeatherEffectConfig
} from './arEffects';

/**
 * Render a trail effect using JSX
 */
export const renderTrailEffect = (
  positionAttribute: string,
  count: number = 5,
  color: string = '#FFFFFF',
  fadeDuration: number = 1000
): JSX.Element[] => {
  const trailConfigs = createTrailEffectConfig(positionAttribute, count, color, fadeDuration);
  
  return trailConfigs.map(config => (
    <a-entity
      key={config.key}
      className={config.className}
      geometry={config.geometry}
      material={config.material}
      position={config.position}
      animation__fade={config.animation__fade}
      animation__scale={config.animation__scale}
    />
  ));
};

/**
 * Render a particle system using JSX
 */
export const renderParticleSystem = (
  position: string,
  color: string = '#FFFFFF',
  count: number = 20,
  duration: number = 2000,
  size: number = 0.05
): JSX.Element => {
  const particleSystem = createParticleSystemConfig(position, color, count, duration, size);
  
  return (
    <a-entity position={particleSystem.position}>
      {/* Use type assertion to tell TypeScript what specific type we're using */}
      {(particleSystem.particles as ParticleConfig[]).map((particle) => (
        <a-sphere
          key={particle.key}
          radius={particle.radius}
          position={particle.position}
          color={particle.color}
          opacity={particle.opacity}
          transparent={particle.transparent}
          animation={particle.animation}
          animation__fade={particle.animation__fade}
        />
      ))}
    </a-entity>
  );
};

/**
 * Render a success effect using JSX
 */
export const renderSuccessEffect = (position: string): JSX.Element => {
  const successEffect = createSuccessEffectConfig(position);
  
  return (
    <a-entity position={successEffect.position}>
      {/* Generate multiple particles with random directions */}
      {/* Use type assertion to tell TypeScript what specific type we're using */}
      {(successEffect.particles as SuccessParticleConfig[]).map((particle) => (
        <a-entity
          key={particle.key}
          geometry={particle.geometry}
          material={particle.material}
          position={particle.position}
          animation={particle.animation}
          animation__opacity={particle.animation__opacity}
        />
      ))}
    </a-entity>
  );
};

/**
 * Render a weather effect using JSX
 */
export const renderWeatherEffect = (
  type: 'rain' | 'snow' | 'leaves',
  intensity: number = 1.0,
  area: number = 10
): JSX.Element => {
  const weatherEffect = createWeatherEffectConfig(type, intensity, area);
  
  return (
    <a-entity position={weatherEffect.position} id={weatherEffect.id}>
      {/* Use type assertion to tell TypeScript what specific type we're using */}
      {(weatherEffect.particles as WeatherParticleConfig[]).map((particle) => (
        <a-entity
          key={particle.key}
          position={particle.position}
        >
          <a-sphere
            radius={particle.radius}
            color={particle.color}
            opacity={particle.opacity}
            transparent={particle.transparent}
            animation={particle.animation}
            animation__rotate={particle.animation__rotate}
          />
        </a-entity>
      ))}
    </a-entity>
  );
};
