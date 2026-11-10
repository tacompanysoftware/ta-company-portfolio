# T/A Company — Portfolio Website

A responsive, static multi-page portfolio starter built with HTML, CSS, and vanilla JavaScript. It follows the supplied dark/black visual direction and uses the supplied T/A logo.

## Pages

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `work.html` — Filterable portfolio concepts
- `project.html?slug=architecture|hospitality|watch|food` — Project detail template
- `contact.html` — Contact form
- `404.html` — Not-found page
- `privacy.html` and `terms.html` — Legal placeholders

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Before publishing

1. Open `assets/js/config.js`.
2. Set `CONTACT_EMAIL` to the real business email and/or `FORM_ENDPOINT` to a real form backend endpoint.
3. Set `PHONE` and the social URLs only when they are verified.
4. Replace the four illustrative portfolio concepts and their images with approved client work. The current gallery and project pages are explicitly marked as concepts, not completed client engagements.
5. Complete the privacy policy and terms pages for your actual business and applicable law.
6. Add your canonical domain, analytics (if needed), and final Open Graph image metadata.

### Contact form behavior

The contact form validates required fields in the browser. If `FORM_ENDPOINT` is set, it posts JSON to that endpoint. Otherwise, if `CONTACT_EMAIL` is set, it opens a prefilled email draft. With neither configured, it clearly explains that message delivery is not yet connected.

## Deployment

This is a static website and can be deployed to GitHub Pages, Vercel, Netlify, or standard static hosting. Use the project root as the publish directory.

## Notes

- Google Fonts are loaded from Google Fonts; a network connection is required for those fonts. System font fallbacks are included.
- The images in `assets/images` were cropped from the supplied visual reference for this website draft.
- No client counts, revenue claims, fake email addresses, or invented phone numbers are included.
