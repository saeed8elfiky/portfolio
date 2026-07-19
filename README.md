# Saeed Elfiky — Portfolio

A static portfolio site for a SOC Engineer, built with plain HTML/CSS/JS (no build step, no dependencies).

## Files

- `index.html` — page structure and content
- `style.css` — all styling
- `script.js` — mobile nav toggle + scroll-reveal animation

## Host it on GitHub Pages

1. Create a new repo on GitHub, e.g. `saeed8elfiky.github.io` (this gives you a root domain URL) — or any repo name if you're fine with a `/repo-name/` path.
2. Push these three files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/saeed8elfiky/<your-repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, select the `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be live at:
   - `https://saeed8elfiky.github.io` (if the repo is named `saeed8elfiky.github.io`), or
   - `https://saeed8elfiky.github.io/<your-repo-name>/` otherwise.

It can take a minute or two for the first deploy to go live.

## Editing content

Everything is in `index.html` — sections are labeled with HTML comments (`<!-- HERO -->`, `<!-- PROJECTS -->`, etc.). Colors, fonts, and spacing all live in `style.css` under the `:root` variables at the top if you want to adjust the palette.

## Notes

- Your LinkedIn URL wasn't included — add a link in the contact section (`#contact` in `index.html`) whenever you have it.
- The phone number from your resume was left out of the public contact section; add it back in if you want it visible.
