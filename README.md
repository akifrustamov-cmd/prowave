# ProWave website

Plain HTML, CSS and JavaScript. No build step. Polish by default, English with the PL / EN switch (or by adding `?lang=en` to the link).

## Pages

| Page | File | What it is for |
|---|---|---|
| Home | `index.html` | The brand and the product. Only a small "Do you run a gym?" pointer at the bottom. |
| Partnership | `partnership/index.html` | Everything for gym owners: benefits, earnings calculator, pilot steps, contact form. Send gym owners the link ending in `/partnership/`. |

The machine picture (`assets/machine.svg`) is a drawing placed over a gym photo. When you have a real photo of your machine in a gym, replace the two images inside the block marked `MACHINE SCENE` with that photo.

The colours are five values at the top of `css/styles.css`: `--paper` (page background), `--sand` (alternating sections), `--navy` (text and the one dark section), `--teal` (brand accent and the wave) and `--teal-dark` (buttons only).

## Before going live

Open `js/main.js`. The settings are the first lines of the file.

| Setting | What to put there |
|---|---|
| `contactEmail` | The address shown on the page. |
| `formEndpoint` | Your Formspree address, for example `https://formspree.io/f/abcdwxyz`. While it is empty, the form opens the visitor's email app with the message filled in. |
| `bookingUrl` | Your Calendly (or similar) link for "Book a call". While it is empty, the button opens an email. |

Then check these placeholders:

- Flavour names in the product section of `index.html` (search for `FLAVOURS`).
- Partner logos in "Our experience" in `partnership/index.html` (search for `OUR EXPERIENCE`). The Waves numbers on both pages come from wavesint.com (search for `WAVES FACTS`).
- Company details in the footer of both pages (search for `COMPANY DETAILS`).
- A privacy policy page. The form has a short consent line, but a full policy is needed for Poland.

English texts are in `js/i18n-en.js`. Polish texts are in the two HTML files.

## Replacing photos

Save your photo under the same file name in `images/` and it appears on the page.

| File | Where it shows | Suggested size |
|---|---|---|
| `hero.jpg` | Top of the page | 1800 px wide, landscape, dark |
| `shake.jpg` | Product section | 1200 px wide |
| `source.jpg` | From source to shake | 1400 px wide, landscape |
| `gym.jpg` | Behind the machine on the home page, top of the partnership page | 1600 px wide, landscape |
| `member.jpg` | Spare photo, not used on the page now | 1400 px wide |
| `powder.jpg` | Spare photo, not used on the page yet | 1200 px wide |

The current photos come from Unsplash and are free to use, including commercially.

## Logo files

`assets/logo.svg` (for dark backgrounds), `assets/logo-dark.svg` (for light backgrounds), `assets/mark.svg` (waves only), `assets/favicon.svg`, plus PNG icons for phones.

## Publishing on GitHub Pages

1. Create a repository on GitHub and upload everything in this folder.
2. In the repository, open Settings, then Pages.
3. Under "Build and deployment" choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. The site is live a minute later at the address GitHub shows.

It also works on Netlify: drag this folder onto the Netlify dashboard.
