document.addEventListener("DOMContentLoaded", () => {
  const origin = document.querySelector(".hexo-blog-encrypt");
  if (!origin) return;

  const input = origin.querySelector("input");
  const button = origin.querySelector("button");
  const msg = origin.querySelector(".wrong-pass");

  const wrapper = document.createElement("div");
  wrapper.className = "hbe-container";

  const inner = document.createElement("div");
  inner.className = "hbe-input-container";

  const title = document.createElement("div");
  title.className = "hbe-title";
  title.innerText = "请输入访问密码";

  input.classList.add("hbe-input");
  button.classList.add("hbe-button");
  msg && msg.classList.add("hbe-wrong-pass-message");

  inner.appendChild(title);
  inner.appendChild(input);
  inner.appendChild(button);
  msg && inner.appendChild(msg);

  wrapper.appendChild(inner);

  origin.replaceWith(wrapper);

  if (msg) {
    const observer = new MutationObserver(() => {
      msg.style.display = msg.innerText ? "block" : "none";
    });
    observer.observe(msg, { childList: true });
  }
});
