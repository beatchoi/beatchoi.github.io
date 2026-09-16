// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function () {
  var mast = document.querySelector('.mast');
  var btn = document.querySelector('.nav-toggle');
  if (!mast || !btn) return;
  btn.addEventListener('click', function () {
    var open = mast.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
