(function () {
  // ===== 1. 回到首页按钮 =====
  const backHome = document.createElement('a');
  backHome.href = 'index.html';
  backHome.className = 'back-home';
  backHome.innerHTML = '回到首页';
  document.body.prepend(backHome);

  // ===== 2. 侧边栏 =====
  var items = window.sidebarItems || [];
  var linesHtml = items.map(function (item) {
    return '<div class="np-toc-line"><b>' + item.label + '</b>' + item.name + '<span class="np-toc-n">' + item.count + '</span></div>';
  }).join('');

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

  var handle = document.getElementById('tocHandle');
  var drawer = document.getElementById('tocDrawer');
  var closeBtn = document.getElementById('tocClose');

  if (handle && drawer && closeBtn) {
    handle.addEventListener('click', function (e) {
      e.stopPropagation();
      drawer.classList.toggle('open');
    });
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      drawer.classList.remove('open');
    });
    document.addEventListener('click', function (e) {
      if (drawer.classList.contains('open') && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });
  }

  // ===== 3. 网盘按钮：两段式（先复制，再打开） =====
  document.querySelectorAll('.dl-card-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = this.dataset.code;
      var url = this.dataset.url;

      // 1. 立刻复制
      copyTextSync(code);
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).catch(function () { });
      }

      // 2. 立刻弹提示
      showToast('提取码 ' + code + ' 已复制！正在打开链接…');

      // 3. 延迟 800ms 再打开，让用户看到提示
      setTimeout(function () {
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 800);
    });
  });
  // 复制函数（同步，兼容性最好）
  function copyTextSync(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.width = '1px';
    ta.style.height = '1px';
    ta.style.padding = '0';
    ta.style.border = 'none';
    ta.style.opacity = '0';
    document.body.appendChild(ta);

    var ok = false;
    try {
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      ok = document.execCommand('copy');
    } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  // 复制失败时自动选中提取码，方便用户手动复制
  function selectCodeText(btn) {
    var card = btn.closest('.dl-card');
    if (!card) return;
    var codeEl = card.querySelector('.dl-card-code-val');
    if (!codeEl) return;
    var range = document.createRange();
    range.selectNodeContents(codeEl);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Toast 提示
  function showToast(msg) {
    var t = document.getElementById('dl-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'dl-toast';
      t.className = 'dl-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(function () { t.classList.remove('show'); }, 3000);
  }
})();