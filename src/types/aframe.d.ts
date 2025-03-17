
// Type definitions for A-Frame components in JSX
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-entity': any;
      'a-box': any;
      'a-sphere': any;
      'a-cylinder': any;
      'a-plane': any;
      'a-sky': any;
      'a-text': any;
      'a-camera': any;
      'a-cursor': any;
      'a-light': any;
      'a-torus': any;
      'a-ring': any;
      'a-circle': any;
    }
  }

  interface Window {
    AFRAME: any;
  }
}

export {};
