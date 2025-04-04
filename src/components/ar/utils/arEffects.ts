
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
 * Create a trail effect (returns JSX elements)
 */
export const createTrailEffect = (
  positionAttribute: string,
  count: number = 5,
  color: string = '#FFFFFF',
  fadeDuration: number = 1000
): JSX.Element[] => {
  const trails: JSX.Element[] = [];
  
  for (let i = 0; i < count; i++) {
    trails.push(
      <a-entity
        key={`trail-${i}`}
        className="trail-particle"
        geometry="primitive: sphere; radius: 0.05"
        material={`color: ${color}; opacity: 0.7; transparent: true`}
        position={positionAttribute}
        animation__fade={createAnimation({
          property: 'material.opacity',
          from: 0.7,
          to: 0,
          dur: fadeDuration,
          delay: i * (fadeDuration / count)
        })}
        animation__scale={createAnimation({
          property: 'scale',
          from: '1 1 1',
          to: '0.5 0.5 0.5',
          dur: fadeDuration,
          delay: i * (fadeDuration / count)
        })}
      />
    );
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
 * Create celebratory particle effect (returns JSX element)
 */
export const createSuccessEffect = (position: string): JSX.Element => {
  return (
    <a-entity position={position}>
      {/* Generate multiple particles with random directions */}
      {Array(10).fill(0).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const x = Math.sin(angle) * 0.5;
        const z = Math.cos(angle) * 0.5;
        
        return (
          <a-entity
            key={`particle-${i}`}
            geometry="primitive: sphere; radius: 0.05"
            material="color: #44FF44; emissive: #22AA22"
            position="0 0 0"
            animation={createAnimation({
              property: 'position',
              to: `${x} 0.5 ${z}`,
              dur: 1000 + (Math.random() * 500)
            })}
            animation__opacity={createAnimation({
              property: 'material.opacity',
              from: 1,
              to: 0,
              dur: 1000,
              delay: 500
            })}
          />
        );
      })}
    </a-entity>
  );
};
