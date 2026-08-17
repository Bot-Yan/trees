// 移动端（Android / iOS / HarmonyOS）标记
(function(){
  var ua = navigator.userAgent || navigator.platform || "";
  var isMobile = /Android/i.test(ua) || /iPhone|iPad|iPod/i.test(ua) || /HarmonyOS|OpenHarmony/i.test(ua) || /Huawei/i.test(ua) && /Harmony/i.test(ua);
  if (isMobile) document.documentElement.classList.add('os-mobile');
})();
function toggle(el){
  var li = el.parentNode;
  li.classList.toggle('open');
  el.textContent = li.classList.contains('open') ? '▾' : '▸';
}
document.querySelectorAll('.np-dname').forEach(function(d){
  d.addEventListener('click', function(){ toggle(d.previousElementSibling); });
});