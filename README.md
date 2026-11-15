# ProWheys website

Plain HTML, CSS and JavaScript. No build step. Polish by default, English with the PL / EN switch (or by adding `?lang=en` to the link).

## Pages

| Page | File | What it is for |
|---|---|---|
| Home | `index.html` | The brand, the product, the flavours and the "Try it yourself" screen. The order at the top is: the shake video, then "Try it yourself", then the gym partner offer. |
| Partnership | `partnership/index.html` | Everything for gym owners: benefits, a smaller demo screen, flavours, earnings calculator, ProWheys Plus through the club's app, pilot steps, contact form. Send gym owners the link ending in `/partnership/`. |

The colours are five values at the top of `css/styles.css`: `--paper` (page background), `--sand` (alternating sections), `--navy` (text and the one dark section), `--teal` (brand accent and the wave) and `--teal-dark` (buttons only).

## Flavours

All flavours live in one file: `js/flavours.js`. The flavour cards on both pages and the "Try it yourself" screen read from it, so a change there shows up everywhere.

Each flavour is one entry in the list marked `FLAVOURS`:

- `name` stays in English in both languages.
- `pl` and `en` are the short descriptions.
- `group` decides where it appears: `classics`, `desserts`, `fruity`, `coffee`, `seasonal` or `drops`. Seasonal flavours get the "Limited season" badge and trend drops get the "Limited drop" badge by themselves.
- `season` (`winter`, `autumn` or `summer`) is for seasonal flavours. They show in the order they are listed, so keep winter first.
- `bg`, `liq`, `acc` and `top` are the colours and the look of the cup.

To remove a flavour, delete its entry. To add one, copy an entry and change it. If you remove a flavour, also take its id out of the short list on the partnership demo (search for `data-flavours` in `partnership/index.html`).

"Chocolate Bomb" says it is made with organic Fairtrade cocoa. Keep that sentence only while the cocoa is certified and you are allowed to use the claim.

## Before going live

Open `js/main.js`. The settings are the first lines of the file.

| Setting | What to put there |
|---|---|
| `contactEmail` | The address shown on the page. |
| `formEndpoint` | Your Formspree address, for example `https://formspree.io/f/abcdwxyz`. While it is empty, the form opens the visitor's email app with the message filled in. |
| `bookingUrl` | Your Calendly (or similar) link for "Book a call". While it is empty, the button opens an email. |

Then check these placeholders:

- Partner logos in "Our experience" in `partnership/index.html` (search for `OUR EXPERIENCE`). The Waves numbers on both pages come from wavesint.com (search for `WAVES FACTS`).
- Company details in the footer of both pages (search for `COMPANY DETAILS`).
- A privacy policy page. The form has a short consent line, but a full policy is needed for Poland.

On phones and tablets the menu is a column of dots on the right edge of the screen (search for `SIDE DOT MENU` in both HTML files). It has the same points as the header menu, so when you change one, change the other too.

English texts are in `js/i18n-en.js`. Polish texts are in the two HTML files. The words on the demo screen are at the top of `js/demo.js`.

## Swapping in your own photos and videos

Every photo and video spot is marked in the HTML with a comment that starts with `SWAP`. Search for `SWAP` to find them all. The simplest way to replace one is to save your file under the same name in the same folder.

| File | Where it shows | What to use |
|---|---|---|
| `video/hero.mp4` + `images/hero-poster.webp` | Home, top | 3 to 8 seconds, no sound, portrait. Now it is stock shake footage with a drawn ProWheys dispenser on top. Replace it with real footage of your machine filling a cup, then delete the `dispenser` block in `index.html`. The pill under it names the flavour in the clip (`hero-flavour`), so change the name there if the new clip shows another one. |
| `video/shake-gym.mp4` + `images/shake-gym-poster.webp` | Home, gym partner offer | 1 to 2 seconds, landscape. Your machine or cup in a partner club. |
| `assets/machine.svg` + `images/scene-gym.webp` | Home, "How it works" | A drawing over a gym photo. Replace both with one real photo of your machine in a gym. |
| `images/shake.webp` | Home, the product | Portrait, about 900 px wide. A real ProWheys shake in its cup. |
| `images/athlete.webp` | Home, big photo | Landscape, about 1600 px wide. |
| `video/swirl.mp4` + `images/swirl-poster.webp` | Home, our flavours | 1 to 2 seconds, landscape. |
| `images/splash.webp` | Home, from source to shake | Landscape, about 1400 px wide. |
| `video/gym.mp4` + `images/gym-poster.webp` | Partnership, top | 3 to 8 seconds, no sound. A busy partner club. |
| `assets/machine.svg` + `images/scene-club.webp` | Partnership, "Our brand in your gym" | Replace both with one real photo of your machine. |
| `images/after-training.webp` | Partnership, benefits | Landscape, about 1400 px wide. |
| `images/ropes.webp` | Partnership, big photo | Landscape, about 1600 px wide. |
| `images/og.jpg` | The preview picture when the link is shared | 1200 by 630 px, JPG. |

Rules that keep the site fast:

- Photos: WebP, no wider than 1600 px, ideally under 200 KB.
- Videos: MP4 (H.264), no sound, under about 3 MB each. Every video needs a still image (its "poster") with the same framing. The still image shows first and stays on screen on slow mobile connections, when the phone is saving data, and for visitors who switched off animations.
- Do not use photos that show other brands' logos, products or competitor machines.
- When you change a photo, update its description in the `alt="..."` text next to it (and the matching English line in `js/i18n-en.js`).

Where each current photo and video comes from is listed in `CREDITS.md`. When you replace a stock file with your own, remove its line there.

## Logo files

`assets/logo.svg` (for dark backgrounds), `assets/logo-dark.svg` (for light backgrounds), `assets/mark.svg` (waves only), `assets/favicon.svg`, plus PNG icons for phones.

## Publishing on GitHub Pages

1. Create a repository on GitHub and upload everything in this folder.
2. In the repository, open Settings, then Pages.
3. Under "Build and deployment" choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. The site is live a minute later at the address GitHub shows.

The file `CNAME` tells GitHub Pages that the site lives at prowheys.com. It only works once the DNS records of the domain point to GitHub: four A records for `prowheys.com` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a CNAME record for `www` that points to `akifrustamov-cmd.github.io`.

It also works on Netlify: drag this folder onto the Netlify dashboard.
