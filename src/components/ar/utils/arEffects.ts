// Advanced AR effect utilities

export interface AnimationConfig {
  property: string;
  from?: string | number;
  to: string | number;
  dur: number;
  easing?: string;
  delay?: number;
  dir?: 'normal' | 'reverse' | 'alternate';
  loop?: boolean | number;
  startEvents?: string;
  pauseEvents?: string;
  resumeEvents?: string;
}

export interface TrailConfig {
  key: string;
  className: string;
  geometry: string;
  material: string;
  position: string;
  animation__fade: string;
  animation__scale: string;
}

export interface ParticleConfig {
  key: string;
  radius: number;
  position: string;
  color: string;
  opacity: string;
  transparent: string;
  animation: string;
  animation__fade: string;
}

export interface SuccessParticleConfig {
  key: string;
  geometry: string;
  material: string;
  position: string;
  animation: string;
  animation__opacity: string;
}

export interface WeatherParticleConfig {
  key: string;
  position: string;
  radius: number;
  color: string;
  opacity: string;
  transparent: string;
  animation: string;
  animation__rotate?: string;
}

export interface EntityConfig<T = any> {
  position: string;
  id?: string;
  particles: T[];
}

/**
 * Create an animation string for A-Frame elements
 */
export const createAnimation = (config: AnimationConfig): string => {
  const {
    property,
    from,
    to,
    dur,
    easing = 'easeInOutSine',
    delay = 0,
    dir = 'normal',
    loop = false,
    startEvents,
    pauseEvents,
    resumeEvents
  } = config;
  
  let animation = `property: ${property}; to: ${to}; dur: ${dur}; easing: ${easing}; delay: ${delay}; dir: ${dir}`;
  
  if (from !== undefined) {
    animation += `; from: ${from}`;
  }
  
  if (loop === true) {
    animation += '; loop: true';
  } else if (typeof loop === 'number') {
    animation += `; loop: ${loop}`;
  }
  
  if (startEvents) {
    animation += `; startEvents: ${startEvents}`;
  }
  
  if (pauseEvents) {
    animation += `; pauseEvents: ${pauseEvents}`;
  }
  
  if (resumeEvents) {
    animation += `; resumeEvents: ${resumeEvents}`;
  }
  
  return animation;
};

/**
 * Create a pulsing animation
 */
export const createPulseAnimation = (
  intensity: number = 0.2, 
  duration: number = 1000
): string => {
  return createAnimation({
    property: 'scale',
    to: `${1 + intensity} ${1 + intensity} ${1 + intensity}`,
    dur: duration,
    dir: 'alternate',
    loop: true,
    easing: 'easeInOutQuad'
  });
};

/**
 * Create a float animation (up and down movement)
 */
export const createFloatAnimation = (
  height: number = 0.1,
  duration: number = 2000
): string => {
  return createAnimation({
    property: 'position',
    to: `0 ${height} 0`,
    dur: duration,
    dir: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });
};

/**
 * Create a highlight animation
 */
export const createHighlightAnimation = (): string => {
  return createAnimation({
    property: 'material.emissive',
    from: '#000000',
    to: '#444444',
    dur: 500,
    dir: 'alternate',
    loop: true
  });
};

/**
 * Create a trail effect config (returns config objects)
 */
export const createTrailEffectConfig = (
  positionAttribute: string,
  count: number = 5,
  color: string = '#FFFFFF',
  fadeDuration: number = 1000
): TrailConfig[] => {
  const trails: TrailConfig[] = [];
  
  for (let i = 0; i < count; i++) {
    trails.push({
      key: `trail-${i}`,
      className: "trail-particle",
      geometry: "primitive: sphere; radius: 0.05",
      material: `color: ${color}; opacity: 0.7; transparent: true`,
      position: positionAttribute,
      animation__fade: createAnimation({
        property: 'material.opacity',
        from: 0.7,
        to: 0,
        dur: fadeDuration,
        delay: i * (fadeDuration / count)
      }),
      animation__scale: createAnimation({
        property: 'scale',
        from: '1 1 1',
        to: '0.5 0.5 0.5',
        dur: fadeDuration,
        delay: i * (fadeDuration / count)
      })
    });
  }
  
  return trails;
};

/**
 * Create a glowing effect attribute string
 */
export const createGlowEffect = (color: string = '#FFFFFF', intensity: number = 0.5): string => {
  return `emissive: ${color}; emissiveIntensity: ${intensity}`;
};

