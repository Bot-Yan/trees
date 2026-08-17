///年份切换
(function(){
  var REAL = document.getElementById('real-2026');
  var PARK = document.getElementById('park');
  var yearBody = document.getElementById('year-body');
  var home = document.getElementById('home');
  var year = document.getElementById('year');

  var DATA = {
    '2021':{title:'2021届 · 高三考试资料目录树', root:'2021届', status:'待整理', statusText:'📁 资料待整理'},
    '2022':{title:'2022届 · 高三考试资料目录树', root:'2022届', status:'待整理', statusText:'📁 资料待整理'},
    '2023':{title:'2023届 · 高三考试资料目录树', root:'2023届', status:'待整理', statusText:'📁 资料待整理'},
    '2024':{title:'2024届 · 高三考试资料目录树', root:'2024届', status:'待整理', statusText:'📁 资料待整理'},
    '2025':{title:'2025届 · 高三考试资料目录树', root:'2025届', status:'待整理', statusText:'📁 资料待整理'},
    '2026':{real:true},
    '2027':{title:'2027届 · 高三考试资料目录树', root:'2027届', status:'待生成', statusText:'🚧 资料待生成'},
    'fujian':{title:'2021-2026 福建高考真题', root:'2021-2026福建高考真题', status:'待整理', statusText:'📁 资料待整理'}
  };

  function parkReal(){ if(REAL && REAL.parentNode !== PARK) PARK.appendChild(REAL); }

  function showHome(){
    parkReal();
    year.style.display = 'none';
    home.style.display = 'flex';
    window.scrollTo(0,0);
  }
  function renderPlaceholder(d){
    return '<div class="wrap">'
      + '<div class="np-masthead np-mast-ph"><div class="np-mast-left">'
      + '<div class="np-edition">' + d.title + ' · 资料索引</div>'
      + '<h1 class="np-paper-name">' + d.title.replace(/届.*$/, '届') + '</h1>'
      + '<div class="np-headline">' + d.statusText + '</div>'
      + '<div class="np-deck">根目录：' + d.root + '　|　' + d.status + '</div>'
      + '</div></div>'
      + '<div class="np-section"><section class="np-panel"><h2 class="np-panel-title">资料状态</h2>'
      + '<div class="status-badge">' + d.statusText + '</div></section></div>'
      + '<div class="np-dl">网盘链接：'
      + '<a href="#" onclick="return false">主链接（待替换）</a>'
      + '<a href="#" onclick="return false">备用链接（待替换）</a>'
      + '</div></div>';
  }
function showYear(key){
    var d = DATA[key];
    if(!d) return;
    yearBody.innerHTML = '';   // ★ 清空旧内容，修复跳转后残留问题
    if(d.real){
      yearBody.appendChild(REAL);
    } else {
      parkReal();
      yearBody.innerHTML = renderPlaceholder(d);
    }
    home.style.display = 'none';
    year.style.display = 'block';
    window.scrollTo(0,0);
  }

  document.querySelectorAll('.hotspot').forEach(function(c){
    c.addEventListener('click', function(){ showYear(c.dataset.year); });
  });
  document.getElementById('backBtn').addEventListener('click', showHome);
  showHome();
})();