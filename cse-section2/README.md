# CSE Section-2 — Heavy UI/UX Edition

This is the redesigned cinematic frontend for the CSE Section-2 project.

## Design direction

The first screen is intentionally different from a normal college dashboard. It behaves like a digital memory/tribute page:

1. Intro loader
2. Cinematic hero with teacher portrait
3. "meri CSE section 2" typography
4. Teacher name + role
5. Floating particles and hearts
6. Scroll-based image movement
7. Letter / "words of heart" section
8. Animated thought section
9. Memory cards
10. Academic portal teaser

## Replace the dummy teacher image

The scalable image is here:

`public/assets/mam-placeholder.svg`

Replace it with:

`public/assets/mam-photo.jpg`

Then update:

`src/data/section.js`

```js
photo: "/assets/mam-photo.jpg"
```

No component needs to change.

## Run

```bash
npm install
npm run dev
```

## Main scalability idea

Content is separated from UI:

- `src/data/section.js` — teacher, letter, thoughts, memories
- `src/components/` — reusable sections
- `src/App.jsx` — page composition
- `src/styles.css` — visual system

Later you can replace static data with API/CMS/RAG data without rebuilding the visual components.

## Important

The sample letter is original placeholder copy. Replace it with the exact words from Ankita Ma'am if you have them.

The teacher image is a vector placeholder, not a real person's photograph. Replace it when the actual photo is provided.
