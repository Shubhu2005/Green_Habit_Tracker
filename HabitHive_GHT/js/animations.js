// Enhanced Animation System
class SimpleAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.addStyles();
    this.setupObserver();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced Fade In Animations */
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .fade-in-left {
        opacity: 0;
        transform: translateX(-40px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .fade-in-left.visible {
        opacity: 1;
        transform: translateX(0);
      }

      .fade-in-right {
        opacity: 0;
        transform: translateX(40px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .fade-in-right.visible {
        opacity: 1;
        transform: translateX(0);
      }

      .scale-in {
        opacity: 0;
        transform: scale(0.7) rotate(-5deg);
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .scale-in.visible {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }

      /* Enhanced Stagger Animation */
      .stagger-item {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .stagger-item.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      /* Enhanced Hover Effects with Micro-interactions */
      .habit-box {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .habit-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent);
        transition: left 0.6s ease;
      }

      .habit-box:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
      }

      .habit-box:hover::before {
        left: 100%;
      }

      .feature-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }

      .feature-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.05) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: inherit;
        pointer-events: none;
      }

      .feature-card:hover {
        transform: translateY(-8px) scale(1.03);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
      }

      .feature-card:hover::after {
        opacity: 1;
      }

      .feature-card:hover .icon {
        animation: bounce 0.8s ease;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }

      .card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.8s ease;
      }

      .card:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
      }

      .card:hover::after {
        transform: translateX(100%);
      }

      /* Enhanced Button Animations */
      .btn-primary, .btn-secondary {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .btn-primary::before, .btn-secondary::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.4s ease, height 0.4s ease;
      }

      .btn-primary:hover, .btn-secondary:hover {
        transform: translateY(-3px) scale(1.05);
      }

      .btn-primary:active::before, .btn-secondary:active::before {
        width: 300px;
        height: 300px;
      }

      /* Enhanced Pulse Effect */
      .pulse {
        animation: enhancedPulse 1.5s ease-in-out;
      }

      @keyframes enhancedPulse {
        0% { 
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
        }
        50% { 
          transform: scale(1.1);
          box-shadow: 0 0 0 15px rgba(76, 175, 80, 0);
        }
        100% { 
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
        }
      }

      /* Floating Animation for Icons */
      .float {
        animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }

      /* Glow Effect */
      .glow {
        animation: glow 2s ease-in-out infinite alternate;
      }

      @keyframes glow {
        from { 
          box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
        }
        to { 
          box-shadow: 0 0 30px rgba(76, 175, 80, 0.8), 0 0 40px rgba(76, 175, 80, 0.4);
        }
      }

      /* Shake Animation */
      .shake {
        animation: shake 0.6s ease-in-out;
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
      }

      /* Rotate Animation */
      .rotate {
        animation: rotate 2s linear infinite;
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* Heartbeat Animation */
      .heartbeat {
        animation: heartbeat 1.5s ease-in-out infinite;
      }

      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        14% { transform: scale(1.1); }
        28% { transform: scale(1); }
        42% { transform: scale(1.1); }
        70% { transform: scale(1); }
      }

      /* Switch Enhancement */
      .switch input:checked + .slider {
        background: var(--primary-green);
        box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
        animation: switchGlow 0.3s ease;
      }

      @keyframes switchGlow {
        0% { box-shadow: 0 0 0 rgba(76, 175, 80, 0.5); }
        50% { box-shadow: 0 0 25px rgba(76, 175, 80, 0.8); }
        100% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.5); }
      }

      .switch input:checked + .slider::before {
        transform: translateX(26px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        animation: switchSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes switchSlide {
        0% { transform: translateX(0) scale(1); }
        50% { transform: translateX(13px) scale(1.1); }
        100% { transform: translateX(26px) scale(1); }
      }

      /* Loading Animation */
      .loading {
        animation: loading 1.5s ease-in-out infinite;
      }

      @keyframes loading {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      /* Accessibility - Respect reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .fade-in,
        .fade-in-left,
        .fade-in-right,
        .scale-in,
        .stagger-item {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
        
        .habit-box:hover,
        .feature-card:hover,
        .card:hover,
        .btn-primary:hover,
        .btn-secondary:hover {
          transform: none !important;
        }
        
        .pulse,
        .float,
        .glow,
        .shake,
        .rotate,
        .heartbeat {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('stagger-container')) {
            this.animateStaggerItems(entry.target);
          } else {
            entry.target.classList.add('visible');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements when DOM is ready
    this.observeElements(observer);
    
    // Re-observe when new elements are added
    this.observeNewElements(observer);
  }

  observeElements(observer) {
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-container'
    );
    
    animatedElements.forEach(el => observer.observe(el));
  }

  observeNewElements(observer) {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const animatedElements = node.querySelectorAll(
              '.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-container'
            );
            animatedElements.forEach(el => observer.observe(el));
            
            // Also check if the node itself has animation classes
            if (node.classList && (
              node.classList.contains('fade-in') ||
              node.classList.contains('fade-in-left') ||
              node.classList.contains('fade-in-right') ||
              node.classList.contains('scale-in') ||
              node.classList.contains('stagger-container')
            )) {
              observer.observe(node);
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  animateStaggerItems(container) {
    const items = container.querySelectorAll('.stagger-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 150); // Increased delay for more dramatic effect
    });
  }

  // Enhanced utility functions
  addPulse(element) {
    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 1500);
  }

  addGlow(element, duration = 2000) {
    element.classList.add('glow');
    setTimeout(() => {
      element.classList.remove('glow');
    }, duration);
  }

  addShake(element) {
    element.classList.add('shake');
    setTimeout(() => {
      element.classList.remove('shake');
    }, 600);
  }

  addFloat(element, duration = 3000) {
    element.classList.add('float');
    setTimeout(() => {
      element.classList.remove('float');
    }, duration);
  }

  addHeartbeat(element, duration = 3000) {
    element.classList.add('heartbeat');
    setTimeout(() => {
      element.classList.remove('heartbeat');
    }, duration);
  }

  addRotate(element, duration = 2000) {
    element.classList.add('rotate');
    setTimeout(() => {
      element.classList.remove('rotate');
    }, duration);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.simpleAnimations = new SimpleAnimations();
});