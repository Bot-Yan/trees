// ===== 公共组件：回到首页 + 侧边栏 =====
(function () {
  // 1. 创建“回到首页”按钮（固定左上角）
  const backHome = document.createElement('a');
  backHome.href = 'index.html';
  backHome.className = 'back-home';
  backHome.innerHTML = '回到首页';
  document.body.prepend(backHome);
})()
// ---------- 2. 检查当前页面是否定义了侧边栏内容数据 ----------
var items = window.sidebarItems || [
];
  // ---------- 3. 生成侧边栏内容行 ----------
  var linesHtml = items.map(function(item) {
    return '<div class="np-toc-line"><b>' + item.label + '</b>' + item.name + '<span class="np-toc-n">' + item.count + '</span></div>';
  }).join('');
   // ---------- 3. 生成侧边栏内容行 ----------
  var linesHtml = items.map(function(item) {
    return '<div class="np-toc-line"><b>' + item.label + '</b>' + item.name + '<span class="np-toc-n">' + item.count + '</span></div>';
  }).join('');

  // ---------- 4. 创建侧边栏 HTML ----------
  var drawerHTML = `
    <aside class="toc-drawer" id="tocDrawer">
      <div class="toc-tab" id="tocHandle">
        <img src="assets/paw.svg" alt="猫爪" width="32" height="32">
        本<br>期<br>要<br>目
      </div>
      <div class="toc-inner">
        <div class="toc-header">
          <span class="toc-title"><img src="assets/paw.svg" alt="猫爪" width="28" height="28" style="margin-right:6px;"> 本期要目</span>
          <button class="toc-close" id="tocClose">✕</button>
        </div>
        ${linesHtml}
      </div>
    </aside>
  `;
  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  // ---------- 5. 绑定侧边栏交互 ----------
  var handle = document.getElementById('tocHandle');
  var drawer = document.getElementById('tocDrawer');
  var closeBtn = document.getElementById('tocClose');

  if (handle && drawer && closeBtn) {
    handle.addEventListener('click', function(e) {
      e.stopPropagation();
      drawer.classList.toggle('open');
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      drawer.classList.remove('open');
    });

    document.addEventListener('click', function(e) {
      if (drawer.classList.contains('open') && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });
  }