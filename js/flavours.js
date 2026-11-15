/* ProWheys flavours.
   This file is the one place to add, rename or remove a flavour.
   The flavour cards and the "Try it yourself" screen both read from it. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     GROUPS, in the order they appear on the page.
     ------------------------------------------------------------------ */
  var GROUPS = [
    { id: 'classics', pl: 'Klasyki', en: 'Classics' },
    { id: 'desserts', pl: 'Desery', en: 'Desserts' },
    { id: 'fruity', pl: 'Owocowe', en: 'Fruity' },
    { id: 'coffee', pl: 'Kawowe', en: 'Coffee' },
    { id: 'seasonal', pl: 'Sezonowe', en: 'Seasonal', badge: { pl: 'Tylko w sezonie', en: 'Limited season' } },
    { id: 'drops', pl: 'Trend Drops', en: 'Trend Drops', badge: { pl: 'Limitowany drop', en: 'Limited drop' } }
  ];

  var SEASONS = {
    winter: { pl: 'Zima', en: 'Winter' },
    autumn: { pl: 'Jesień', en: 'Autumn' },
    summer: { pl: 'Lato', en: 'Summer' }
  };

  var TEXT = {
    pl: { milk: 'Zawiera mleko', previous: 'Poprzednie smaki', next: 'Następne smaki' },
    en: { milk: 'Contains milk', previous: 'Previous flavours', next: 'Next flavours' }
  };

  /* ------------------------------------------------------------------
     FLAVOURS. The name stays in English in both languages.
       bg    card background, from the first colour to the second
       ink   'dark' = navy text on the card, 'light' = white text
       liq   colour of the shake, top and bottom
       acc   colour of the topping, acc2 a second topping colour
       top   how the finished shake looks: foam, drizzle, crumbs, swirl, sprinkles, dust, fruit
     ------------------------------------------------------------------ */
  var FLAVOURS = [
    { id: 'vanilla-dream', name: 'Vanilla Dream', group: 'classics', bg: ['#f8ecc6', '#ecd592'], ink: 'dark', liq: ['#f7ecc9', '#edd9a0'], acc: '#b9914a', top: ['foam', 'dust'],
      pl: 'Gładka, kremowa wanilia. Prosta i nigdy nudna.', en: 'Smooth, creamy vanilla. Simple and never boring.' },
    { id: 'chocolate-bomb', name: 'Chocolate Bomb', group: 'classics', bg: ['#7b4a2c', '#3f2212'], ink: 'light', liq: ['#7a4a2c', '#4b2a16'], acc: '#2b160a', acc2: '#f3e3c8', top: ['drizzle', 'crumbs'],
      pl: 'Głęboka czekolada na ekologicznym kakao Fairtrade.', en: 'Deep chocolate made with organic Fairtrade cocoa.' },
    { id: 'banana-boost', name: 'Banana Boost', group: 'classics', bg: ['#fbe38a', '#f2c230'], ink: 'dark', liq: ['#f9e08a', '#f0c84a'], acc: '#fdf0bd', acc2: '#b98416', top: ['fruit', 'dust'],
      pl: 'Dojrzały banan, słodki i lekki. Smakuje jak świeży koktajl.', en: 'Ripe banana, sweet and light. Tastes like a fresh blend.' },
    { id: 'strawberry-kiss', name: 'Strawberry Kiss', group: 'classics', bg: ['#fbb9c5', '#ec6f88'], ink: 'dark', liq: ['#f8a9b8', '#ee7f96'], acc: '#d92b4b', top: ['foam', 'fruit'],
      pl: 'Słodka truskawka z delikatnym, mlecznym finiszem.', en: 'Sweet strawberry with a soft, milky finish.' },

    { id: 'cookie-crunch', name: 'Cookie Crunch', group: 'desserts', bg: ['#f1e9dc', '#cdbfa9'], ink: 'dark', liq: ['#efe6d6', '#d9ccb8'], acc: '#3a2a22', top: ['crumbs', 'foam'],
      pl: 'Ciasteczka ze śmietanką i chrupiąca nuta kakao.', en: 'Cookies and cream with a crunchy cocoa bite.' },
    { id: 'brownie-bliss', name: 'Brownie Bliss', group: 'desserts', bg: ['#6a4028', '#2e190d'], ink: 'light', liq: ['#5f3a24', '#3a2113'], acc: '#24120a', acc2: '#a8683c', top: ['crumbs', 'swirl'],
      pl: 'Wilgotne brownie, mocno czekoladowe do ostatniego łyka.', en: 'Fudgy brownie, rich and chocolatey to the last sip.' },
    { id: 'pistachio-power', name: 'Pistachio Power', group: 'desserts', bg: ['#cfe0aa', '#8fae62'], ink: 'dark', liq: ['#c6d99f', '#a3bf78'], acc: '#5f7f38', acc2: '#eef5dc', top: ['crumbs', 'dust'],
      pl: 'Orzechowa pistacja, kremowa i odrobinę elegancka.', en: 'Nutty pistachio, creamy and a little bit fancy.' },
    { id: 'cheesecake-heaven', name: 'Cheesecake Heaven', group: 'desserts', bg: ['#fbeae6', '#f0b6c2'], ink: 'dark', liq: ['#f9ece6', '#f3d5d6'], acc: '#c2385a', top: ['swirl', 'fruit'],
      pl: 'Kremowy sernik z malinową nutą.', en: 'Creamy cheesecake with a ripple of raspberry.' },
    { id: 'salted-caramel-crush', name: 'Salted Caramel Crush', group: 'desserts', bg: ['#ecc07e', '#b97a32'], ink: 'dark', liq: ['#e2b06a', '#c88c40'], acc: '#7d4514', acc2: '#ffffff', top: ['drizzle', 'dust'],
      pl: 'Maślany karmel ze szczyptą soli morskiej.', en: 'Buttery caramel with a pinch of sea salt.' },
    { id: 'white-choc-cloud', name: 'White Choc Cloud', group: 'desserts', bg: ['#fdf8ee', '#e5dac4'], ink: 'dark', liq: ['#fbf5e8', '#efe5d0'], acc: '#d8c9a8', acc2: '#ffffff', top: ['foam', 'sprinkles'],
      pl: 'Biała czekolada, lekka i jedwabista jak chmurka.', en: 'White chocolate, light and silky like a cloud.' },
    { id: 'tiramisu-love', name: 'Tiramisu Love', group: 'desserts', bg: ['#dcbb95', '#8a6040'], ink: 'light', liq: ['#d2ae86', '#a97c55'], acc: '#4a2c18', acc2: '#f1dcb8', top: ['dust', 'crumbs'],
      pl: 'Kawa, kakao i nuta mascarpone, po włosku.', en: 'Coffee, cocoa and mascarpone notes, Italian style.' },
    { id: 'peanut-butter-punch', name: 'Peanut Butter Punch', group: 'desserts', bg: ['#e0b476', '#a36f2c'], ink: 'dark', liq: ['#d8a868', '#b98440'], acc: '#7a4a18', acc2: '#f3dcb4', top: ['swirl', 'crumbs'],
      pl: 'Prażone masło orzechowe, gęste i pełne smaku.', en: 'Roasted peanut butter, thick and full of flavour.' },
    { id: 'marshmallow-party', name: 'Marshmallow Party', group: 'desserts', bg: ['#fde3ee', '#c9e2f8'], ink: 'dark', liq: ['#fde6ef', '#f6cfe0'], acc: '#ff9ec4', acc2: '#9fd0f5', top: ['foam', 'sprinkles'],
      pl: 'Słodkie, puszyste pianki. Deser w kubku.', en: 'Sweet, fluffy marshmallow. Dessert in a cup.' },

    { id: 'mango-smoothie', name: 'Mango Smoothie', group: 'fruity', bg: ['#ffd166', '#f59a1b'], ink: 'dark', liq: ['#ffc247', '#f7a325'], acc: '#fff4dc', top: ['swirl'],
      pl: 'Soczyste mango ze świeżą, jogurtową nutą.', en: 'Juicy mango with a fresh yogurt twist.' },
    { id: 'berry-banana-blast', name: 'Berry Banana Blast', group: 'fruity', bg: ['#f9b3c0', '#f6d568'], ink: 'dark', liq: ['#f7a8b9', '#f5d36e'], acc: '#d92b4b', acc2: '#f7dc6f', top: ['fruit', 'sprinkles'],
      pl: 'Truskawka i banan, klasyczny duet.', en: 'Strawberry and banana, the classic duo.' },
    { id: 'coco-choco-beach', name: 'Coco Choco Beach', group: 'fruity', bg: ['#8c5c3e', '#4a2c1a'], ink: 'light', liq: ['#86573a', '#5a3622'], acc: '#ffffff', acc2: '#f2e6d0', top: ['sprinkles'],
      pl: 'Czekolada i kokos, jak wakacje w kubku.', en: 'Chocolate and coconut, like a holiday in a cup.' },

    { id: 'cappuccino-kick', name: 'Cappuccino Kick', group: 'coffee', bg: ['#cfa67e', '#7b5336'], ink: 'light', liq: ['#c59a70', '#9a7150'], acc: '#5a3a22', top: ['foam', 'swirl'],
      pl: 'Kremowe cappuccino dla fanów kawy.', en: 'Creamy cappuccino for coffee lovers.' },

    { id: 'gingerbread-cookie', name: 'Gingerbread Cookie', group: 'seasonal', season: 'winter', bg: ['#c98c56', '#7f4a22'], ink: 'light', liq: ['#c08350', '#96602f'], acc: '#5c3113', acc2: '#ffffff', top: ['crumbs', 'sprinkles'],
      pl: 'Korzenny piernik, jak w zimowej piekarni.', en: 'Warm gingerbread spices, like a winter bakery.' },
    { id: 'cinnamon-roll', name: 'Cinnamon Roll', group: 'seasonal', season: 'winter', bg: ['#f0d9b8', '#c89860'], ink: 'dark', liq: ['#ecd4b2', '#d6b283'], acc: '#9a5a2a', top: ['swirl', 'dust'],
      pl: 'Słodki cynamon i odrobina lukru.', en: 'Sweet cinnamon and a touch of icing.' },
    { id: 'pumpkin-spice-pie', name: 'Pumpkin Spice Pie', group: 'seasonal', season: 'autumn', bg: ['#f0a45a', '#c2651c'], ink: 'dark', liq: ['#ea9a4e', '#cf7a2c'], acc: '#7a3d10', top: ['foam', 'dust'],
      pl: 'Dynia, cynamon i szczypta gałki muszkatołowej.', en: 'Pumpkin, cinnamon and a hint of nutmeg.' },
    { id: 'tropical-sunset', name: 'Tropical Sunset', group: 'seasonal', season: 'summer', bg: ['#ffc94d', '#ff6b6b'], ink: 'dark', liq: ['#ffbf47', '#ff7a5c'], acc: '#ffe9a8', acc2: '#3a2415', top: ['fruit', 'dust'],
      pl: 'Mango i marakuja, lato w każdym łyku.', en: 'Mango and passion fruit, summer in every sip.' },

    { id: 'neon-night-drive', name: 'Neon Night Drive', group: 'drops', bg: ['#ff2d95', '#5a1fd1'], ink: 'light', liq: ['#ff3d9e', '#7a2df0'], acc: '#c6ff3d', acc2: '#ffffff', top: ['sprinkles', 'swirl'],
      pl: 'Wiśnia i limonka, wyraziście i z pazurem.', en: 'Cherry and lime, bright, sharp and loud.' },
    { id: 'football-fever', name: 'Football Fever', group: 'drops', bg: ['#ffa63d', '#f26a00'], ink: 'dark', liq: ['#ff9a2e', '#f47a0a'], acc: '#1f8a4c', acc2: '#ffffff', top: ['sprinkles', 'drizzle'],
      pl: 'Pomarańcza i mango, w sam raz na dzień meczu.', en: 'Orange and mango, made for match day.' },
    { id: 'festival-lemonade', name: 'Festival Lemonade', group: 'drops', bg: ['#fff08a', '#ff9db0'], ink: 'dark', liq: ['#ffe97a', '#ff9fb0'], acc: '#ff5d7d', acc2: '#fff7c2', top: ['fruit', 'swirl'],
      pl: 'Cytryna i truskawka, świeżo jak na letnim festiwalu.', en: 'Lemon and strawberry, fresh as a summer festival.' }
  ];

  /* ---------- Small helpers ---------- */
  var doc = document;
  var FOAM = '#fffaf0';
  var CUP_PATH = 'M28 40 L50 222 Q51 232 61 232 L139 232 Q149 232 150 222 L172 40 Z';
  var MARK_PATHS =
    '<path d="M0 18 C18 22 34 20 48 10 C60 2 78 0 100 12 C82 8 70 10 60 17 C44 28 20 30 0 18 Z"/>' +
    '<path d="M12 31 C30 35 46 33 60 23 C72 15 90 13 112 25 C94 21 82 23 72 30 C56 41 32 43 12 31 Z"/>' +
    '<path d="M24 44 C42 48 58 46 72 36 C84 28 102 26 124 38 C106 34 94 36 84 43 C68 54 44 56 24 44 Z"/>';
  var svgCount = 0;
  var RAIL_STEP = 0.8; // how far one arrow press moves the row, as a share of its width

  function currentLang() { return doc.documentElement.lang === 'en' ? 'en' : 'pl'; }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function findFlavour(id) {
    return FLAVOURS.filter(function (flavour) { return flavour.id === id; })[0] || null;
  }

  function findGroup(id) {
    return GROUPS.filter(function (group) { return group.id === id; })[0] || null;
  }

  function badgeText(flavour, lang) {
    var group = findGroup(flavour.group);
    return group && group.badge ? group.badge[lang] : '';
  }

  function seasonText(flavour, lang) {
    return flavour.season && SEASONS[flavour.season] ? SEASONS[flavour.season][lang] : '';
  }

  /* Mixes two hex colours. amount 0 gives the first colour, 1 gives the second. */
  function mixHex(first, second, amount) {
    var a = parseInt(first.slice(1), 16);
    var b = parseInt(second.slice(1), 16);
    var channels = [16, 8, 0].map(function (shift) {
      var from = (a >> shift) & 255;
      var to = (b >> shift) & 255;
      return Math.round(from + (to - from) * amount);
    });
    return '#' + channels.map(function (channel) { return ('0' + channel.toString(16)).slice(-2); }).join('');
  }

  /* Same "random" numbers every time for the same flavour, so a shake always looks the same. */
  function seededRandom(seed) {
    var value = (seed * 9301 + 49297) % 233280;
    return function () {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  }

  function round(number) { return Math.round(number * 10) / 10; }

  function pointOnTop(random, spread) {
    var angle = random() * Math.PI * 2;
    var radius = Math.sqrt(random()) * spread;
    return { x: round(100 + Math.cos(angle) * 60 * radius), y: round(40 + Math.sin(angle) * 9 * radius) };
  }

  /* ---------- Toppings. Each returns what sits on top of the shake and what shows inside it. ---------- */
  var TOPPINGS = {
    foam: function (colour, random) {
      var bumps = [52, 76, 100, 124, 148].map(function (x, index) {
        var radius = 15 + random() * 5;
        var y = index % 2 === 0 ? 33 : 28;
        return '<circle cx="' + x + '" cy="' + y + '" r="' + round(radius) + '" fill="' + FOAM + '"/>';
      }).join('');
      return { top: bumps + '<ellipse cx="100" cy="24" rx="26" ry="14" fill="' + FOAM + '"/>', inner: '' };
    },
    drizzle: function (colour) {
      return {
        top: '<path d="M38 39 Q52 29 68 40 T100 38 T132 40 T162 37" fill="none" stroke="' + colour + '" stroke-width="5" stroke-linecap="round"/>',
        inner: '<path d="M52 44 V74 M146 44 V88 M100 46 V62" fill="none" stroke="' + colour + '" stroke-width="5" stroke-linecap="round" opacity="0.85"/>'
      };
    },
    crumbs: function (colour, random) {
      var top = '';
      var inner = '';
      var index;
      for (index = 0; index < 16; index += 1) {
        var point = pointOnTop(random, 0.95);
        var size = round(4 + random() * 4);
        top += '<rect x="' + point.x + '" y="' + round(point.y - size / 2) + '" width="' + size + '" height="' + size + '" rx="1.2" fill="' + colour + '" transform="rotate(' + Math.round(random() * 90) + ' ' + point.x + ' ' + point.y + ')"/>';
      }
      for (index = 0; index < 12; index += 1) {
        inner += '<circle cx="' + round(52 + random() * 96) + '" cy="' + round(70 + random() * 150) + '" r="' + round(1.5 + random() * 2) + '" fill="' + colour + '" opacity="0.55"/>';
      }
      return { top: top, inner: inner };
    },
    swirl: function (colour) {
      return {
        top: '<path d="M62 40 C74 29 126 29 138 40 C128 49 80 49 76 41 C84 34 116 34 120 40 C114 44 96 44 94 40" fill="none" stroke="' + colour + '" stroke-width="3.6" stroke-linecap="round"/>',
        inner: '<path d="M20 104 C66 78 118 136 180 98 M20 168 C70 142 122 196 180 160" fill="none" stroke="' + colour + '" stroke-width="7" stroke-linecap="round" opacity="0.4"/>'
      };
    },
    sprinkles: function (colour, random, second) {
      var colours = [colour, second || colour, '#ffffff'];
      var top = '';
      for (var index = 0; index < 18; index += 1) {
        var point = pointOnTop(random, 1);
        top += '<rect x="' + round(point.x - 4.5) + '" y="' + round(point.y - 1.6) + '" width="9" height="3.2" rx="1.6" fill="' + colours[index % colours.length] + '" transform="rotate(' + Math.round(random() * 180) + ' ' + point.x + ' ' + point.y + ')"/>';
      }
      return { top: top, inner: '' };
    },
    dust: function (colour, random) {
      var top = '';
      for (var index = 0; index < 34; index += 1) {
        var point = pointOnTop(random, 0.92);
        top += '<circle cx="' + point.x + '" cy="' + point.y + '" r="' + round(1 + random() * 1.3) + '" fill="' + colour + '"/>';
      }
      return { top: top, inner: '' };
    },
    fruit: function (colour, random) {
      var top = [62, 92, 122, 146].map(function (x) {
        var y = round(36 + random() * 6);
        return '<circle cx="' + x + '" cy="' + y + '" r="' + round(8 + random() * 3) + '" fill="' + colour + '"/>' +
          '<circle cx="' + (x - 2) + '" cy="' + (y - 2) + '" r="1.4" fill="#ffffff" opacity="0.8"/>';
      }).join('');
      var inner = '';
      for (var index = 0; index < 9; index += 1) {
        inner += '<circle cx="' + round(52 + random() * 96) + '" cy="' + round(72 + random() * 146) + '" r="' + round(2.5 + random() * 2.5) + '" fill="' + colour + '" opacity="0.5"/>';
      }
      return { top: top, inner: inner };
    }
  };

  /* Draws the cup for one flavour. options.milk makes the shake lighter and creamier. */
  function shakeSvg(flavour, options) {
    var settings = options || {};
    var lighten = settings.milk ? 0.24 : 0;
    var liquidTop = mixHex(flavour.liq[0], '#ffffff', lighten);
    var liquidBottom = mixHex(flavour.liq[1], '#ffffff', lighten);
    var surface = mixHex(liquidTop, '#ffffff', 0.35);
    var markColour = flavour.ink === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(28,42,58,0.24)';
    var random = seededRandom(FLAVOURS.indexOf(flavour) + 7);
    var top = '';
    var inner = '';
    svgCount += 1;
    var id = 'pw' + svgCount;

    flavour.top.forEach(function (kind, index) {
      var colour = index === 0 ? flavour.acc : (flavour.acc2 || flavour.acc);
      var parts = TOPPINGS[kind](colour, random, flavour.acc2);
      top += parts.top;
      inner += parts.inner;
    });

    return '<svg class="cup" viewBox="0 0 200 250" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<clipPath id="' + id + 'c"><path d="' + CUP_PATH + '"/></clipPath>' +
        '<linearGradient id="' + id + 'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + liquidTop + '"/><stop offset="1" stop-color="' + liquidBottom + '"/></linearGradient>' +
      '</defs>' +
      '<path d="' + CUP_PATH + '" fill="rgba(255,255,255,0.4)"/>' +
      '<g clip-path="url(#' + id + 'c)">' +
        '<g class="cup-liquid">' +
          '<rect x="0" y="40" width="200" height="200" fill="url(#' + id + 'g)"/>' +
          inner +
        '</g>' +
        '<g fill="' + markColour + '" transform="translate(64 128) scale(0.6)">' + MARK_PATHS + '</g>' +
        '<path d="M34 40 L54 232 L70 232 L52 40 Z" fill="#ffffff" opacity="0.16"/>' +
      '</g>' +
      '<g class="cup-top">' +
        '<ellipse cx="100" cy="40" rx="72" ry="13" fill="' + surface + '"/>' +
        top +
      '</g>' +
      '<path d="' + CUP_PATH + '" fill="none" stroke="rgba(28,42,58,0.2)" stroke-width="2"/>' +
    '</svg>';
  }

  /* ---------- Flavour cards ---------- */
  function styleVars(flavour) {
    return '--f1:' + flavour.bg[0] + ';--f2:' + flavour.bg[1];
  }

  function cardHtml(flavour, lang) {
    var badge = badgeText(flavour, lang);
    var season = seasonText(flavour, lang);
    var tags = '';
    if (badge) tags += '<span class="fcard-badge">' + escapeHtml(badge) + '</span>';
    if (season) tags += '<span class="fcard-season">' + escapeHtml(season) + '</span>';
    return '<li class="fcard fcard--' + flavour.ink + '" style="' + styleVars(flavour) + '">' +
      (tags ? '<p class="fcard-tags">' + tags + '</p>' : '') +
      '<div class="fcard-cup">' + shakeSvg(flavour) + '</div>' +
      '<h4 class="fcard-name">' + escapeHtml(flavour.name) + '</h4>' +
      '<p class="fcard-desc">' + escapeHtml(flavour[lang]) + '</p>' +
      '<span class="fcard-milk">' + escapeHtml(TEXT[lang].milk) + '</span>' +
    '</li>';
  }

  function groupsHtml(lang) {
    return GROUPS.map(function (group) {
      var items = FLAVOURS.filter(function (flavour) { return flavour.group === group.id; });
      if (!items.length) return '';
      return '<section class="fgroup" style="--span:' + Math.min(items.length, 4) + '">' +
        '<h3 class="fgroup-title">' + escapeHtml(group[lang]) + ' <span>' + items.length + '</span></h3>' +
        '<ul class="frail">' + items.map(function (flavour) { return cardHtml(flavour, lang); }).join('') + '</ul>' +
      '</section>';
    }).join('');
  }

  function railHtml(lang) {
    return '<ul class="frail frail--single">' + FLAVOURS.map(function (flavour) { return cardHtml(flavour, lang); }).join('') + '</ul>';
  }

  function renderLists() {
    var lang = currentLang();
    Array.prototype.forEach.call(doc.querySelectorAll('[data-flavour-list]'), function (holder) {
      holder.innerHTML = holder.getAttribute('data-flavour-list') === 'rail' ? railHtml(lang) : groupsHtml(lang);
    });
    Array.prototype.forEach.call(doc.querySelectorAll('[data-rail]'), function (button) {
      button.setAttribute('aria-label', TEXT[lang][button.getAttribute('data-rail') === 'next' ? 'next' : 'previous']);
    });
  }

  /* Small colour dots, used as the flavour buttons on the dispenser at the top of the home page. */
  function renderDots() {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-flavour-dots]'), function (holder) {
      var active = holder.getAttribute('data-active');
      holder.innerHTML = holder.getAttribute('data-flavour-dots').split(',').map(function (id) {
        var flavour = findFlavour(id.trim());
        if (!flavour) return '';
        return '<i' + (flavour.id === active ? ' class="is-active"' : '') + ' style="background:linear-gradient(160deg,' + flavour.bg[0] + ',' + flavour.bg[1] + ')"></i>';
      }).join('');
    });
  }

  /* Arrow buttons for the single row of flavours on the partnership page. */
  function initRailButtons() {
    doc.addEventListener('click', function (event) {
      var button = event.target.closest ? event.target.closest('[data-rail]') : null;
      if (!button) return;
      var rail = doc.querySelector('.frail--single');
      if (!rail) return;
      var direction = button.getAttribute('data-rail') === 'next' ? 1 : -1;
      var distance = direction * rail.clientWidth * RAIL_STEP;
      // Older Safari has no scrollBy on elements, so it jumps instead of gliding.
      if (typeof rail.scrollBy === 'function') rail.scrollBy({ left: distance, behavior: 'smooth' });
      else rail.scrollLeft += distance;
    });
  }

  window.ProWheysFlavours = {
    groups: GROUPS,
    flavours: FLAVOURS,
    text: TEXT,
    currentLang: currentLang,
    escapeHtml: escapeHtml,
    findFlavour: findFlavour,
    badgeText: badgeText,
    styleVars: styleVars,
    shakeSvg: shakeSvg
  };

  function init() {
    renderLists();
    renderDots();
    initRailButtons();
    doc.addEventListener('prowheys:lang', renderLists);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
