# Linux for Site Reliability Engineers — Tutorial

A comprehensive, single-page interactive HTML tutorial covering Linux fundamentals through an SRE lens. Features 100 multiple-choice questions distributed across 10 modular sections, a sticky sidebar Table of Contents, mobile-responsive design, and copy-to-clipboard code blocks.

---

## Project Structure

```
linux-for-sre/
├── index.html      # Main tutorial page (all content, 100 MCQs)
├── script.js       # Interactivity: mobile menu, progress bar, copy buttons
├── CNAME           # Custom domain for GitHub Pages
└── README.md       # This file
```

---

## Hosting on GitHub Pages

### ⚠️ Important: Private vs. Public Repository

GitHub Pages has different requirements depending on your account type and repository visibility:

| Scenario | GitHub Pages Available? |
|---|---|
| **Public repo** — any account | ✅ Free on all plans |
| **Private repo** — free account | ❌ Not available |
| **Private repo** — GitHub Pro / Teams / Enterprise | ✅ Available |

**This repository is currently private.** You have two options:

---

### Option A — Make the Repository Public (Recommended for Free Users)

> **Before proceeding**, review all files to ensure there are no secrets, credentials, API keys, or personal information you don't want to be publicly visible.

1. Go to your repository on GitHub.
2. Click **Settings** (gear icon in the top navigation bar).
3. Scroll to the bottom of the Settings page to the **Danger Zone** section.
4. Click **Change repository visibility**.
5. Select **Make public**.
6. Type the repository name to confirm, then click **I understand, change repository visibility**.

Once public, proceed to [Enable GitHub Pages](#enable-github-pages) below.

---

### Option B — Upgrade to GitHub Pro (Keep Repository Private)

1. Go to [https://github.com/settings/billing](https://github.com/settings/billing).
2. Upgrade your account to **GitHub Pro** (currently ~$4/month).
3. Private repositories on Pro can use GitHub Pages.
4. Proceed directly to [Enable GitHub Pages](#enable-github-pages) below.

---

### Enable GitHub Pages

Once your repo is either public or you have a paid plan:

1. Navigate to your repository on GitHub.
2. Click **Settings** → **Pages** (in the left sidebar under "Code and automation").
3. Under **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` (or `master`) and `/ (root)` as the folder.
5. Click **Save**.
6. GitHub will display a banner: *"Your site is being published at `https://<your-username>.github.io/<repo-name>/`"*
7. Wait 1–3 minutes for the initial build to complete, then visit the URL.

---

### Setting Up a Custom Domain (Optional)

The `CNAME` file in this repo is pre-configured with a placeholder domain. To use your own domain:

1. Open the `CNAME` file and replace the placeholder with your actual domain (e.g., `linux-sre.yourdomain.com`).
2. Commit and push the change.
3. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add a **CNAME DNS record**:
   - **Name/Host:** `linux-sre` (or whatever subdomain you chose)
   - **Value/Target:** `<your-username>.github.io`
   - **TTL:** Automatic or 3600
4. Back in GitHub Settings → Pages, enter your custom domain and click **Save**.
5. Check **Enforce HTTPS** once the certificate is issued (can take up to 24 hours).

> **Note:** If you're using a root/apex domain (e.g., `yourdomain.com` without a subdomain), you'll need to configure `A` records pointing to GitHub's IP addresses instead of a CNAME. See [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for the current IP addresses.

---

### Troubleshooting

| Problem | Solution |
|---|---|
| Site shows 404 | Ensure `index.html` is in the root of the branch selected under Pages settings |
| CSS/JS not loading | Check that `script.js` is in the same directory as `index.html` |
| Custom domain not working | DNS changes can take up to 48 hours to propagate; verify your CNAME record with `dig your-domain.com CNAME` |
| HTTPS certificate pending | Wait up to 24 hours after setting the custom domain |
| Changes not reflecting | GitHub Pages caches aggressively; try a hard reload (`Ctrl+Shift+R`) |

---

## Local Development

No build step required. Open `index.html` directly in any modern browser:

```bash
# Option 1: Open directly
open index.html   # macOS
xdg-open index.html  # Linux

# Option 2: Serve with Python (avoids any CORS quirks)
python3 -m http.server 8080
# then visit http://localhost:8080

# Option 3: Use the VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## License

This tutorial content is provided for educational purposes. Feel free to fork, adapt, and share with attribution.
