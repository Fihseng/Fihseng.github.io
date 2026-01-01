// 加密文章解锁动画效果
document.addEventListener('DOMContentLoaded', function() {
  // 监听密码输入框
  const passwordInputs = document.querySelectorAll('.hbe-input');
  
  passwordInputs.forEach(input => {
    // 输入时效果
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
    
    // 输入正确密码时的动画
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const button = this.closest('.hbe-container').querySelector('.hbe-button');
        if (button) {
          button.style.animation = 'none';
          setTimeout(() => {
            button.style.animation = 'pulse 0.5s';
          }, 10);
        }
      }
    });
  });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hbe-container {
    animation: slideIn 0.6s ease-out;
  }
`;
document.head.appendChild(style);