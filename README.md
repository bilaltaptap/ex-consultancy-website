# EX Consultancy Website

Static site (HTML/CSS/JS) — no build step.

## Files
- `index.html` – page content
- `style.css` – styles (colors at the top under `:root`)
- `script.js` – mobile menu, testimonial slider, counters, contact form (sends to WhatsApp)
- `render.yaml` – Render deployment config

## Customize
Search & replace in `index.html`:
- Logo: `images/ex-consultancy-logo.jpg` (original supplied logo, do not modify)
- `info@yourfirm.com`, `+92 300 1234567` / `923001234567` (also in `script.js`)
- Social links (`href="#"`)

Images load from Unsplash. To use your own, put files in an `images/` folder and change the URLs
in `index.html` (about image) and `style.css` (`.hero` background).

## Deploy on Render
1. Create a GitHub repo and push these files:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/taxfirm-website.git
   git push -u origin main
   ```
2. Go to https://dashboard.render.com → **New +** → **Static Site** (or **Blueprint** to use `render.yaml`).
3. Connect the GitHub repo.
4. Settings: **Build Command** = *(leave empty)*, **Publish Directory** = `.`
5. Click **Create Static Site**. Your site goes live at `https://<name>.onrender.com`.
6. Optional: **Settings → Custom Domains** to add your own domain.

Every `git push` redeploys automatically.
