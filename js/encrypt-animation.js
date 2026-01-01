// encrypt-animation.js — small enhancer for hexo-blog-encrypt UI
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('hexo-blog-encrypt');
    if (!root) return;

    // input 元素（插件默认）
    const input = document.getElementById('hbePass');
    const contentBox = root.querySelector('.hbe-content') || root;

    // 1) 插入一个显眼的标题（取自 label 的 data-content）
    const labelSpan = root.querySelector('.hbe-input-label-content');
    if (labelSpan && !root.querySelector('.hbe-title')) {
      const titleText = labelSpan.getAttribute('data-content') || labelSpan.textContent || '请输入访问密码：';
      const title = document.createElement('div');
      title.className = 'hbe-title';
      title.textContent = titleText;
      // 放到 content 之上
      contentBox.insertBefore(title, contentBox.firstChild);
      // 隐藏原 label（样式文件已设置）
      // labelSpan.style.display = 'none'; // CSS 已处理
    }

    // 2) 插入解锁按钮（如果页面中还没有）
    if (input && !root.querySelector('.hbe-button')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hbe-button';
      btn.textContent = '解锁查看';
      // 点击时模拟回车（大多数 hbe 插件都监听回车或 input 事件）
      btn.addEventListener('click', function () {
        input.focus();
        const ev = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true });
        input.dispatchEvent(ev);
      }, false);
      // 将按钮放到 input 父容器后面
      const inputParent = input.closest('.hbe-input') || input.parentElement;
      inputParent && inputParent.appendChild(btn);
    }

    // 3) 简单检测错误提示，并把它放到漂亮的容器（如果插件把文本直接写入 root.innerText，我们也尝试捕获）
    const observe = new MutationObserver(function (records) {
      records.forEach(r => {
        // 查找是否出现密码错误文本（使用 data-wpm / data-whm 配置）
        const msg = root.querySelector('.hbe-wrong-pass-message');
        if (msg) return; // 已存在样式化提示
        // 一些插件会设置 .hbe-message 或直接插入文本节点，我们尝试匹配常见字符串
        const inner = root.textContent || '';
        const wpm = root.getAttribute('data-wpm') || '密码错误';
        if (inner && inner.indexOf(wpm) !== -1) {
          const container = document.createElement('div');
          container.className = 'hbe-wrong-pass-message';
          container.textContent = wpm;
          contentBox.appendChild(container);
        }
      });
    });
    observe.observe(root, { childList: true, subtree: true });
  });
})();
