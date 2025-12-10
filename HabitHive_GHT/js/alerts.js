// Interactive Professional Alert System
class ProfessionalAlerts {
  constructor() {
    this.init();
  }

  init() {
    this.addStyles();
    this.replaceAlerts();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .alert-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(8px);
      }

      .alert-overlay.show {
        opacity: 1;
        visibility: visible;
      }

      .alert-box {
        background: white;
        border-radius: 16px;
        padding: 32px 24px;
        width: 90%;
        max-width: 420px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
        transform: scale(0.8) translateY(40px) rotateX(15deg);
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .alert-overlay.show .alert-box {
        transform: scale(1) translateY(0) rotateX(0deg);
      }

      .alert-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.8s ease;
      }

      .alert-box.shimmer::before {
        left: 100%;
      }

      .alert-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
        position: relative;
        animation: iconPulse 2s ease-in-out infinite;
      }

      @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .alert-icon::after {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 50%;
        border: 2px solid currentColor;
        opacity: 0;
        animation: ripple 2s ease-out infinite;
      }

      @keyframes ripple {
        0% {
          transform: scale(0.8);
          opacity: 1;
        }
        100% {
          transform: scale(1.4);
          opacity: 0;
        }
      }

      .alert-icon.success {
        background: linear-gradient(135deg, var(--primary-green), var(--primary-green-light));
        color: white;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
      }

      .alert-icon.error {
        background: linear-gradient(135deg, #dc3545, #ff6b7a);
        color: white;
        box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
      }

      .alert-icon.warning {
        background: linear-gradient(135deg, #ffc107, #ffdb4d);
        color: #212529;
        box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
      }

      .alert-icon.info {
        background: linear-gradient(135deg, #17a2b8, #5bc0de);
        color: white;
        box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
      }

      .alert-title {
        font-size: 22px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 12px;
        animation: slideInUp 0.6s ease-out 0.2s both;
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .alert-message {
        color: var(--text-secondary);
        margin-bottom: 28px;
        line-height: 1.6;
        font-size: 15px;
        animation: slideInUp 0.6s ease-out 0.4s both;
      }

      .alert-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        animation: slideInUp 0.6s ease-out 0.6s both;
      }

      .alert-button {
        padding: 14px 28px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 14px;
        border: none;
        position: relative;
        overflow: hidden;
        min-width: 120px;
      }

      .alert-button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
      }

      .alert-button:active::before {
        width: 300px;
        height: 300px;
      }

      .alert-button.primary {
        background: linear-gradient(135deg, var(--primary-green), var(--primary-green-dark));
        color: white;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
      }

      .alert-button.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
      }

      .alert-button.secondary {
        background: transparent;
        color: var(--text-secondary);
        border: 2px solid var(--border-light);
      }

      .alert-button.secondary:hover {
        background: var(--background-light);
        transform: translateY(-1px);
      }

      .confetti {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--primary-green);
        animation: confetti-fall 3s linear infinite;
      }

      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }

      .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--primary-green);
        transition: width 0.1s linear;
        border-radius: 0 0 16px 16px;
      }

      @media (max-width: 480px) {
        .alert-box {
          margin: 20px;
          width: calc(100% - 40px);
          padding: 24px 20px;
        }
        
        .alert-icon {
          width: 60px;
          height: 60px;
          font-size: 24px;
        }
        
        .alert-title {
          font-size: 18px;
        }
        
        .alert-actions {
          flex-direction: column;
        }
        
        .alert-button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  show(message, type = 'info', options = {}) {
    // Determine alert type and content
    let title, icon;
    
    if (message.toLowerCase().includes('success') || message.toLowerCase().includes('submitted') || message.toLowerCase().includes('saved')) {
      type = 'success';
      title = 'Success!';
      icon = '✓';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed') || message.toLowerCase().includes('unable')) {
      type = 'error';
      title = 'Error';
      icon = '✕';
    } else if (message.toLowerCase().includes('please') || message.toLowerCase().includes('warning')) {
      type = 'warning';
      title = 'Notice';
      icon = '⚠';
    } else {
      type = 'info';
      title = 'Information';
      icon = 'ℹ';
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    
    // Determine if we should show action buttons
    const showActions = options.showActions !== false;
    const actionButtons = showActions ? `
      <div class="alert-actions">
        <button class="alert-button primary">OK</button>
        ${type === 'success' && message.toLowerCase().includes('habit') ? 
          '<button class="alert-button secondary">View Progress</button>' : ''}
      </div>
    ` : `
      <div class="alert-actions">
        <button class="alert-button primary">OK</button>
      </div>
    `;
    
    overlay.innerHTML = `
      <div class="alert-box">
        <div class="alert-icon ${type}">
          ${icon}
        </div>
        <div class="alert-title">${title}</div>
        <div class="alert-message">${message}</div>
        ${actionButtons}
        ${type === 'success' ? '<div class="progress-bar" style="width: 0%"></div>' : ''}
      </div>
    `;

    document.body.appendChild(overlay);

    // Add confetti for success messages
    if (type === 'success') {
      this.createConfetti(overlay);
    }

    // Show with animation
    setTimeout(() => {
      overlay.classList.add('show');
      // Add shimmer effect
      setTimeout(() => {
        overlay.querySelector('.alert-box').classList.add('shimmer');
      }, 500);
    }, 10);

    // Handle progress bar for success messages
    if (type === 'success') {
      const progressBar = overlay.querySelector('.progress-bar');
      if (progressBar) {
        let width = 0;
        const interval = setInterval(() => {
          width += 2;
          progressBar.style.width = width + '%';
          if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => this.closeAlert(overlay), 500);
          }
        }, 100);
      }
    }

    // Handle close
    const buttons = overlay.querySelectorAll('.alert-button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (index === 1 && button.textContent === 'View Progress') {
          // Navigate to dashboard
          window.location.href = 'dashboard.html';
        }
        this.closeAlert(overlay);
      });
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeAlert(overlay);
    });

    // Auto-close for non-success messages after 8 seconds
    if (type !== 'success') {
      setTimeout(() => this.closeAlert(overlay), 8000);
    }
  }

  createConfetti(container) {
    const colors = ['#4CAF50', '#81C784', '#2E7D32', '#A5D6A7', '#C8E6C9'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      container.appendChild(confetti);
    }
  }

  closeAlert(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 400);
  }

  replaceAlerts() {
    // Replace the global alert function
    window.originalAlert = window.alert;
    window.alert = (message) => {
      this.show(message);
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.professionalAlerts = new ProfessionalAlerts();
});