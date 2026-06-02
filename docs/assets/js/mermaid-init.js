// MkDocs Material의 mermaid 자동 통합이 일부 환경에서 빈 블록만 남기고 렌더되지 않는 문제를 우회한다.
// superfences가 ```mermaid 펜스를 <pre class="mermaid-src"><code>SOURCE</code></pre> 로 출력하면,
// 이 스크립트가 CDN mermaid를 불러와 직접 SVG로 렌더링한다. (GitHub.com은 .md mermaid를 자체 렌더하므로 영향 없음)
(function () {
  function pickTheme() {
    var scheme = document.body && document.body.getAttribute('data-md-color-scheme');
    return scheme === 'slate' ? 'dark' : 'default';
  }
  function renderAll() {
    if (!window.mermaid) return;
    try {
      window.mermaid.initialize({ startOnLoad: false, theme: pickTheme(), securityLevel: 'loose' });
    } catch (e) {}
    var blocks = document.querySelectorAll('pre.mermaid-src:not([data-rendered])');
    blocks.forEach(function (el, i) {
      el.setAttribute('data-rendered', '1');
      var code = (el.textContent || '').trim();
      if (!code) { el.removeAttribute('data-rendered'); return; }
      var id = 'mmd-' + Math.random().toString(36).slice(2) + '-' + i;
      Promise.resolve(window.mermaid.render(id, code)).then(function (res) {
        var svg = (res && res.svg) ? res.svg : res; // mermaid v10: {svg}, 일부 버전: string
        var fig = document.createElement('div');
        fig.className = 'mermaid';
        fig.style.textAlign = 'center';
        fig.innerHTML = svg;
        el.replaceWith(fig);
      }).catch(function (err) {
        console.error('[mermaid-init] render failed:', err);
        el.removeAttribute('data-rendered');
      });
    });
  }
  function loadAndRender() {
    if (window.mermaid) { renderAll(); return; }
    if (document.getElementById('mermaid-cdn')) return;
    var s = document.createElement('script');
    s.id = 'mermaid-cdn';
    s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
    s.onload = renderAll;
    document.head.appendChild(s);
  }
  if (document.readyState !== 'loading') loadAndRender();
  else document.addEventListener('DOMContentLoaded', loadAndRender);
  // Material instant navigation 대응(향후 navigation.instant 활성화 시)
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(function () { setTimeout(loadAndRender, 50); });
  }
})();
