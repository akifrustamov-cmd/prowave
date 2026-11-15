/* ProWheys side dot menu for phones and tablets, where the header menu is hidden.
   One dot per menu point. The dot of the section on screen is highlighted and its name shows for a moment.
   A first tap shows the names of all menu points, a second tap goes to one. */
(function () {
  'use strict';

  var OPEN_MS = 4000;     // how long the names stay on screen after a tap
  var HINT_MS = 1400;     // how long the name of a new section shows while scrolling
  var QUIET_MS = 1200;    // no name flashes while the page travels to a chosen section
  var ACTIVE_LINE = 0.4;  // a section is "on screen" while it covers the line at 40% of the screen height

  function init() {
    var nav = document.querySelector('[data-dotnav]');
    if (!nav) return;

    var items = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'))
      .map(function (link) {
        return { link: link, section: document.getElementById(link.getAttribute('href').slice(1)) };
      })
      .filter(function (item) { return item.section; });
    if (!items.length) return;

    var activeLink = null;
    var openTimer = 0;
    var hintTimer = 0;
    var quietUntil = 0;
    var hasScrolled = false;
    var ticking = false;
    // Whether the names were showing when the finger or mouse went down. Stays true where
    // the browser has no pointer events, so that every tap simply goes to its section.
    var openAtPress = true;

    function isOpen() { return nav.classList.contains('is-open'); }

    function clearHint() {
      window.clearTimeout(hintTimer);
      items.forEach(function (item) { item.link.classList.remove('is-hint'); });
    }

    function showHint(link) {
      clearHint();
      link.classList.add('is-hint');
      hintTimer = window.setTimeout(clearHint, HINT_MS);
    }

    function close() {
      window.clearTimeout(openTimer);
      nav.classList.remove('is-open');
    }

    function open(stayOpen) {
      clearHint();
      window.clearTimeout(openTimer);
      nav.classList.add('is-open');
      if (!stayOpen) openTimer = window.setTimeout(close, OPEN_MS);
    }

    function linkOnScreen() {
      var line = window.innerHeight * ACTIVE_LINE;
      var found = null;
      items.forEach(function (item) {
        var box = item.section.getBoundingClientRect();
        if (box.top <= line && box.bottom > line) found = item.link;
      });
      return found;
    }

    function update() {
      ticking = false;
      var link = linkOnScreen();
      if (link === activeLink) return;
      if (activeLink) {
        activeLink.classList.remove('is-active');
        activeLink.removeAttribute('aria-current');
      }
      activeLink = link;
      if (!link) return;
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'location');
      if (hasScrolled && !isOpen() && Date.now() > quietUntil) showHint(link);
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    nav.addEventListener('pointerdown', function () { openAtPress = isOpen(); });

    nav.addEventListener('click', function (event) {
      if (!event.target.closest('a')) return;
      var byKeyboard = event.detail === 0;
      if (!byKeyboard && !openAtPress) {
        // First tap: only show what the dots stand for.
        event.preventDefault();
        open(false);
        return;
      }
      quietUntil = Date.now() + QUIET_MS;
      close();
    });

    // Mouse: the names show while the pointer is over the dots.
    nav.addEventListener('pointerenter', function (event) { if (event.pointerType === 'mouse') open(true); });
    nav.addEventListener('pointerleave', function (event) { if (event.pointerType === 'mouse') close(); });

    // Keyboard: the names show while the focus is on the dots.
    nav.addEventListener('keyup', function (event) { if (event.key === 'Tab') open(true); });
    nav.addEventListener('focusout', function (event) { if (!nav.contains(event.relatedTarget)) close(); });

    document.addEventListener('pointerdown', function (event) {
      if (isOpen() && !nav.contains(event.target)) close();
    });

    window.addEventListener('scroll', function () { hasScrolled = true; requestUpdate(); }, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
