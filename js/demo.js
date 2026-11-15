/* ProWheys "Try it yourself": a drawn machine touchscreen visitors can play with.
   Flavours come from js/flavours.js. */
(function () {
  'use strict';

  var lib = window.ProWheysFlavours;
  if (!lib) return;

  /* Counts demo steps in the visitor statistics. Set up in js/main.js. */
  var track = window.prowheysTrack || function () {};

  /* How long the mixing animation takes. The real machine needs about a minute. */
  var MIX_MS = 5000;
  var MIX_MS_REDUCED_MOTION = 1500;
  var COUNT_TICK_MS = 100;
  var FIRST_STEP = 1;
  var LAST_STEP = 4;

  var TABS = [
    { id: 'classics', groups: ['classics'] },
    { id: 'desserts', groups: ['desserts'] },
    { id: 'fruity', groups: ['fruity', 'coffee'] },
    { id: 'limited', groups: ['seasonal', 'drops'] }
  ];

  var STRINGS = {
    pl: {
      screen: 'Ekran automatu ProWheys, wersja pokazowa',
      pick: 'Wybierz smak',
      step: 'Krok {n} z 3',
      tabs: { classics: 'Klasyki', desserts: 'Desery', fruity: 'Owocowe i kawa', limited: 'Limitowane' },
      pay: 'Płacisz kartą, zbliżeniowo albo telefonem.',
      back: 'Zmień smak',
      base: 'Na czym zrobić shake?',
      water: 'Woda',
      milk: 'Mleko',
      creatine: 'Kreatyna',
      creatineHint: 'Dodatkowa porcja, jeśli chcesz',
      make: 'Zrób mój shake',
      mixing: 'Miksujemy Twój shake',
      onWater: 'na wodzie',
      onMilk: 'na mleku',
      withCreatine: 'z kreatyną',
      left: 'Jeszcze',
      seconds: 's',
      real: 'W automacie trwa to około minuty.',
      ready: 'Gotowe',
      protein: 'ok. 30 g białka',
      chipWater: 'Na wodzie',
      chipMilk: 'Na mleku',
      chipCreatine: '+ kreatyna',
      again: 'Spróbuj innego smaku'
    },
    en: {
      screen: 'ProWheys machine screen, demo version',
      pick: 'Pick a flavour',
      step: 'Step {n} of 3',
      tabs: { classics: 'Classics', desserts: 'Desserts', fruity: 'Fruity and coffee', limited: 'Limited' },
      pay: 'Pay by card, contactless or phone.',
      back: 'Change flavour',
      base: 'What should we mix it with?',
      water: 'Water',
      milk: 'Milk',
      creatine: 'Creatine boost',
      creatineHint: 'An extra serving, if you want it',
      make: 'Make my shake',
      mixing: 'Mixing your shake',
      onWater: 'with water',
      onMilk: 'with milk',
      withCreatine: 'with creatine',
      left: 'Ready in',
      seconds: 's',
      real: 'In the machine this takes about a minute.',
      ready: 'Ready',
      protein: 'about 30 g protein',
      chipWater: 'With water',
      chipMilk: 'With milk',
      chipCreatine: '+ creatine',
      again: 'Try another flavour'
    }
  };

  var esc = lib.escapeHtml;

  function strings() { return STRINGS[lib.currentLang()]; }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- The four screens ---------- */
  function tileHtml(flavour) {
    var badge = lib.badgeText(flavour, lib.currentLang());
    return '<button type="button" class="k-tile k-tile--' + flavour.ink + '" data-action="pick" data-id="' + flavour.id + '" style="' + lib.styleVars(flavour) + '">' +
      '<span class="k-tile-cup">' + lib.shakeSvg(flavour) + '</span>' +
      (badge ? '<i class="k-tile-dot" aria-hidden="true"></i><span class="sr-only">' + esc(badge) + '. </span>' : '') +
      '<span>' + esc(flavour.name) + '</span>' +
    '</button>';
  }

  function pickView(state, flavours, showTabs) {
    var text = strings();
    var tab = TABS.filter(function (item) { return item.id === state.tab; })[0] || TABS[0];
    var visible = showTabs
      ? flavours.filter(function (flavour) { return tab.groups.indexOf(flavour.group) !== -1; })
      : flavours;
    var tabs = showTabs
      ? '<div class="k-tabs">' + TABS.map(function (item) {
          return '<button type="button" class="k-tab" data-action="tab" data-value="' + item.id + '" aria-pressed="' + (item.id === tab.id) + '">' + esc(text.tabs[item.id]) + '</button>';
        }).join('') + '</div>'
      : '';
    return '<h3 class="k-title" tabindex="-1">' + esc(text.pick) + '</h3>' +
      '<p class="k-sub">' + esc(text.step.replace('{n}', '1')) + '</p>' +
      tabs +
      '<div class="k-grid">' + visible.map(tileHtml).join('') + '</div>' +
      '<p class="k-foot">' + esc(text.pay) + '</p>';
  }

  function optionsView(state, flavour) {
    var text = strings();
    function baseButton(value, label) {
      return '<button type="button" class="k-option" data-action="base" data-value="' + value + '" aria-pressed="' + (state.base === value) + '">' +
        '<i class="k-option-icon k-option-icon--' + value + '" aria-hidden="true"></i>' + esc(label) + '</button>';
    }
    return '<button type="button" class="k-back" data-action="back"><span aria-hidden="true">←</span> ' + esc(text.back) + '</button>' +
      '<div class="k-picked k-picked--' + flavour.ink + '" style="' + lib.styleVars(flavour) + '">' +
        '<h3 class="k-title" tabindex="-1">' + esc(flavour.name) + '</h3>' +
        '<p>' + esc(flavour[lib.currentLang()]) + '</p>' +
      '</div>' +
      '<p class="k-label">' + esc(text.base) + ' <span>' + esc(text.step.replace('{n}', '2')) + '</span></p>' +
      '<div class="k-options">' + baseButton('water', text.water) + baseButton('milk', text.milk) + '</div>' +
      '<button type="button" class="k-switch" role="switch" data-action="creatine" aria-checked="' + state.creatine + '">' +
        '<span class="k-switch-text"><strong>' + esc(text.creatine) + '</strong><small>' + esc(text.creatineHint) + '</small></span>' +
        '<span class="k-switch-track" aria-hidden="true"><span class="k-switch-knob"></span></span>' +
      '</button>' +
      '<button type="button" class="k-btn" data-action="make">' + esc(text.make) + '</button>';
  }

  function recipeLine(state, flavour) {
    var text = strings();
    var parts = [flavour.name, state.base === 'milk' ? text.onMilk : text.onWater];
    if (state.creatine) parts.push(text.withCreatine);
    return parts.join(', ');
  }

  function mixingView(state, flavour, seconds) {
    var text = strings();
    return '<h3 class="k-title" tabindex="-1">' + esc(text.mixing) + '</h3>' +
      '<p class="k-sub">' + esc(recipeLine(state, flavour)) + '</p>' +
      '<div class="k-cup k-cup--filling">' + lib.shakeSvg(flavour, { milk: state.base === 'milk' }) + '</div>' +
      '<div class="k-progress" role="progressbar" aria-label="' + esc(text.mixing) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>' +
      '<p class="k-count">' + esc(text.left) + ' <strong data-count>' + seconds + '</strong> ' + esc(text.seconds) + '</p>' +
      '<p class="k-foot">' + esc(text.real) + '</p>';
  }

  function resultView(state, flavour) {
    var text = strings();
    var chips = [text.protein, lib.text[lib.currentLang()].milk, state.base === 'milk' ? text.chipMilk : text.chipWater];
    if (state.creatine) chips.push(text.chipCreatine);
    return '<div class="k-result k-result--' + flavour.ink + '" style="' + lib.styleVars(flavour) + '">' +
      '<p class="k-ready">' + esc(text.ready) + '</p>' +
      '<div class="k-cup">' + lib.shakeSvg(flavour, { milk: state.base === 'milk' }) + '</div>' +
      '<h3 class="k-result-name" tabindex="-1">' + esc(flavour.name) + '</h3>' +
      '<p class="k-result-desc">' + esc(flavour[lib.currentLang()]) + '</p>' +
      '<ul class="k-chips">' + chips.map(function (chip) { return '<li>' + esc(chip) + '</li>'; }).join('') + '</ul>' +
      '<button type="button" class="k-btn k-btn--paper" data-action="again">' + esc(text.again) + '</button>' +
    '</div>';
  }

  /* ---------- One machine screen ---------- */
  function createKiosk(root) {
    var screen = root.querySelector('.kiosk-screen');
    var dots = root.querySelector('.kiosk-dots');
    if (!screen) return;

    var wanted = (root.getAttribute('data-flavours') || '').split(',').map(function (id) { return id.trim(); }).filter(Boolean);
    var flavours = wanted.length
      ? wanted.map(lib.findFlavour).filter(Boolean)
      : lib.flavours;
    var showTabs = !wanted.length;
    var state = { step: FIRST_STEP, tab: TABS[0].id, flavourId: null, base: 'water', creatine: false };
    var ticker = null;

    function recipe() {
      var flavour = lib.findFlavour(state.flavourId);
      return { flavour: flavour ? flavour.name : '', base: state.base, creatine: state.creatine ? 'yes' : 'no' };
    }

    function stopMixing() {
      if (ticker !== null) window.clearInterval(ticker);
      ticker = null;
    }

    function startMixing() {
      var duration = prefersReducedMotion() ? MIX_MS_REDUCED_MOTION : MIX_MS;
      var started = Date.now();
      var cup = screen.querySelector('.k-cup--filling');
      var bar = screen.querySelector('.k-progress');
      var count = screen.querySelector('[data-count]');
      screen.style.setProperty('--mix', duration + 'ms');
      // Two frames later so the browser paints the empty cup first and the fill can animate.
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          if (cup) cup.classList.add('is-go');
          if (bar) bar.classList.add('is-go');
        });
      });
      ticker = window.setInterval(function () {
        var elapsed = Date.now() - started;
        if (elapsed >= duration) {
          stopMixing();
          var active = document.activeElement;
          var stillHere = !active || active === document.body || screen.contains(active);
          setState({ step: LAST_STEP }, stillHere ? '.k-result-name' : null);
          track('Demo shake finished', recipe());
          return;
        }
        if (count) count.textContent = String(Math.ceil((duration - elapsed) / 1000));
        if (bar) bar.setAttribute('aria-valuenow', String(Math.round((elapsed / duration) * 100)));
      }, COUNT_TICK_MS);
    }

    function viewHtml() {
      var flavour = lib.findFlavour(state.flavourId);
      if (state.step === FIRST_STEP || !flavour) return pickView(state, flavours, showTabs);
      if (state.step === 2) return optionsView(state, flavour);
      if (state.step === 3) return mixingView(state, flavour, Math.ceil((prefersReducedMotion() ? MIX_MS_REDUCED_MOTION : MIX_MS) / 1000));
      return resultView(state, flavour);
    }

    function render(focusSelector) {
      stopMixing();
      screen.innerHTML = viewHtml();
      screen.setAttribute('aria-label', strings().screen);
      screen.setAttribute('data-step', String(state.step));
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (dot, index) {
          dot.classList.toggle('is-on', index < state.step);
        });
      }
      if (state.step === 3) startMixing();
      if (!focusSelector) return;
      var target = screen.querySelector(focusSelector);
      if (target) target.focus({ preventScroll: true });
    }

    function setState(patch, focusSelector) {
      state = Object.assign({}, state, patch);
      render(focusSelector);
    }

    var ACTIONS = {
      tab: function (button) {
        var value = button.getAttribute('data-value');
        setState({ tab: value }, '[data-action="tab"][data-value="' + value + '"]');
      },
      pick: function (button) {
        setState({ step: 2, flavourId: button.getAttribute('data-id') }, '.k-title');
        track('Demo flavour picked', { flavour: recipe().flavour });
      },
      back: function () { setState({ step: FIRST_STEP }, '.k-title'); },
      base: function (button) {
        var value = button.getAttribute('data-value') === 'milk' ? 'milk' : 'water';
        setState({ base: value }, '[data-action="base"][data-value="' + value + '"]');
      },
      creatine: function () { setState({ creatine: !state.creatine }, '[data-action="creatine"]'); },
      make: function () {
        setState({ step: 3 }, '.k-title');
        track('Demo shake started', recipe());
      },
      again: function () { setState({ step: FIRST_STEP, flavourId: null, base: 'water', creatine: false }, '.k-title'); }
    };

    root.addEventListener('click', function (event) {
      var button = event.target.closest ? event.target.closest('[data-action]') : null;
      if (!button || !root.contains(button)) return;
      var action = ACTIONS[button.getAttribute('data-action')];
      if (action) action(button);
    });

    document.addEventListener('prowheys:lang', function () {
      // Mid-mix the screen is left alone, so the animation does not start again. The result shows in the new language.
      if (state.step === 3) return;
      render(null);
    });
    render(null);
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-demo]'), createKiosk);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
