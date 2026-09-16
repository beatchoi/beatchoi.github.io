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

// 홈 섹션 점 내비: 현재 보이는 섹션 표시
document.addEventListener('DOMContentLoaded', function () {
  var dots = document.querySelectorAll('.dots a');
  var panels = document.querySelectorAll('.snap');
  if (!dots.length || !panels.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      dots.forEach(function (d) { d.classList.toggle('is-on', d.getAttribute('href') === '#' + e.target.id); });
    });
  }, { threshold: 0.6 });
  panels.forEach(function (p) { io.observe(p); });
});
