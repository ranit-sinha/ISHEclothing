## ISHÉ Clothing Official Website

> Fashion That Defines You

A frontend e-commerce website for ISHÃ‰ Clothing, a multi-aesthetic fashion brand. Built as a pure HTML/CSS/JS project with no frameworks or databases â€” designed to be fast, mobile-first, and visually distinctive.

---

## Live Site
 [isheclothing.netlify.app](https://isheclothing.netlify.app)

---

## About the Project

ISHÉ Clothing is a fashion brand curated around 10 distinct style aesthetics, each with its own visual identity and typography. This website serves as the brand's digital storefront showcasing collections, communicating brand identity, and providing a seamless browsing experience on mobile.

---

## Features

- Animated preloader with brand logo (2-second display)
- Auto-sliding banner with 4 hero images
- 10 curated style sections with horizontal scroll product sliders
- Each section has its own unique typography matching the aesthetic
- Fully responsive mobile-first design
- Sticky navigation bar with icon controls
- Smooth gradient background in warm pink, peach and antique white tones
- No frameworks, no databases pure HTML, CSS and JavaScript

---

## Style Sections

| Section | Font Used |
|---|---|
| Old Money | UnifrakturMaguntia |
| Downtown | Luckiest Guy |
| Ethnic | Calligraffitti |
| Countryside | Satisfy |
| Cottagecore | Yellowtail |
| Athleisure | Acme |
| Academia | Kelly Slab |
| Coastal Cowgirl | Shadows Into Light |
| Y2K | Permanent Marker |
| Boho Chic | Original Surfer |

---

## Tech Stack

- HTML5 semantic structure
- CSS3 custom gradients, flexbox, aspect-ratio, media queries
- Vanilla JavaScript preloader timing, banner slider
- Google Fonta 10 custom font families (non-blocking load)
- Font Awesome 6.5 navigation icons (non-blocking load)
- Netlify hosting and deployment

---

## Performance Optimisations

- Google Fonts and Font Awesome loaded non-blocking (`media="print" onload`) eliminates render-blocking which previously caused 15-20 second freeze for first-time visitors
- Hero banner image uses `loading="eager"` and `fetchpriority="high"`
- All product images use `loading="lazy", browser only fetches images as user scrolls
- Preloader timer starts at page click, not after full load guarantees exactly 2-second display regardless of network speed
- Images converted to WebP format for 50-70% smaller file sizes at same visual quality
- Hard fallback: preloader force-hides at 4 seconds on very slow connections

---

## Author

Developer : Ranit Sinha 

---

## License

This project is privately owned by ISHÉ Clothing. All images, logos, and brand assets are the intellectual property of Ishita Sarkar. Unauthorised use or reproduction is not permitted.
