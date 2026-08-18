const handle = document.getElementById('tocHandle');
const drawer = document.getElementById('tocDrawer');
const closeBtn = document.getElementById('tocClose');

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