// ===== 目录树展开/折叠（基于事件委托，稳如老狗） =====

// 1. 监听点击 ▶ / ▼ 图标
document.addEventListener('click', function(e) {
  // 找到被点击的 .np-toggle（展开箭头）
  const toggle = e.target.closest('.np-toggle');
  if (!toggle) return;

  // 找到它所在的 .np-dir（文件夹）
  const dir = toggle.closest('.np-dir');
  if (!dir) return;

  // 切换 open 类（控制展开/折叠）
  dir.classList.toggle('open');

  // 同步箭头方向：展开时 ▼，折叠时 ▶
  const isOpen = dir.classList.contains('open');
  toggle.textContent = isOpen ? '▾' : '▸';

  // 阻止点击事件冒泡，避免干扰其他监听
  e.stopPropagation();
});

// 2. 监听点击文件夹名称（.np-dname）—— 也可以切换展开/折叠，提升用户体验
document.addEventListener('click', function(e) {
  const dname = e.target.closest('.np-dname');
  if (!dname) return;

  // 只处理 .np-dir > .np-dname，不处理文件里的名称
  const dir = dname.closest('.np-dir');
  if (!dir) return;

  // 确保点的是文件夹的名字，而不是文件夹里某个文件的文件名
  if (dir.querySelector('.np-dname') !== dname) return;

  // 切换展开/折叠
  dir.classList.toggle('open');

  // 同步箭头方向
  const toggle = dir.querySelector('.np-toggle');
  if (toggle) {
    toggle.textContent = dir.classList.contains('open') ? '▾' : '▸';
  }

  e.stopPropagation();
});

// 3. 修复初始状态：让所有带 .open 的文件夹初始箭头显示为 ▾（如果之前有默认展开的）
document.querySelectorAll('.np-dir.open').forEach(function(dir) {
  const toggle = dir.querySelector('.np-toggle');
  if (toggle) {
    toggle.textContent = '▾';
  }
});