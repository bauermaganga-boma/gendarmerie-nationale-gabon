/* Gendarmerie nationale gabonaise — comportements de la page */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Menu mobile */
  var nav = $('#nav'), burger = $('#burger');
  if (nav && burger) {
    var close = function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', close); });
  }

  /* Apparitions au défilement */
  var rev = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    rev.forEach(function (el) { io.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add('is-visible'); }); }

  /* Lien actif dans le menu */
  var links = $$('.nav a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('on'); });
          map[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* Compteurs */
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target, to = +el.getAttribute('data-count'), from = to > 1000 ? to - 60 : 0, t0 = null;
        (function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1100, 1), v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
          el.textContent = v;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: .6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* Filtres des actualités */
  $$('.chip').forEach(function (c) {
    c.addEventListener('click', function () {
      $$('.chip').forEach(function (x) { x.classList.remove('on'); });
      c.classList.add('on');
      var f = c.getAttribute('data-f');
      $$('.news').forEach(function (n) { n.hidden = !(f === 'all' || n.getAttribute('data-c') === f); });
    });
  });

  /* Contrôle de confiance (démonstration, données fictives) */
  var vf = $('#verify-form');
  if (vf) {
    var vres = $('#vres'), vcode = $('#vcode');
    var SAMPLE = 'GN-EXEMPLE';
    var run = function () {
      var code = (vcode.value || '').trim().toUpperCase();
      if (!code) { vcode.focus(); return; }
      if (code === SAMPLE) {
        var d = new Date(), pad = function (n) { return ('0' + n).slice(-2); };
        var jour = pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
        vres.className = 'vres ok';
        vres.innerHTML = '<h4>✓ Mission valide</h4><dl>' +
          '<dt>Gendarme</dt><dd>Exemple fictif</dd>' +
          '<dt>Matricule</dt><dd>GN-000000</dd>' +
          '<dt>Unité</dt><dd>Brigade d’exemple</dd>' +
          '<dt>Lieu</dt><dd>Axe d’exemple, Libreville</dd>' +
          '<dt>Validité</dt><dd>' + jour + ', 06:00 – 18:00</dd></dl>' +
          '<p class="note">Exemple fictif. Toute amende doit donner lieu à une quittance du Trésor public.</p>';
      } else {
        vres.className = 'vres ko';
        vres.innerHTML = '<h4>✕ Aucune mission correspondante</h4>' +
          '<p style="margin:0">Ce code n’est pas reconnu. <b>Ne payez rien sans quittance du Trésor public</b> et signalez la situation au <b>1401</b>, au 011 73 20 36 ou au 011 76 22 80.</p>';
      }
    };
    vf.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    $('#vtry').addEventListener('click', function () { vcode.value = SAMPLE; run(); });
  }

  /* Signalement (démonstration : rien n'est envoyé) */
  var sf = $('#sig-form');
  if (sf) {
    sf.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = '';
      for (var i = 0; i < 6; i++) n += Math.floor(Math.random() * 10);
      $('#sig-ref').textContent = 'SR-' + n;
      $('#sig-form-wrap').style.display = 'none';
      $('#sig-sent').classList.add('on');
    });
    $('#sig-again').addEventListener('click', function () {
      sf.reset();
      $('#sig-sent').classList.remove('on');
      $('#sig-form-wrap').style.display = '';
    });
  }
})();

/* Visionneuse de la galerie */
(function () {
  var items = document.querySelectorAll('.mosaic .m');
  if (!items.length) return;
  var lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Image agrandie');
  lb.innerHTML = '<button aria-label="Fermer">×</button><img alt=""><p></p>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), cap = lb.querySelector('p');
  var close = function () { lb.classList.remove('on'); };
  items.forEach(function (m) {
    m.addEventListener('click', function () {
      var i = m.querySelector('img');
      img.src = i.currentSrc || i.src; img.alt = i.alt;
      cap.textContent = (m.querySelector('figcaption') || {}).textContent || '';
      lb.classList.add('on');
    });
  });
  lb.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