/**
 * Get color based on skill level
 */
export const getSkillLevelColor = (level: number): string => {
  if (level < 30) return '#FF4444'; // Beginner - Red
  if (level < 60) return '#FFBB44'; // Intermediate - Orange
  if (level < 80) return '#44BB44'; // Advanced - Green
  return '#44AAFF'; // Expert - Blue
};

/**
 * Animate an object along a path
 */
export const createPathAnimation = (
  points: {x: number, y: number, z: number}[],
  duration: number = 5000,
  loop: boolean = true
): string => {
  // Convert points to A-Frame path format
  const path = points.map(p => `${p.x} ${p.y} ${p.z}`).join(', ');
  
  return `property: position; path: ${path}; dur: ${duration}; loop: ${loop ? 'true' : 'false'}; easing: linear`;
};

/**
 * Create a particle system config (returns config object)
 */
export const createParticleSystemConfig = (
  position: string,
  color: string = '#FFFFFF',
  count: number = 20,
  duration: number = 2000,
  size: number = 0.05
): EntityConfig<ParticleConfig> => {
  const particles: ParticleConfig[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 0.5 + Math.random() * 0.5;
    const x = Math.sin(angle) * radius;
    const y = Math.random() * 0.5;
    const z = Math.cos(angle) * radius;
    
    particles.push({
      key: `particle-${i}`,
      radius: size,
      position: "0 0 0",
      color: color,
      opacity: "0.7",
      transparent: "true",
      animation: createAnimation({
        property: 'position',
        to: `${x} ${y} ${z}`,
        dur: duration + (Math.random() * 500),
        easing: 'easeOutQuad'
      }),
      animation__fade: createAnimation({
        property: 'opacity',
        from: 0.7,
        to: 0,
        dur: duration * 0.8,
        delay: duration * 0.2
      })
    });
  }
  
  return {
    position,
    particles
  };
};

/**
 * Create celebratory particle effect config
 */
export const createSuccessEffectConfig = (position: string): EntityConfig<SuccessParticleConfig> => {
  const particles: SuccessParticleConfig[] = [];
  
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const x = Math.sin(angle) * 0.5;
    const z = Math.cos(angle) * 0.5;
    
    particles.push({
      key: `particle-${i}`,
      geometry: "primitive: sphere; radius: 0.05",
      material: "color: #44FF44; emissive: #22AA22",
      position: "0 0 0",
      animation: createAnimation({
        property: 'position',
        to: `${x} 0.5 ${z}`,
        dur: 1000 + (Math.random() * 500)
      }),
      animation__opacity: createAnimation({
        property: 'material.opacity',
        from: 1,
        to: 0,
        dur: 1000,
        delay: 500
      })
    });
  }
  
  return {
    position,
    particles
  };
};

/**
 * Create an environmental effect config (rain, snow, etc.)
 */
export const createWeatherEffectConfig = (
  type: 'rain' | 'snow' | 'leaves',
  intensity: number = 1.0,
  area: number = 10
): EntityConfig<WeatherParticleConfig> => {
  const count = Math.floor(50 * intensity);
  const colors = {
    rain: '#8Bf5FF',
    snow: '#FFFFFF',
    leaves: '#65A15A'
  };
  const sizes = {
    rain: 0.03,
    snow: 0.05,
    leaves: 0.1
  };
  const speeds = {
    rain: 3,
    snow: 1,
    leaves: 1.5
  };
  
  const particles: WeatherParticleConfig[] = [];
  
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * area;
    const z = (Math.random() - 0.5) * area;
    const delay = Math.random() * 5000;
    const duration = 2000 / speeds[type];
    
    const particleConfig: WeatherParticleConfig = {
      key: `weather-particle-${i}`,
      position: `${x} 0 ${z}`,
      radius: sizes[type],
      color: colors[type],
      opacity: "0.7",
      transparent: "true",
      animation: createAnimation({
        property: 'position.y',
        from: 0,
        to: -8,
        dur: duration,
        delay: delay,
        loop: true
      })
    };
    
    if (type === 'leaves') {
      particleConfig.animation__rotate = createAnimation({
        property: 'rotation',
        to: '360 360 360',
        dur: duration * 2,
        loop: true
      });
    }
    
    particles.push(particleConfig);
  }
  
  return {
    position: "0 8 0",
    id: `weather-${type}`,
    particles
  };
};
