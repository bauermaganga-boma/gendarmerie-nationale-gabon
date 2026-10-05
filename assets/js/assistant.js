/* Assistant « Brigade numérique » — questions-réponses programmé (pas une IA connectée).
   Répond à partir du dossier de présentation de la Gendarmerie nationale gabonaise. */
(function () {
  'use strict';

  var FB = 'https://www.facebook.com/people/Gendarmerie-Nationale-Gabonaise-Officielle/100068923221450/';
  var NUMS = '<b>1401</b>, <b>011 73 20 36</b> ou <b>011 76 22 80</b>';
  var HOME = (location.pathname.split('/').pop() || 'index.html');
  var base = (HOME === 'index.html' || HOME === '') ? '' : 'index.html';

  var KB = [
    { id: 'bonjour', k: ['bonjour', 'salut', 'bonsoir', 'hello', 'coucou'],
      a: 'Bonjour ! Je suis l’assistant de la Brigade numérique (version de démonstration). Je peux vous renseigner sur les missions de la Gendarmerie, vos droits lors d’un contrôle, le signalement d’un racket ou le recrutement.' },
    { id: 'racket', k: ['racket', 'taxe', 'corrupt', 'pot de vin', 'arnaque', 'extors', 'abus', 'abusif', 'argent', 'rackett', 'anti-racket', 'anti racket'],
      a: 'Pour signaler un racket, appelez le ' + NUMS + '. Vous pouvez aussi remplir le formulaire « Signaler un racket » de la section <a href="' + base + '#demarches">Démarches</a> (démonstration). Rappel : toute amende donne lieu à une quittance du Trésor public.' },
    { id: 'numeros', k: ['numero', 'telephone', 'appeler', 'appel', 'joindre', 'ligne', '1401'],
      a: 'Les numéros dédiés aux signalements de racket sont : ' + NUMS + '. Pour les autres situations, rapprochez-vous de la brigade la plus proche.' },
    { id: 'controle', k: ['controle', 'barrage', 'arrete', 'arreter', 'route', 'routier', 'verifier', 'droit', 'ordre de mission', 'matricule', 'legitime'],
      a: 'Lors d’un contrôle : <ul><li>le gendarme porte son <b>matricule</b> sur la poitrine (Grand Libreville) ;</li><li>le contrôle se fait sur <b>ordre de mission signé</b> ou bulletin de service ;</li><li>toute amende donne lieu à une <b>quittance du Trésor public</b> ;</li><li>un doute ? appelez ' + NUMS + '.</li></ul>' },
    { id: 'amende', k: ['amende', 'quittance', 'payer', 'paiement', 'especes', 'tresor', 'contravention', 'pv '],
      a: 'Toute amende doit donner lieu à une <b>quittance du Trésor public</b>. Ne payez jamais en espèces sans reçu. À terme, la plateforme prévoit le paiement par Mobile Money avec quittance numérique (phase 4 de la proposition).' },
    { id: 'signaler', k: ['signaler', 'signalement', 'denoncer', 'dénoncer', 'alerter', 'plainte', 'pre-plainte', 'preplainte', 'declarer', 'vol', 'agression'],
      a: 'Pour un racket, utilisez le formulaire de la section <a href="' + base + '#demarches">Démarches</a> ou appelez ' + NUMS + '. Pour une plainte ou une infraction, présentez-vous à la brigade la plus proche : la pré-plainte en ligne est prévue en phase 2.' },
    { id: 'recrutement', k: ['recrut', 'concours', 'emploi', 'candidat', 'devenir gendarme', 'rejoindre', 'engager', 'inscri', 'travail', 'postuler', 'integrer'],
      a: 'Les candidatures se déposent auprès des commandements de province et des commandants de brigade. En mars 2026, 594 recrues ont été incorporées sur un programme de 954. Suivez les annonces officielles sur <a href="' + FB + '" target="_blank" rel="noopener">Facebook</a>. Attention : aucun paiement n’est demandé pour s’inscrire.' },
    { id: 'fauxconcours', k: ['faux concours', 'fausse annonce', 'payer pour', 'argent pour concours'],
      a: 'Méfiez-vous des faux concours : <b>aucun paiement n’est demandé pour s’inscrire</b>. Fiez-vous uniquement aux annonces officielles du commandement.' },
    { id: 'missions', k: ['mission', 'role', 'que faites', 'que fait', 'faites vous', 'a quoi sert', 'attribution', 'competence', 'police judiciaire'],
      a: 'La Gendarmerie nationale est une force militaire de sécurité intérieure. Ses missions : défendre le territoire, assurer la sécurité publique, maintenir l’ordre, faire respecter les lois et règlements, et exercer des missions de police judiciaire, administrative et militaire. Voir <a href="' + base + '#missions">Missions</a>.' },
    { id: 'organisation', k: ['organisation', 'legion', 'structure', 'unite', 'escadron', 'organigramme', 'nautique', 'aerienne', 'maintien de l'],
      a: 'La Gendarmerie compte une administration centrale, <b>cinq légions territoriales</b> (Est, Ouest, Centre-Ouest, Nord, Sud), des brigades territoriales et des unités spécialisées : maintien de l’ordre, escadrons blindés, brigades nautiques et aériennes, et le GSIGN.' },
    { id: 'gsign', k: ['gsign', 'groupement specialise', 'intervention', 'forces speciales', 'combat'],
      a: 'Le <b>Groupement spécialisé d’intervention (GSIGN)</b> est l’unité spécialisée d’intervention de la Gendarmerie. Il s’est entraîné au combat en zone urbaine avec les forces françaises au Gabon.' },
    { id: 'histoire', k: ['histoire', 'creation', 'cree', 'fondee', 'fondation', 'independance', '1960', '1929', 'origine', 'ancien'],
      a: 'Le détachement de gendarmerie de Libreville a été fondé en <b>1929</b>. La Gendarmerie nationale gabonaise a été créée en <b>1960</b>, à l’indépendance.' },
    { id: 'commandant', k: ['commandant', 'general', 'chef', 'dirigeant', 'barassouaga', 'directeur', 'patron', 'qui dirige'],
      a: 'Le <b>général Yves Barassouaga</b> est commandant en chef de la Gendarmerie nationale depuis le 3 avril 2020. La Gendarmerie relève du Président de la République et du ministère de la Défense nationale.' },
    { id: 'brigade', k: ['brigade', 'commissariat', 'caserne', 'proche', 'province', 'adresse', 'ou se trouve', 'trouver', 'localiser'],
      a: 'La Gendarmerie est présente dans tout le pays via ses brigades territoriales. L’annuaire détaillé par province est en cours de préparation : voir la section <a href="' + base + '#brigades">Brigades</a>.' },
    { id: 'siege', k: ['siege', 'libreville', 'ou etes', 'localisation', 'situe'],
      a: 'Le siège de la Gendarmerie nationale est à <b>Libreville</b>.' },
    { id: 'contact', k: ['contact', 'facebook', 'reseaux', 'email', 'mail', 'courriel', 'ecrire', 'page'],
      a: 'La Gendarmerie communique aujourd’hui via sa <a href="' + FB + '" target="_blank" rel="noopener">page Facebook officielle</a>. Pour les signalements de racket : ' + NUMS + '.' },
    { id: 'officiel', k: ['officiel', 'site internet', 'maquette', 'demonstration', 'proposition', 'plateforme', 'rouana'],
      a: 'Ce site est une <b>maquette de proposition</b>, pas le site officiel. Elle présente ce que pourrait être une plateforme en 4 phases : vitrine, espace citoyen, gestion interne, services mobiles. Voir la <a href="plateforme.html">proposition de plateforme</a>.' },
    { id: 'merci', k: ['merci', 'parfait', 'super', 'ok merci', 'au revoir'],
      a: 'Avec plaisir. N’hésitez pas à revenir si vous avez une autre question.' }
  ];

  var CHIPS = ['racket', 'controle', 'recrutement', 'missions', 'brigade'];
  var CHIP_LABEL = { racket: 'Signaler un racket', controle: 'Mes droits lors d’un contrôle', recrutement: 'Recrutement', missions: 'Vos missions', brigade: 'Trouver une brigade' };
  var CHIP_Q = { racket: 'Comment signaler un racket ?', controle: 'Quels sont mes droits lors d’un contrôle ?', recrutement: 'Comment rejoindre la Gendarmerie ?', missions: 'Quelles sont vos missions ?', brigade: 'Où trouver une brigade ?' };

  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function findAnswer(q) {
    var n = ' ' + norm(q) + ' ', best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var score = 0;
      for (var j = 0; j < KB[i].k.length; j++) {
        var kw = norm(KB[i].k[j]), pad = KB[i].k[j].slice(-1) === ' ';
        if (!kw) continue;
        var hit = pad ? n.indexOf(' ' + kw + ' ') >= 0 : n.indexOf(' ' + kw) >= 0;
        if (hit) score += kw.length > 5 ? 2 : 1;
      }
      if (score > bestScore) { bestScore = score; best = KB[i]; }
    }
    return best;
  }

  if (typeof document === 'undefined') return;

  var root = document.createElement('div');
  root.innerHTML =
    '<button class="chat-fab" id="chat-fab" aria-label="Ouvrir l’assistant Brigade numérique"><svg><use href="assets/img/icons.svg#i-chat"/></svg><span>Une question ?</span></button>' +
    '<div class="chat" id="chat" role="dialog" aria-label="Assistant Brigade numérique">' +
    '<div class="chat__h"><img src="assets/img/emblem.svg" alt=""><div><b>Brigade numérique</b><small>Assistant de démonstration</small></div><button class="chat__x" id="chat-x" aria-label="Fermer">×</button></div>' +
    '<div class="chat__m" id="chat-m" aria-live="polite"></div>' +
    '<div class="qr" id="chat-qr"></div>' +
    '<form class="chat__f" id="chat-f"><input id="chat-i" type="text" placeholder="Votre question…" aria-label="Votre question" autocomplete="off"><button type="submit">Envoyer</button></form>' +
    '<div class="chat__d">Assistant programmé, sans IA. Pas de données envoyées.</div></div>';
  document.body.appendChild(root);

  var fab = document.getElementById('chat-fab'), box = document.getElementById('chat'),
      msgs = document.getElementById('chat-m'), qr = document.getElementById('chat-qr'),
      form = document.getElementById('chat-f'), inp = document.getElementById('chat-i'), started = false;

  function add(html, who) {
    var d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = html;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }
  function chips() {
    qr.innerHTML = '';
    CHIPS.forEach(function (id) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = CHIP_LABEL[id];
      b.addEventListener('click', function () { ask(CHIP_Q[id]); });
      qr.appendChild(b);
    });
  }
  function ask(q) {
    add(q.replace(/</g, '&lt;'), 'me');
    var r = findAnswer(q);
    setTimeout(function () {
      if (r) add(r.a, 'bot');
      else add('Je n’ai pas la réponse à cette question. Pour un signalement de racket, appelez ' + NUMS + '. Pour le reste, contactez la <a href="' + FB + '" target="_blank" rel="noopener">page Facebook officielle</a> ou rapprochez-vous de la brigade la plus proche.', 'bot');
    }, 280);
  }
  function open() {
    box.classList.add('on'); fab.style.display = 'none';
    if (!started) { started = true; add(KB[0].a, 'bot'); chips(); }
    setTimeout(function () { inp.focus(); }, 50);
  }
  function close() { box.classList.remove('on'); fab.style.display = ''; }

  fab.addEventListener('click', open);
  document.getElementById('chat-x').addEventListener('click', close);
  form.addEventListener('submit', function (e) {
    e.preventDefault(); var v = inp.value.trim(); if (!v) return; inp.value = ''; ask(v);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-open-chat]'), function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
})();
