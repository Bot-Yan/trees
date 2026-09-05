/// 首次访问欢迎弹窗 + 致谢名单（Cookie 控制，365 天内只弹一次）
(function () {
  var KEY = 'fj_site_visited_v1';
  function getCookie(n) { var m = document.cookie.match('(^|; )' + n + '=([^;]*)'); return m ? decodeURIComponent(m[2]) : null; }
  function setCookie(n, v, days) { var d = new Date(); d.setTime(d.getTime() + days * 864e5); document.cookie = n + '=' + encodeURIComponent(v) + '; expires=' + d.toUTCString() + '; path=/'; }

  // ---------- 致谢名单 ----------
  var ACK_TEXT = `
独家特约合作伙伴 | 微信公众号 · 许愿碎碎念、微信公众号 · 亦课
特约协作 | Three.
文件协作 | 听、风吹过的音符、TOM、lant
部分文件提供  | Always、口古礻申、Clearly、我芝是一只年糕、Belief、QwQ、觎竹、静静等待结果、睿、解：原式、你花不是青木厨、Q.Ицзи、新叶殇、桜木羑真、墨染棠梨、⛄
`;

  // 把名单文本按行拆开，拼成条目 HTML
  function ackItemsHtml() {
    var out = '';
    var lines = ACK_TEXT.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].replace(/^\s+|\s+$/g, '');   // 去掉行首尾空白
      if (line === '') continue;                        // 跳过空行
      var cut = line.indexOf('|');
      var role = cut > 0 ? line.slice(0, cut).replace(/\s+$/, '') : '';
      var name = cut > 0 ? line.slice(cut + 1).replace(/^\s+/, '') : line;
      out += '<div class="ack-item">'
        + (role !== '' ? '<div class="ack-role">' + role + '</div>' : '')
        + '<div class="ack-name">' + name + '</div>'
        + '</div>';
    }
    return out;
  }

  // 卡片内滑入面板 与 独立弹窗 复用同一份 HTML。
  // ✕ 带 id="ackModalX" 供独立弹窗用 e.target.id 判断；卡片内那份必须用
  // querySelector('.ack-x') 取，不用 getElementById（两处 id 会重复）。
  var ACK_HTML =
    '<div class="ack-panel">'
    + '<button type="button" class="ack-x" id="ackModalX" aria-label="关闭致谢名单">✕</button>'
    + '<div class="ack-head">'
    + '<div class="ack-kicker">Thanks</div>'
    + '<h3 class="ack-title"> 致谢名单</h3>'
    + '</div>'
    + '<div class="ack-body">'
    + ackItemsHtml()
    + '</div>'
    + '</div>';

  // 独立致谢弹窗（全屏遮罩 + 居中卡片），点 ✕ 或遮罩关闭
  function closeAckModal() {
    var modal = document.getElementById('ackModal');
    if (!modal) return;
    modal.classList.add('ack-hide');
    setTimeout(function () { if (modal.parentNode) modal.parentNode.removeChild(modal); }, 220);
  }
  function openAckModal() {
    if (document.getElementById('ackModal')) return;   // 幂等：已开则不重复插入
    var modal = document.createElement('div');
    modal.className = 'ack-overlay';
    modal.id = 'ackModal';
    modal.innerHTML = '<div class="ack-modal-card">' + ACK_HTML + '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.id === 'ackModalX') closeAckModal();
    });
  }

  // 首页「资料持续整理中…」下一行的致谢入口（朴素文字按钮，幂等：已存在则不重复插入）
  function showAckEntry() {
    if (document.getElementById('ackEntry')) return;
    var foot = document.querySelector('.home-foot');
    if (!foot || !foot.parentNode) return;   // 非首页 / 结构缺失时静默跳过
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'ackEntry';
    btn.className = 'ack-entry';
    btn.innerHTML = ' 致谢名单';
    btn.addEventListener('click', openAckModal);
    foot.parentNode.insertBefore(btn, foot.nextSibling);
  }

  // 已访问过 → 不弹欢迎窗，首页致谢入口直接显示
  if (getCookie(KEY)) { showAckEntry(); return; }

  var paras = [
    '高三这一年，最让人崩溃的，除了做不完的题，大概就是到处找卷子了吧。',
    '每天在各大群里潜水，在各种网盘里翻找，好不容易下载了几个G的压缩包，解压一看，要么是外省根本不对口的题，要么水印横天，甚至货不对板。找题半小时，做题五分钟，白白浪费了最宝贵的复习时间。',
    '这也是我决定花几个月时间，死磕出这套省内全科电子卷的初衷。',
    '先跟大家交个底：这套卷子主打一个“原汁原味”。它没有花里胡哨的包装，全是我们省内各个学校、各个地市、各个阶段的实战卷子。因为卷子实在太多了，我确实没精力一套套去精修或者严格审核，里面可能偶尔会有扫描试卷的小瑕疵，或者个别听力的缺失，大家用的时候稍微留意一下，如果有明显错误也欢迎随时告诉我。',
    '有人问我，为什么只做咱们省的？因为我知道，高考复习最忌讳“病急乱投医”。外省的题再好，如果不符合咱们省的考情，做再多也是白费力气。我想做的，就是帮大家把咱们省内最真实、最接地气的卷子集中起来，省去你们到处找题、筛题的时间。',
    '这套卷子没有任何套路，没有引流，也没有水印。干干净净，大家直接拿去刷就好。',
    '整理这些卷子的工程量确实庞大。这几个月里，我每天都在对着电脑核对来源、重命名、分类，眼睛酸了滴点眼药水继续，也搭进去了不少买资料的钱。但每当我想到，这些卷子能帮某个同学省下找题的时间，让他能多睡半个小时，或者在某个刷题刷到崩溃的夜晚，这些卷子给了他一点点方向感……我就觉得，我这几个月掉的头发、熬过的夜，全都值了。',
    '当然，如果你用了这套卷子，觉得它真的帮到了你，并且愿意支持一下这个在屏幕前默默敲键盘的“无情收集机器”，欢迎多多转存网盘链接或者帮忙拉新。',
    '你的支持，绝对不会改变这套卷子“永久免费”的初心。它只会变成一杯咖啡，或者一张月卡，成为我继续为大家死磕细节、收集更多好卷子的最大动力。',
    '哪怕你什么都不做，只是在心里默默留下一句“加油”，我也已经非常开心了。'
  ];
  var bodyHtml = paras.map(function (t) { return '<p>' + t + '</p>'; }).join('')
    + '<p class="closing">乾坤未定，你我皆是黑马。<br>愿我们都能在顶峰相见！</p>';

  var overlay = document.createElement('div');
  overlay.className = 'welcome-overlay';
  overlay.innerHTML =
    '<div class="welcome-card">'
    + '<div class="welcome-head"><span class="welcome-cat">💯</span>'
    + '<div><div class="welcome-title">欢迎来到福建高考备考资料导航</div>'
    + '<div class="welcome-sub">一套省内全科电子卷的诞生记</div></div></div>'
    + '<div class="welcome-body">' + bodyHtml + '</div>'
    + '<div class="welcome-foot">'
    + '<button type="button" class="ack-open-btn" id="ackOpenBtn"> 致谢名单</button>'
    + '<button class="welcome-btn" id="welcomeClose">开始浏览 →</button>'
    + '</div>'
    + ACK_HTML
    + '</div>';
  document.body.appendChild(overlay);

  function close() {
    overlay.classList.add('welcome-hide');
    setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 280);
    setCookie(KEY, '1', 365);
    showAckEntry();   // 欢迎窗关闭后 → 首页致谢入口出现
  }
  document.getElementById('welcomeClose').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  // 卡片内面板：点底部文字按钮 → 从卡片下方滑入
  var panel = overlay.querySelector('.ack-panel');
  document.getElementById('ackOpenBtn').addEventListener('click', function () {
    panel.classList.add('ack-open');
  });
  // 面板右上角 ✕ → 面板收起 + 欢迎窗一并关闭（走原有 close 逻辑，写 Cookie）
  overlay.querySelector('.ack-x').addEventListener('click', function () {
    panel.classList.remove('ack-open');
    close();
  });
})();
