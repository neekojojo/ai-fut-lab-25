
// A collection of reusable custom A-Frame components

// Register all custom components - called once on app initialization
export const registerCustomAframeComponents = (): void => {
  if (typeof window !== 'undefined' && window.AFRAME) {
    // Info popup component
    window.AFRAME.registerComponent('show-info', {
      schema: {
        info: {type: 'string', default: ''},
        title: {type: 'string', default: ''}
      },
      init: function() {
        const el = this.el;
        const data = this.data;
        
        // Create info panel entity
        const infoPanel = document.createElement('a-entity');
        infoPanel.setAttribute('visible', 'false');
        infoPanel.setAttribute('position', '0 0.6 0');
        
        // Background panel
        const panel = document.createElement('a-plane');
        panel.setAttribute('color', '#1A1F2C');
        panel.setAttribute('width', '1.5');
        panel.setAttribute('height', '0.8');
        panel.setAttribute('opacity', '0.85');
        infoPanel.appendChild(panel);
        
        // Title text
        const titleText = document.createElement('a-text');
        titleText.setAttribute('value', data.title);
        titleText.setAttribute('width', '1.4');
        titleText.setAttribute('position', '0 0.25 0.01');
        titleText.setAttribute('color', '#FFFFFF');
        titleText.setAttribute('align', 'center');
        infoPanel.appendChild(titleText);
        
        // Info text
        const infoText = document.createElement('a-text');
        infoText.setAttribute('value', data.info);
        infoText.setAttribute('width', '1.4');
        infoText.setAttribute('position', '0 0 0.01');
        infoText.setAttribute('color', '#FFFFFF');
        infoText.setAttribute('align', 'center');
        infoText.setAttribute('baseline', 'top');
        infoPanel.appendChild(infoText);
        
        // Close button
        const closeBtn = document.createElement('a-text');
        closeBtn.setAttribute('value', '×');
        closeBtn.setAttribute('position', '0.65 0.3 0.01');
        closeBtn.setAttribute('color', '#FFFFFF');
        closeBtn.setAttribute('align', 'center');
        closeBtn.setAttribute('class', 'clickable');
        infoPanel.appendChild(closeBtn);
        
        el.appendChild(infoPanel);
        
        // Show/hide info panel on click
        const toggleInfo = function() {
          const visible = infoPanel.getAttribute('visible');
          infoPanel.setAttribute('visible', visible === 'true' ? 'false' : 'true');
        };
        
        el.addEventListener('click', toggleInfo);
        closeBtn.addEventListener('click', toggleInfo);
      }
    });
    
    // Rotate component
    window.AFRAME.registerComponent('auto-rotate', {
      schema: {
        speed: {type: 'number', default: 2}
      },
      tick: function(time, deltaTime) {
        const rotation = this.el.getAttribute('rotation');
        this.el.setAttribute('rotation', {
          x: rotation.x,
          y: (rotation.y + this.data.speed * deltaTime / 1000) % 360,
          z: rotation.z
        });
      }
    });
  }
};

// Helper function to get color based on risk level
export const getRiskColor = (risk: number): string => {
  if (risk < 30) return '#10B981'; // Green for low risk
  if (risk < 70) return '#F97316'; // Orange for medium risk
  return '#EF4444'; // Red for high risk
};

// Scale values for visualization
export const scaleValue = (value: number, max: number = 100): number => (value / max) * 2;
