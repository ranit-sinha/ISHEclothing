# ISHÉ Clothing Official Website

> Fashion That Defines You

A frontend e-commerce website for ISHÉ Clothing, a multi-aesthetic fashion brand. Built as a pure HTML/CSS/JS project with no frameworks or databases designed to be fast, mobile-first, and visually distinctive.

---

## Live Site
 [isheclothing.onrender.com](https://isheclothing.onrender.com/)

---

## About the Project

ISHÉ Clothing is a fashion brand curated around 10 distinct style aesthetics, each with its own visual identity and typography. This website serves as the brand's digital storefront showcasing collections, communicating brand identity, and providing a seamless browsing experience on mobile.

---

## What's New in Version 2.0

Version 1 was a clean static site with a banner and product sliders. Version 2 transforms it into a fully interactive shopping experience with a complete app-like UI built from scratch in vanilla JS.

- Scrolling announcement marquee bar above the navbar
- Hamburger menu drawer sliding in from the right with links to all 10 style sections
- Live search overlay with real-time results by product name and category
- Wishlist drawer with add and remove, badge counter, persists via localStorage
- Cart drawer with quantity controls, running total, and free shipping logic above â‚¹999
- Full checkout page sliding up from bottom with delivery form and three payment options
- Order success screen with animated tick and unique order ID
- Toast notifications for wishlist and cart actions
- Tap-to-reveal card buttons on mobile, one card open at a time
- Swipe gestures on the banner slider
- Scroll reveal animations on each section
- Back to top floating button
- Sticky navbar with shadow on scroll
- Branded offline screen with retry button
- PWA support with manifest and service worker
- Hosted on GitHub Pages and distributed as an Android APK via WebIntoApp

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
