/* ProWave site scripts. No dependencies. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     SETTINGS. Edit these three lines before going live.
     ------------------------------------------------------------------ */
  var CONFIG = {
    // Address shown on the page and used by the form until a form service is connected.
    contactEmail: 'contact.eu@wavesint.com',
    // Formspree address, for example 'https://formspree.io/f/abcdwxyz'. Empty = the form opens the visitor's email app.
    formEndpoint: '',
    // Calendly or another booking page. Empty = "Book a call" opens an email.
    bookingUrl: '',
    revenueShare: 0.15,
    daysPerMonth: 30
  };

  var LANG_KEY = 'prowave-lang';
  var doc = document;
  var root = doc.documentElement;
  var currentLang = 'pl';
  var polishCache = new Map();

  function $(selector, scope) { return (scope || doc).querySelector(selector); }
  function $all(selector, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(selector)); }
  function messages() { return window.PROWAVE_MESSAGES[currentLang]; }

  /* ---------- Language switch ---------- */
  function readSavedLang() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'pl') return fromUrl;
    try { return window.localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'pl'; } catch (error) { return 'pl'; }
  }

  function parseAttrMap(value) {
    return value.split(',').map(function (pair) {
      var parts = pair.split(':');
      return { attr: parts[0].trim(), key: parts[1].trim() };
    });
  }

  function translateText(el, dict) {
    var key = el.getAttribute('data-i18n');
    if (!polishCache.has(el)) polishCache.set(el, el.innerHTML);
    var next = dict ? dict[key] : polishCache.get(el);
    if (typeof next === 'string') el.innerHTML = next;
  }

  function translateAttrs(el, dict) {
    parseAttrMap(el.getAttribute('data-i18n-attr')).forEach(function (item) {
      var cacheKey = item.attr + '|' + item.key;
      if (!el._plAttrs) el._plAttrs = {};
      if (!(cacheKey in el._plAttrs)) el._plAttrs[cacheKey] = el.getAttribute(item.attr);
      var next = dict ? dict[item.key] : el._plAttrs[cacheKey];
      if (typeof next === 'string') el.setAttribute(item.attr, next);
    });
  }

  function setLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'pl';
    var dict = currentLang === 'en' ? window.PROWAVE_EN : null;
    $all('[data-i18n]').forEach(function (el) { translateText(el, dict); });
    $all('[data-i18n-attr]').forEach(function (el) { translateAttrs(el, dict); });
    root.lang = currentLang;
    $all('.lang button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === currentLang));
    });
    try { window.localStorage.setItem(LANG_KEY, currentLang); } catch (error) { /* private mode: the choice simply is not remembered */ }
    updateCalculator();
    updateContactLinks();
  }

  /* ---------- Earnings calculator ---------- */
  var shakesInput = $('#shakes');
  var priceInput = $('#price');

  function formatNumber(value, digits) {
    // Grouped by hand so that 6 000 and 10 800 look the same (Polish rules skip the space in four-digit numbers).
    var english = currentLang === 'en';
    var parts = Number(value).toFixed(digits || 0).split('.');
    var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, english ? ',' : ' ');
    return parts.length > 1 ? whole + (english ? '.' : ',') + parts[1] : whole;
  }

  function setRangeFill(input) {
    var min = Number(input.min);
    var max = Number(input.max);
    var percent = ((Number(input.value) - min) / (max - min)) * 100;
    input.style.setProperty('--p', percent + '%');
  }

  function updateCalculator() {
    if (!shakesInput || !priceInput) return;
    var shakes = Number(shakesInput.value);
    var price = Number(priceInput.value);
    var sales = shakes * price * CONFIG.daysPerMonth;
    var monthly = sales * CONFIG.revenueShare;
    $('#shakesOut').textContent = formatNumber(shakes);
    $('#priceOut').textContent = formatNumber(price, price % 1 === 0 ? 0 : 2) + ' zł';
    $('#monthly').textContent = formatNumber(Math.round(monthly));
    $('#yearly').textContent = formatNumber(Math.round(monthly * 12));
    $('#sales').textContent = formatNumber(Math.round(sales));
    setRangeFill(shakesInput);
    setRangeFill(priceInput);
  }

  /* ---------- Contact links and form ---------- */
  function updateContactLinks() {
    $all('.js-email').forEach(function (link) {
      link.href = 'mailto:' + CONFIG.contactEmail;
      link.textContent = CONFIG.contactEmail;
    });
    var bookCall = $('#bookCall');
    if (!bookCall) return;
    if (CONFIG.bookingUrl) {
      bookCall.href = CONFIG.bookingUrl;
      bookCall.target = '_blank';
      bookCall.rel = 'noopener';
    } else {
      bookCall.href = 'mailto:' + CONFIG.contactEmail + '?subject=' + encodeURIComponent(messages().callSubject);
    }
  }

  function isEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value); }

  function validateField(input) {
    var value = input.value.trim();
    var valid = true;
    if (input.required && !value) valid = false;
    if (valid && input.type === 'email' && !isEmail(value)) valid = false;
    input.setAttribute('aria-invalid', String(!valid));
    return valid;
  }

  function setStatus(statusEl, text, kind) {
    statusEl.textContent = text;
    statusEl.className = 'form-status' + (kind ? ' is-' + kind : '');
  }

  function buildMailto(data) {
    var labels = messages().labels;
    var lines = Object.keys(labels).map(function (name) { return labels[name] + ': ' + (data.get(name) || ''); });
    return 'mailto:' + CONFIG.contactEmail +
      '?subject=' + encodeURIComponent(messages().mailSubject + ': ' + (data.get('gym') || '')) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function initForm() {
    var form = $('#contactForm');
    if (!form) return;
    var statusEl = $('#formStatus');
    var fields = $all('input[type="text"], input[type="email"], input[type="tel"], textarea', form).filter(function (el) { return el.name !== '_gotcha'; });

    fields.forEach(function (input) {
      input.addEventListener('blur', function () { if (input.required || input.value) validateField(input); });
      input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') validateField(input); });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var invalid = fields.filter(function (input) { return !validateField(input); });
      if (invalid.length) { invalid[0].focus(); return; }
      if (!$('#f-consent').checked) { setStatus(statusEl, messages().consent, 'error'); return; }

      var data = new FormData(form);
      if (data.get('_gotcha')) return; // spam bots fill the hidden field

      if (!CONFIG.formEndpoint) {
        window.location.href = buildMailto(data);
        setStatus(statusEl, messages().mailOpened, 'ok');
        return;
      }

      var submit = $('button[type="submit"]', form);
      submit.disabled = true;
      setStatus(statusEl, messages().sending, '');
      fetch(CONFIG.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error('Form service answered ' + response.status);
          form.reset();
          setStatus(statusEl, messages().sent, 'ok');
        })
        .catch(function (error) {
          console.error('Contact form failed:', error);
          setStatus(statusEl, messages().failed + CONFIG.contactEmail, 'error');
        })
        .then(function () { submit.disabled = false; });
    });
  }

  /* ---------- Scroll effects ---------- */
  function initReveal() {
    var items = $all('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  }

  function initHeaderAndStickyCta() {
    var header = $('#header');
    var sticky = $('#stickyCta');
    var contact = $('#kontakt');
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 24);
      if (!sticky || !contact) return;
      var pastHero = y > window.innerHeight * 0.7;
      var contactInView = contact.getBoundingClientRect().top < window.innerHeight * 0.85;
      sticky.classList.toggle('is-visible', pastHero && !contactInView);
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ---------- Start ---------- */
  function init() {
    $all('.lang button').forEach(function (button) {
      button.addEventListener('click', function () { setLang(button.getAttribute('data-lang')); });
    });
    [shakesInput, priceInput].forEach(function (input) {
      if (input) input.addEventListener('input', updateCalculator);
    });
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    setLang(readSavedLang());
    initForm();
    initReveal();
    initHeaderAndStickyCta();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
