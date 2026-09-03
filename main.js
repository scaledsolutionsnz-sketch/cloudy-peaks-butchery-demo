/* Cloudy Peaks Butchery — shared interactions */
(function () {
  'use strict';

  // nav gains its hairline once you leave the hero plate
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 60); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(!links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // hero reviews rotate; paused for reduced motion and while the tab is hidden
  var wrap = document.getElementById('quotes');
  if (wrap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var quotes = wrap.querySelectorAll('.quote');
    if (quotes.length > 1) {
      var i = 0, timer = null;
      var step = function () {
        quotes[i].classList.remove('is-on');
        i = (i + 1) % quotes.length;
        quotes[i].classList.add('is-on');
      };
      var start = function () { if (!timer) timer = setInterval(step, 5200); };
      var stop = function () { clearInterval(timer); timer = null; };
      document.addEventListener('visibilitychange', function () {
        document.hidden ? stop() : start();
      });
      start();
    }
  }
})();
